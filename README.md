# PATIL NEO OTT (based on the uploaded Netflix Clone)

This project contains a responsive OTT frontend and a Node.js/Express + MongoDB backend. The admin dashboard supports adding movies and TV shows. A Cloudinary-backed, admin-only video upload endpoint has been added.

## Video upload setup

1. Create a Cloudinary account and open the Dashboard.
2. Copy the Cloud Name, API Key, and API Secret.
3. In `backend/`, copy `.env.example` to `.env`.
4. Set `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, and the three Cloudinary values in `backend/.env`. Never share or commit `.env`; the API secret must remain on the server.
5. Install backend dependencies with `cd backend && npm install`.
6. Start the API with `npm start`.
7. Sign in using an account whose database role is `admin`, open the Admin page, choose Movie or TV Show, and select an MP4/video file from the phone or computer.

The starter upload limit is 100 MB per video. The selected file is uploaded to the `patil-neo/videos` folder in Cloudinary; its secure URL is saved in MongoDB as `videoUrl`. An existing video URL can still be used instead.

## Important

- MongoDB and Cloudinary are external services and must be configured before the app can run fully.
- This is a starter OTT project, not a deployed production service. Configure hosting, backups, billing limits, allowed origins, and storage policies before public launch.
- Only upload videos and artwork that you own or are licensed to distribute.
