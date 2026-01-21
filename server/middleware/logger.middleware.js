const pinoHttp = require('pino-http');
const logger = require('../utils/logger');

module.exports=pinoHttp({
    logger,
    customLogLevel:(res,err)=>{
        if(res.statusCode>=500)return 'error';
        if(res.stausCode>=400)return 'warn';
        return 'info';
    }
});