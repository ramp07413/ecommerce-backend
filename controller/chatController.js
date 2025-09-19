import { Chat } from '../model/chatModel.js';

export const startChat = async (req, res) => {
  try {
    const { customerId } = req.body;
    
    let chat = await Chat.findOne({ customerId, status: 'active' });
    
    if (!chat) {
      chat = new Chat({ customerId });
      await chat.save();
    }
    
    res.status(200).json({ success: true, chatId: chat._id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const { chatId } = req.params;
    
    const chat = await Chat.findById(chatId);
    
    if (!chat) {
      return res.status(404).json({ success: false, message: 'Chat not found' });
    }
    
    res.status(200).json({ success: true, chat });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const closeChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { status: 'closed' },
      { new: true }
    );
    
    if (!chat) {
      return res.status(404).json({ success: false, message: 'Chat not found' });
    }
    
    res.status(200).json({ success: true, message: 'Chat closed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getActiveChats = async (req, res) => {
  try {
    const chats = await Chat.find({ status: 'active' })
      .sort({ updatedAt: -1 });
    
    res.status(200).json({ success: true, chats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
