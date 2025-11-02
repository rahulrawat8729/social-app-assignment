const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

dotenv.config();

connectDB();

const app = express();

// --- Middleware Setup ---

// ********* FIX: Update CORS origin to match React port *********
app.use(cors({
    origin: 'http://localhost:5173', // **Use 5173 based on your Vite output**
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
// *************************************************************

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// --- Serve Static Files ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// --- Routes Integration ---

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Basic welcome route
app.get('/', (req, res) => {
    res.send('API is running...');
});


// --- Start Server ---

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));