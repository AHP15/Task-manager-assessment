import { signup, signin, gerUser } from '../controllers/user.js';
import { verifyToken } from '../middlewares/jwt.js';

import express from 'express';

const router = express.Router();

router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
router.get('/user', verifyToken, gerUser);

export default router;