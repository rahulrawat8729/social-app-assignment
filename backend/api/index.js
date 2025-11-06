const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('../config/db');
const authRoutes = require('../routes/authRoutes');
const postRoutes = require('../routes/postRoutes');
const serverless = require('serverless-http');

dotenv.config();
connectDB();

const app = express();

// --- CORS Setup ---
const allowedOrigins = [
  'http://localhost:5173', // local dev
  'https://social-app-assignment-ten.vercel.app' // deployed frontend
];


app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow requests with no origin (Postman, server-to-server)
    if (allowedOrigins.includes(origin)) {
      callback(null, true); // allow this origin
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));


// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// --- Routes ---
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('API is running on Vercel...');
});

// --- Export serverless handler ---
module.exports = app;
module.exports.handler = serverless(app);
