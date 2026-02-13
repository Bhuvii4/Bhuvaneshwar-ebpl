const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a task title'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    deadline: {
        type: Date,
        required: [true, 'Please add a deadline']
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
