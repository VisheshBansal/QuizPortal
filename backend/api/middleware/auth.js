require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports = function(req, res, next) {
    const token = req.header('token');
    if (!token) return res.status(401).json({ success: false, message: 'Auth Error' });
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, message: 'Invalid Token' });
    }
};