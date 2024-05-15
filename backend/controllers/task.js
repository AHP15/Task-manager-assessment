import DB from '../models/index.js';

const Task = DB.task;

const createTask = async (req, res, next) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).send({
            success: true,
            data: {
                message: 'task created',
                user
            },
            error: null,
        });
    } catch (err) {
        next(err);
    }
};

export { createTask };