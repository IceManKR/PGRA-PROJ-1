const express =require('express');
const path =  require('path');
const errorHandler = require('./middleware/error.middleware');
const httpLogger = require('./middleware/logger.middleware');


const app=express();

// Body Parser
app.use(express.json());
app.use(httpLogger);
// Serve frontend (static files)
app.use(express.static(path.join(__dirname, '../client')));
app.get('/app', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dashboard.html'));
});



app.use('/auth', require('./routes/auth.routes'));
app.use('/tasks', require('./routes/task.routes'));
app.use(errorHandler);

module.exports=app