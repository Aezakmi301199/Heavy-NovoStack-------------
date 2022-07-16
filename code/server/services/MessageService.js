import jwt from 'jsonwebtoken'
import {
    access_token_key,
    refresh_token_key
} from '../config.js'
import {
    db
} from '../database/db.js'
import ApiError from '../exceptions/ApiError.js'
import {
    v1 as uuidv1
} from 'uuid';
import {
    checkUserByID,
    findLoginByID,
    getPages
} from '../utils/functions.js';
class MessageService {
    async get(user1, user2, limit, page, totalPages) {
        //     console.log(limit, page, totalPages)
        console.log(page)
        const check = await db({
                chroom: 'chatroomuser'
            })
            .where({
                user_id1: user1,
                user_id2: user2
            })
            .orWhere({
                user_id1: user2,
                user_id2: user1
            })
            .select({
                room_id: 'chroom.chatroom_id'
            }).first()
        if (check != undefined) {

            const messages = await db({
                    mess: 'messageuser'
                })
                .select({
                    message: 'mess.messagetext',
                    login: 'u.login',
                    id: 'mess.id',
                    create_at: 'mess.create_at'
                })
                .where({
                    chatroom_id: check.room_id
                }).orderBy('mess.id', 'desc').limit(limit).offset(page * limit)
                .leftJoin({
                    u: 'userclient'
                }, {
                    'mess.user_id': 'u.id'
                })
            if (totalPages == 0) {
                const {
                    count
                } = await db('messageuser')
                    .count('chatroom_id', {
                        as: 'count'
                    }).where({
                        chatroom_id: check.room_id
                    }).first()
                // .select({ gg:db.raw(`count(*) WHERE messageuser.chatroom_id = ?`,[check.room_id])
                totalPages = getPages(count, limit)
            }

            return {
                room_id: check.room_id,
                messages: messages.reverse(),
                page: Number(page),
                totalPages: Number(totalPages)
            }
        } else {
            const room_id = uuidv1();
            await db({
                    chroom: 'chatroomuser'
                })
                .insert({
                    user_id1: user1,
                    user_id2: user2,
                    chatroom_id: room_id
                })
            return {
                room_id,
                messages: [],
                page: 0,
                totalPages: 1
            }
            return
        }
    }

    async create(user_id, messagetext, chatroom_id) {
        const [{
            create_at,
            id
        }] = await db({
            mess: 'messageuser'
        }).insert({
            user_id,
            messagetext,
            chatroom_id
        }).returning(['create_at', 'id'])
        const {
            login
        } = await findLoginByID(user_id)
        return ({
            login,
            message: messagetext,
            id,
            create_at
        })
    }

    async getListUser(user_id) {
        const companion = await db('chatroomuser').select({
                chatroom_id: 'chatroomuser.chatroom_id',
                user1: 'chatroomuser.user_id1',
                user2: 'chatroomuser.user_id2',
            })
            .where(function () {
                this
                    .where('chatroomuser.user_id1', '=', user_id)
                    .orWhere('chatroomuser.user_id2', '=', user_id)
            })
        for (let i = 0; i < companion.length; i++) {
            let index = Object.values(companion[i]).findIndex(el => el == user_id)
            Object.keys(companion[i]).reduce((object, key, idx) => {
                if (idx != index && key != 'chatroom_id') {
                    companion[i] = {
                        'user_id': companion[i][key],
                        'chatroom_id': companion[i]['chatroom_id']
                    }
                }
            }, {})
            for (let i = 0; i < companion.length; i++) {
                let user_id = companion[i].user_id
                if (user_id) {
                    let {
                        login,
                        avatar
                    } = await db({
                        u: 'userclient'
                    }).select({
                        login: 'u.login',
                        avatar: 'usersocialnetworkandpath.path'
                    }).where({
                        id: user_id
                    }).leftJoin('usersocialnetworkandpath', {
                        'usersocialnetworkandpath.user_id': user_id
                    }).first()
                    companion[i] = {
                        ...companion[i],
                        login,
                        avatar
                    }
                }
            }
        }
        return companion
    }

}

export default new MessageService() // [{id}]


//    console.log(companion)

/*
    for (let i = 0; i < 1; i++) {
        let index = Object.values(chatListUser[i]).findIndex(el => el == user_id)
        Object.keys(chatListUser[i]).reduce((object, key, idx) => {
            if (idx != index && key != 'chatroom_id') {
                let login = await db('userclient').select('login').where({
                    id: chatListUser[i][key]
                }).first()
                console.log(login)
                chatListUser[i] = {
                    'user': chatListUser[i][key],
                    'chatroom_id': chatListUser[i]['chatroom_id']
                }
            }
        }, {})
    }
*/