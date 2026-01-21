const logger = require('../utils/logger');

module.exports=(err,req,res,next)=>{
  logger.error(
    {
      err,
      path:req.path,
      method:req.method,
      userId:req.userId||null
    },
    err.message
  );
  const statusCode=err.statusCode||500;

  res.status(statusCode).json({
    error:
    process.env.NODE_ENV==='production'?'Something Went Wrong':err.message
  });
};
