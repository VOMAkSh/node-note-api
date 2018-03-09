const mongoose = require('mongoose');

let User = mongoose.model('Userbase',{
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

module.exports = {
    User
}