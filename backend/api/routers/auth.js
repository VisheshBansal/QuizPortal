require('dotenv').config();
const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/User');
const secret = process.env.JWT_SECRET;


router.post('/signup', // Signup route
    [
        check('name', 'name is required').not().isEmpty(),
        check('email', 'Enter a valid email').isEmail(), // Check if email is valid
        check('password', 'Enter a valid password, Minimum 6 characters').isLength({min: 6}) // Check if password is valid
    ],
    async (req, res) => {
        const errors = validationResult(req); 
        if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }
        const { email, password, username } = req.body;
        try {
            let user = await User.findOne({ username });
            if (user) { return res.status(400).json({ message: 'User Already Exists with that username' }); }
            user = await User.findOne({ email });
            if (user) { return res.status(400).json({ message: 'User Already Exists with that email' }); }

            user = new User({ username, email, password });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            const payload = { user: { id: user.id } };
            jwt.sign( payload, secret, { expiresIn: '30d' }, (err, token) => {
                if (err) throw err;
                res.status(200).json({ status: true, token }); 
            });
            
        } catch (err) {
            console.log(err);
            res.status(500).json({success: false, message: 'Server Error' });
        }
    }
);

router.post('/login',
    [        
        check('email', 'Enter a valid email').isEmail(), // Check if email is valid
        check('password', 'Enter a valid password, Minimum 6 characters').isLength({min: 6}) // Check if password is valid
    ],
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) { return res.status(400).json({ errors: error.array() }); }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) return res.status(400).json({ status: false, message: 'User Does Not Exist' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ status: false, message: 'Your password is incorrect !' });

            const payload = { user: { id: user.id } };
            jwt.sign(payload, secret, { expiresIn: '30d' }, (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    status: true,
                    token
                });
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Server Error'
            });
        }
    }
);

router.get('/me', auth, async (req, res) => { // pass token in header
    try {
        const user = await User.findById(req.user.id);
        return res.json(user);
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error in getting User!' });
    }
});

module.exports = router;