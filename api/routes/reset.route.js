
import express from 'express';
import { forgotPassword, resetPassword } from '../controllers/reset-password-controller.js';
import cors from 'cors';
const router = express.Router();
// // Enable CORS for all routes
router.use(cors());
router.post('/forgot-password', forgotPassword);
router.post('/reset-user-password/:token', resetPassword);
   
export default router;