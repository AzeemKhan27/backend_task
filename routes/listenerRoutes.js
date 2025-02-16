import express from 'express';
import { listener } from '../controllers/listenerController.js';

const router = express.Router();

router.post('/listener', listener);

export default router;