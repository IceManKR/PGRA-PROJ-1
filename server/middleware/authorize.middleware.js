const ApiError = require('../utils/apiError');

module.exports=(...allowedRoles)=>{
    return(req,res,next)=>{
        if(!allowedRoles.includes(req.role)){
            throw new ApiError(403,'Forbidden');
        }
        next();
    };
};