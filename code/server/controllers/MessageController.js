import MessageService from "../services/MessageService.js";


class MessageController {
    async getMessages(req, res, next) {
        try {
            const {
                limit,
                page,
                totalPages
            } = req.query
            const response = await MessageService.get(req.user.id, req.params.id, limit, page, totalPages)
            // obj { {room_id,messages:[]}}
            res.json(response)
        } catch (e) {
            next(e)
        }
    }
    async createMessage(req, res, next) {
        try {
            const {
                user_id,
                message,
                chatroom_id
            } = req.body;
            const mess = await MessageService.create(user_id, message, chatroom_id)
            // obj    ({login,message:messagetext,id})
            res.json(mess)
        } catch (e) {
            next(e)
        }
    }
    async getListUser(req, res, next) {
        try {
            const chatListUser = await MessageService.getListUser(req.user.id)
            // obj { {room_id,messages:[]}}
            res.json(chatListUser)
        } catch (e) {
            next(e)
        }
    }
}

export default new MessageController();