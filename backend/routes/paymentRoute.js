import express from 'express';
import { initializePaystack } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/paystack', initializePaystack);

export default router;
