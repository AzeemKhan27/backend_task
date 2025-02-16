import express from 'express';
import { receiver } from '../controllers/receiverController.js';
import { validateUser } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.post('/receiver', validateUser, receiver);

export default router;