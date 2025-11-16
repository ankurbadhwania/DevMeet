🧑‍💻 DevMeet – Community Platform

A full-stack MERN application where users can discover, connect, and chat with each other in real-time.
Built with React, Node.js, Express, MongoDB, Socket.IO, Redux Toolkit, and deployed on Vercel + Render.

🚀 Features
🔹 Users Discovery

Personalized feed showing other people

Swipe-style or button-based interactions (Interested / Ignore)

🔹 Connection System

Send connection requests

Accept or reject incoming requests

Manage your active connections

🔹 Real-time Chat

1-to-1 real-time messaging using Socket.IO

Secure encrypted room hashing using SHA-256

Messages auto-update instantly

Chat history stored in MongoDB

🔹 Authentication

Login / Signup with JWT

Cookies with proper httpOnly, secure, sameSite rules

Fully working on Chrome, Edge, Firefox

Auto-auth in both localhost and deployed version

🔹 Deployment

Frontend on Vercel

Backend + Socket.IO on Render

Auto BASE_URL switching (local + production)

CORS configured for both environments

🛠️ Tech Stack

Frontend: React.js, TailwindCSS + DaisyUI, Redux Toolkit, Axios

Backend: Node.js, Express.js, MongoDB + Mongoose, JWT Authentication, Socket.IO

Deployment:

Vercel (Frontend)

Render (Backend + WebSocket)

🔐 Secure Chat Room Hashing

✔ Same pair of users always get the same room
✔ Impossible to guess room ID
✔ Lightweight and secure

🔧 Installation & Setup
1️⃣ Clone the repo
git clone https://github.com/your-username/devmeet.git
cd devmeet

🗄️ Backend Setup
cd backend
npm install

Create .env file:

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret
FRONTEND_URL=http://localhost:5173
NODE_ENV=development

Run backend:

npm start

💻 Frontend Setup
cd frontend
npm install


Run frontend:

npm run dev

🌐 Environment-Aware BASE_URL

✔ Works locally
✔ Works on Vercel
✔ No manual changes needed

🧪 Testing & Tools

Postman for backend API testing

Hoppscotch WebSocket client for socket testing

MongoDB Compass for DB inspection

📄 License

MIT License
