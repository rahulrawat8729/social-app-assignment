Social Media Platform (MERN Stack)

🌟 Project Overview

This project is a fully functional, full-stack social media platform built using the MERN (MongoDB, Express, React, Node.js) stack. It is designed to provide users with a clean interface to share posts, interact with content, and connect with a community feed.

The application is structured into two main parts: a robust Node.js/Express backend for handling data and logic, and a modern React application powered by Vite for the user interface.

✨ Key Features

User Authentication: Secure signup, login, and logout functionality.

Post Creation: Users can create new posts with text and optional media attachments (as indicated by the upload icon).

Real-time Feed: A dynamic social feed that displays the latest posts from users (e.g., the post by "Rohan").

Detailed Content Display: Posts support rich content, including user mentions (@Gamer_Nexus), event details (EventTitleGamingFiesta), tags (#GamingFiesta), and interaction metrics (Likes, Comments).

Responsive Navigation: A simple, mobile-friendly navigation bar for accessing Home, Social, and Logout features.

File Uploads: Integration for handling and serving uploaded post media.

🛠️ Technology Stack

This application is built with the following core technologies:

Category

Technology

Description

Database

MongoDB

A flexible NoSQL database for scalable data storage.

Backend

Node.js / Express

Server-side runtime and framework for API development.

Frontend

React (with Vite)

A modern JavaScript library for building fast and interactive user interfaces.

Middleware

Mongoose

ODM (Object Data Modeling) library for MongoDB and Node.js.

Authentication

JWT (JSON Web Tokens)

For secure user session management.

🚀 Getting Started

Follow these steps to set up and run the project locally.

Prerequisites

Node.js (v18+)

npm or yarn

MongoDB Atlas or a local MongoDB instance

1. Backend Setup

Navigate to the backend directory, install dependencies, and configure the environment.

cd backend
npm install


Environment Variables

Create a file named .env in the backend folder and add your configuration details:

# .env file for backend
PORT=5000
MONGO_URI="YOUR_MONGO_DB_CONNECTION_STRING_HERE"
JWT_SECRET="YOUR_VERY_STRONG_SECRET_KEY"


Run the Backend

Start the Express server using nodemon for development:

npm run dev


The backend API will be running at http://localhost:5000 (or the port specified in your .env).

2. Frontend Setup

In a new terminal window, navigate to the frontend directory and install dependencies.

cd ../frontend
npm install


Run the Frontend

Start the React application using Vite:

npm run dev


The application will typically open in your browser at http://localhost:5173.

📂 Project Structure

The project is logically separated for clean development:

SOCIAL-APP-ASSIGNMENT/
├── backend/                  # Node.js/Express API
│   ├── config/               # Database connection and config
│   ├── controllers/          # Business logic for requests (e.g., post, user controllers)
│   ├── middleware/           # Functions for authentication, error handling, etc.
│   ├── models/               # Mongoose schemas (Post.js, User.js)
│   ├── routes/               # API routes definitions
│   ├── uploads/              # Storage for user-uploaded files
│   ├── .env                  # Environment variables
│   └── server.js             # Main server entry point
└── frontend/                 # React application (Vite)
    ├── src/                  # All React components and application logic
    └── package.json          # Frontend dependencies


🤝 Contribution

Feel free to suggest improvements, features, or report bugs by opening an issue!
