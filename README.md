# SMART WIND FARM REAL-TIME MONITORING, DATA ANALYSIS AND PREDICTIVE MAINTENANCE SYSTEM

## Stack
- Frontend: React + TypeScript + Vite + Recharts + React Router + CSS
- Backend: Node.js + Express + Mongoose + JWT + bcryptjs
- Database: MongoDB Atlas
- Simulator: backend service producing clearly labelled REAL-TIME SIMULATED SENSOR DATA every 5 seconds

## Setup
1. Copy `backend/.env.example` to `backend/.env` and set your MongoDB Atlas URI and secrets. Never commit `.env`.
2. From `backend`: `npm install`, then `npm run seed`, then `npm start`.
3. From `frontend`: `npm install`, then `npm run dev`.
4. Open `http://localhost:5173`.
5. Log in using the admin email/password configured in `backend/.env`.

## Windows convenience
Run `run-backend.bat` and `run-frontend.bat` from the project root in separate terminals.

## Roles
Admin: all pages + user management. Operator: monitoring/simulator/alerts/history/reports. Viewer: read-only monitoring/analysis/maintenance/history/reports.

## Notes
- Predictive maintenance is rule-based, not ML.
- No unrestricted public signup is provided.
- Passwords are bcrypt hashes in MongoDB; the frontend never contains the demo password.
- CSV report export is included. PDF export is not implemented in this version.
