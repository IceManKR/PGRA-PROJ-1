const express =require('express');
const rateLimit = require('./middleware/rateLimit.middleware');
const errorHandler = require('./middleware/error.middleware');

const app=express();

app.use(express.json());
app.use(rateLimit);

app.use('/auth', require('./routes/auth.routes.js'));
app.use('/tasks', require('./routes/task.routes'));

app.use(errorHandler);

module.exports=app;