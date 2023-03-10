const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_PASSWORD = process.env.JWT_PASSWORD;

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
        },
        JWT_PASSWORD,
        {
            expiresIn: '1h',
        },
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
        },
        JWT_PASSWORD,
        {
            expiresIn: '365d',
        },
    );
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
};
