const mongoose = require('mongoose');

let Todo = mongoose.model('Todo', {
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5 
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {
    Todo
};