import { createTask } from '../controllers/task.js';
import { verifyToken } from '../middlewares/jwt.js';

import express from 'express';

const router = express.Router();

router.post('/task', verifyToken, createTask);

export default router;