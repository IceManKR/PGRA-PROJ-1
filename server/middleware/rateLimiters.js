const rateLimit = require('express-rate-limit');

//Auth Routes
exports.authLimiter = rateLimit({
    windowMs: 15*60*1000,// 15Mins
    max:10,
    standardHeaders:true,
    legacyHeaders:false,
    message:'Too many authentication attempts. Please try again later'
});
//Read Routes
exports.readLimiter=rateLimit({
    windowMs:60*1000,//1Min
    max:60,
    standardHeaders:true,
    legacyHeaders:false,
});

//Write Routes
exports.writeLimiter=rateLimit({
    windowMs:60*1000,//1Min
    max:30,
    standardHeaders:true,
    legacyHeaders:false
});