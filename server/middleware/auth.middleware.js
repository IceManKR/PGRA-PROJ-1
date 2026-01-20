const ApiError = require('../utils/apiError');

module.exports = (req,res,next)=>{
    const auth = req.headers.authorization;

    if(auth||auth!=='Bearer fake-jwt-token'){
        throw new ApiError(401,'Unauthorized');
    }
    next();
}