import BasketService from "../services/BasketService.js"


class BasketController {
    async getAllbasketAdvert (req,res,next) {
        try {
          //  console.log(req.query.user_id)
            const basketAdverts = await BasketService.getAllbasketAdvert(req.query.user_id)
            res.json(basketAdverts)
        } catch(e) {
            next(e)
        }
    }
    async addAdvertBasket (req,res,next) {
        try {
            const basketAdvert = await BasketService.addAdvertBasket(req.body.id,req.user.id)
            res.json()
          } catch(e) {
              next(e)
          }
    }
    async removeAdvertBasket (req,res,next) {
        try {
            const response = await BasketService.removeAdvertBasket(req.query.id,req.user.id)
            res.json()
          } catch(e) {
              next(e)
          }

    }
    async checkBasketBigItem (req,res,next) {
        try {
            const response = await BasketService.checkBasketBigItem(req.params.id,req.user.id)
            // response == TRUE OR FALSE 
            res.json(response)       
          } catch(e) {
              next(e)
          }

    }
    async getBasketCount (req,res,next) {
        try {
            const basketCount = await BasketService.getBasketCount(req.user.id)
            // response == TRUE OR FALSE 
            res.json(basketCount.length)       
          } catch(e) {
              next(e)
          }
    }
}
export default new BasketController()

