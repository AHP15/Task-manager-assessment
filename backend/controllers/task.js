import DB from '../models/index.js';

const Task = DB.task;
const User = DB.user;

const createTask = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        const task = await Task.create(req.body);

        user.tasks.push(task.id);
        await user.save();

        res.status(201).send({
            success: true,
            data: {
                message: 'task created',
                task
            },
            error: null,
        });
    } catch (err) {
        next(err);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        Task.findByIdAndDelete(req.body.taskId);
        const user = await User.findById(req.userId);
        user.tasks.filter(id => id !== req.body.taskId);
        await user.save();

        res.status(200).send({
            success: true,
            data: {
                message: 'task deleted',
                tasks: user.tasks
            },
            error: null,
        });
    } catch (err) {
        next(err);
    }
};


const updateTask = async (req, res, next) => {
    try {
        const { taskId, updatedTask } = req.body;
        const task = await Task.findByIdAndUpdate(taskId, updatedTask);
        res.status(200).send({
            success: true,
            data: {
                message: 'task updated',
                task
            },
            error: null,
        });
    } catch (err) {
        next(err);
    }
};

export { createTask, deleteTask, updateTask };