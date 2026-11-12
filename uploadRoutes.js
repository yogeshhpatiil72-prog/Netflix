const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const router = express.Router();
const MAX_VIDEO_BYTES = 100 * 1024 * 1024; // 100 MB starter limit

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_VIDEO_BYTES, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith("video/")) return cb(null, true);
    cb(new Error("Please select a valid video file."));
  },
});

router.post("/video", protect, admin, upload.single("video"), async (req, res, next) => {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return res.status(503).json({ success: false, message: "Cloudinary is not configured. Add its credentials to backend/.env." });
    }
    if (!req.file) return res.status(400).json({ success: false, message: "Choose a video file first." });

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "video", folder: "patil-neo/videos", use_filename: true, unique_filename: true },
        (error, uploaded) => (error ? reject(error) : resolve(uploaded))
      );
      stream.end(req.file.buffer);
    });

    res.status(200).json({
      success: true,
      message: "Video uploaded successfully.",
      data: { videoUrl: result.secure_url, publicId: result.public_id, duration: result.duration, bytes: result.bytes },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
