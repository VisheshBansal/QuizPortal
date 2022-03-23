const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    mobile: { type: Number },
    password: { type: String },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() }
});
module.exports = mongoose.model('user', UserSchema);

// view all quiz
// only questions

// quiz by id 
// only admin 

// attempt
// only admin
