const ApiError = require('../utils/apiError');
const store = require('../data/store');

exports.register = (req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        throw new ApiError(400,'Email and password are required');
    }
    store.users.push({id:Date.now(),email,password});
    res.status(201).json({message: 'User registered'});
};
exports.login=(req,res)=>{
    const {email,password}=req.body;
    const user=store.users.find(u=>u.email===email&&u.password===password);

    if(!user)throw new ApiError(401,'Invalid Credentials');
    res.json({token:'fake-jwt-token',userId:user.id});
};