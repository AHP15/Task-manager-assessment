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

export { createTask };