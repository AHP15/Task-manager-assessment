import { createTask, deleteTask } from '../controllers/task.js';
import { verifyToken } from '../middlewares/jwt.js';

import express from 'express';

const router = express.Router();

router.post('/task', verifyToken, createTask);
router.delete('/task', verifyToken, deleteTask);

export default router;