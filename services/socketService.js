import { Server } from 'socket.io';
import { Chat } from '../model/chatModel.js';

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [
        'https://testapix.netlify.app',
        "http://localhost:3001",
        "http://localhost:5173",
        "http://localhost:8081",
        "http://localhost:8080",
        process.env.FRONTEND_URL,
        process.env.FRONTEND_URL2,
      ],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-chat', (chatId) => {
      socket.join(chatId);
      console.log(`User ${socket.id} joined chat ${chatId}`);
    });

    socket.on('send-message', async (data) => {
      try {
        const { chatId, message, sender } = data;
        
        const chat = await Chat.findById(chatId);
        if (!chat) return;

        chat.messages.push({ sender, message });
        await chat.save();

        io.to(chatId).emit('new-message', {
          sender,
          message,
          timestamp: new Date()
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};
