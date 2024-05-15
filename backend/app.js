import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import UserRouter from './routes/user.js';
import TaskRouter from './routes/task.js';
import CustomError from './utils/customError.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.get('/', (req, res) => res.status(200).send({ message: 'Hello' }));

app.use(UserRouter);
app.use(TaskRouter);

app.use((err, req, res, _) => {
    const custom = new CustomError(err.message);
    res.status(custom.statusCode).send({
        success: false,
        data: null,
        error: custom.message
    });
});

export default app;