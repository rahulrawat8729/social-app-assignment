const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hashing a password for storage
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Comparing the provided password with the stored hash
const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

// Generating a JWT token
const generateToken = (id) => {
    // The token payload contains the user ID
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
};