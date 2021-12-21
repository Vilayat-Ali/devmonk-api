const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    f_username: {
        type: String
    },
    f_email: {
        type: String,
        default: undefined
    }, 
    favourite_language: {
        type: String
    }
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    friends: {
        type: [friendSchema]
    },
    token: {
        type: [String]
    }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;