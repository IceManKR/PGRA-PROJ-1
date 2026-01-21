const express =require('express');
const errorHandler = require('./middleware/error.middleware');
const httpLogger = require('./middleware/logger.middleware');


const app=express();

// Body Parser
app.use(express.json());
app.use(httpLogger);


app.use('/auth', require('./routes/auth.routes'));
app.use('/tasks', require('./routes/task.routes'));
app.use(errorHandler);

module.exports=app