import express from 'express';
import { startChat, getChatHistory, closeChat, getActiveChats } from '../controller/chatController.js';

const router = express.Router();

router.post('/start', startChat);
router.get('/history/:chatId', getChatHistory);
router.put('/close/:chatId', closeChat);
router.get('/active', getActiveChats);

export { router as chatRouter };
