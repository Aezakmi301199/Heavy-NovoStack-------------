import Router from 'express'
import BasketController from '../controllers/BasketController.js';
import authMiddleWare from '../middleWare/authMiddleWare.js';

const basketRouter = new Router();
basketRouter.get('/basket', BasketController.getAllbasketAdvert)
basketRouter.post('/basket', authMiddleWare, BasketController.addAdvertBasket)
basketRouter.get('/basketBigItem/:id', authMiddleWare, BasketController.checkBasketBigItem)
basketRouter.delete('/basket', authMiddleWare, BasketController.removeAdvertBasket)
basketRouter.get('/basketCount', authMiddleWare, BasketController.getBasketCount)
export default basketRouter