import { createTask, deleteTask, updateTask } from '../controllers/task.js';
import { verifyToken } from '../middlewares/jwt.js';

import express from 'express';

const router = express.Router();

router.post('/task', verifyToken, createTask);
router.delete('/task', verifyToken, deleteTask);
router.put('/task', verifyToken, updateTask);

export default router;