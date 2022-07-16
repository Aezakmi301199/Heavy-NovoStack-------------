export default class ApiError extends Error {
    status;
    errors;
    constructor(status,message,errors = []) {
       super(message)
       this.status = status;
       this.errors = errors;
    }
    static UnAuthrizationError (message='Пользователь не авторизован',errors = {}) {
        return new ApiError(401,message,errors)
    }  
    
    static BadRequest (message,errors = []) {
        return new ApiError(400,message,errors)
    }  
    static underfinedRes (message,errors = []) {
        return new ApiError(404,message,errors)
    }  
    
}