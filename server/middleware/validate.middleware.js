const { validationResult } = require('express-validator');
const ApiError =  require('../utils/apiError');

module.exports = (req,res,next)=>{
    const errors =  validationResult(req);

    if(!errors.isEmpty()){
        throw new ApiError(400, errors.array()[0].msg);
    }
    next();
}