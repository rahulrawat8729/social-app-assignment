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

// --- Middleware ---
app.use(cors({
  origin: '*', // You can make this specific later if needed
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('API is running on Vercel...');
});

// --- Export serverless handler ---
module.exports = app;
module.exports.handler = serverless(app);
