import { signup, signin, gerUser, signout } from '../controllers/user.js';
import { verifyToken } from '../middlewares/jwt.js';

import express from 'express';

const router = express.Router();

router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
router.get('/auth/signout', signout)
router.get('/user', verifyToken, gerUser);

export default router;