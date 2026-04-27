# 🌐 Social Media Platform (MERN Stack)

## 🌟 Project Overview

This project is a fully functional, full-stack social media platform built using the MERN (MongoDB, Express, React, Node.js) stack. It provides users with a clean interface to share posts, interact with content, and engage with a community feed.

The application is divided into:
- **Backend:** Node.js + Express for APIs and business logic
- **Frontend:** React (Vite) for fast and modern UI

---

## ✨ Key Features

- **User Authentication:** Secure signup, login, and logout
- **Post Creation:** Create posts with text and optional media
- **Real-time Feed:** Dynamic feed showing latest posts
- **Rich Content:** Mentions (@user), tags (#tags), and event details
- **Responsive UI:** Mobile-friendly navigation
- **File Uploads:** Upload and serve media content

---

## 🛠️ Technology Stack

| Category | Technology | Description |
|----------|-----------|------------|
| Database | MongoDB | NoSQL database for scalable storage |
| Backend | Node.js / Express | Server-side logic and APIs |
| Frontend | React (Vite) | Fast and modern UI |
| Middleware | Mongoose | ODM for MongoDB |
| Auth | JWT | Secure authentication |

---

## 🚀 Getting Started

### 🔹 Prerequisites

- Node.js (v18+)
- npm or yarn
- MongoDB (local or Atlas)

---

## 🔧 Backend Setup

```
cd backend
npm install
```

### Environment Variables

Create `.env` file:

```
PORT=5000
MONGO_URI="YOUR_MONGO_DB_CONNECTION_STRING_HERE"
JWT_SECRET="YOUR_VERY_STRONG_SECRET_KEY"
```

### Run Backend

```
npm run dev
```

Backend runs at: http://localhost:5000

---

## 💻 Frontend Setup

```
cd ../frontend
npm install
```

### Run Frontend

```
npm run dev
```

App runs at: http://localhost:5173

---

## 📂 Project Structure

```
SOCIAL-APP-ASSIGNMENT/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   └── server.js
│
└── frontend/
    ├── src/
    └── package.json
```

---

## 🤝 Contribution

Feel free to suggest improvements, features, or report bugs by opening an issue!
