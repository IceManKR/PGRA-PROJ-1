const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');

module.exports = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader||!authHeader.startsWith('Bearer')){
        throw new ApiError(401,'Unauthorized');
    }
    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.userId=decoded.userId;
        req.role=decoded.role;
        next();
    }catch(err){
        throw new ApiError(401,'Invalid Token');
    } 
};