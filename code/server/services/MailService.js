import { api_url, smpt_user, smtp_host, smtp_password, smtp_port } from "../config.js";
import nodeMailer from 'nodemailer'
import { getNowTimeAndDate } from "../utils/functions.js";
import { db } from "../database/db.js";

class MailService {
    constructor() {
        this.transporter = nodeMailer.createTransport({
            host:smtp_host,
            secureConnection: false,
            port: smtp_port,
            auth: {
            user: smpt_user,
            pass: smtp_password
            },
        })
    }
    async activateMail (email,link) {
        await this.transporter.sendMail({
            from:smpt_user,
            to:email,
            subject:' Активация аккаунта на ' + api_url,
            text:'',
            html:
                `
                    <div>
                        <h1>Перейти для активации аккаунта</h1>
                        <a href='${link}'>Подтвердить аккаунт</a>
                    </div>
                `
            
        })
        //console.log('tipo otpravil email')
    }

    async activate (activelink) {
        const {user_id} = await db('usersocialnetworkandpath').select('activelink','user_id').where({activelink}).first()
        if (user_id === undefined) {
            throw  ApiError.BadRequest('Некорректная ссылка');
        }
        let data = getNowTimeAndDate();
        await db('userinfo').where({user_id}).update({confirmed:true,updated_at:data});
        await db('usersocialnetworkandpath').where({user_id}).update({activelink:null});
    }
}

export default new MailService();