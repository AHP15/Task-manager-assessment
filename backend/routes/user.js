import { signup } from '../controllers/signup.js';

import express from 'express';

const router = express.Router();

router.post('/auth/signup', signup);

export default router;