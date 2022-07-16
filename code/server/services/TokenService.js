
import jwt from 'jsonwebtoken'
import { access_token_key, refresh_token_key } from '../config.js'
import { db } from '../database/db.js'
import ApiError from '../exceptions/ApiError.js'

class TokenService {

    async generateTokens (id,login,roles) {
        const payload = {
            id,login,roles
        }
        const accessToken = jwt.sign(payload,access_token_key,{expiresIn:'1h'})
        const refreshToken = jwt.sign(payload,refresh_token_key,{expiresIn:'30d'})
        return {accessToken,refreshToken}
    }

    async saveRefreshToken (id,refreshtoken) {
        await db('usersocialnetworkandpath').update({refreshtoken}).where({user_id:id})
    }

    validateAccesToken (accesToken) {
        try {
            return jwt.verify(accesToken,access_token_key) // payload
        } catch(e) {
            return null
        }
    }
    validateRefreshToken  (refreshToken) {
        try {
            return jwt.verify(refreshToken,refresh_token_key) // payload
            } catch(e) {
                return null
            }
    }
    async refresh (cookie) {
        const {refreshToken} = cookie
        if (!refreshToken || undefined){
            throw ApiError.UnAuthrizationError()
        }
        const user = this.validateRefreshToken(refreshToken)
        if (user === null) {
            throw ApiError.UnAuthrizationError()
        }
        const roles = await db('roles').select('role','user_id').where({user_id:user.id})
        const tokens = await this.generateTokens(user.id,user.login,roles)
        await this.saveRefreshToken(user.id,tokens.refreshToken);
        return { tokens,user}
    }

    async deleteRefreshToken (refreshToken) {
        await db('usersocialnetworkandpath')
            .where({refreshtoken:refreshToken})
            .update({refreshtoken:null})
        }

}

export default new TokenService()

