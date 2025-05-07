
import express from 'express';
import { textToSpeechFun } from '../controllers/translate.controller.js';
import cors from 'cors';
const router = express.Router();

// // Enable CORS for all routes
router.use(cors());

router.post('/textToSpeech', textToSpeechFun)
   
export default router;