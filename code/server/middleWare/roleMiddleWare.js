import ApiError from "../exceptions/ApiError.js";
import TokenService from "../services/TokenService.js";

export default function (roles) {
  return function (req,res,next) { if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const authToken = req.headers.authorization
        console.log(authToken)
        if (authToken === undefined  ) {
            throw ApiError.UnAuthrizationError()
        }
        let token = req.headers.authorization.split(' ')[1]
        if (token === undefined  ) {
            throw ApiError.UnAuthrizationError()
        }
        let userInfo =  TokenService.validateAccesToken(token)
        if (userInfo == null){
            throw ApiError.UnAuthrizationError()
        }
        let userRoles = userInfo.roles
        let isRole=false;
        userRoles.forEach(r => {
            if (roles.includes(r.role)) {
                isRole = true
            }
        })

        console.log(userRoles)
        req.user = userInfo
        next()  
    } catch(e) {
        console.log(e)
        return  next(e)
    }
    }
}