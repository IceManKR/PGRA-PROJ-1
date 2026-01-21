require('dotenv').config();
const app = require('./app');
const connectDB = require('./db/mongo');

const PORT = process.env.PORT || 3000;

connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
});
console.log('MONGO_URI loaded:', !!process.env.MONGO_URI);
