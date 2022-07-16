import Router from 'express'
import authMiddleWare from '../middleWare/authMiddleWare.js';
import MessageController from '../controllers/MessageController.js';
const messageRouter = new Router();
messageRouter.get('/chat/:id', authMiddleWare, MessageController.getMessages)
messageRouter.get('/chat', authMiddleWare, MessageController.getListUser)
// messageRouter.get('/chat/:id', authMiddleWare, MessageController.getMessages)
messageRouter.post('/chat/message', authMiddleWare, MessageController.createMessage)
export default messageRouter