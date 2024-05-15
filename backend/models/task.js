import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Task title is required'],
    },
    description: {
        type: String,
        required: [true, 'Task description is required'],
    },
    status: {
        type: String,
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
