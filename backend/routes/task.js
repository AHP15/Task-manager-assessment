import { createTask } from '../controllers/task.js';

import express from 'express';

const router = express.Router();

router.post('/task', createTask);

export default router;