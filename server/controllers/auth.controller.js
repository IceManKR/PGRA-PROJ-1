const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiError = require('../utils/apiError');


exports.register = async (req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        throw new ApiError(400,'Email and password are required');
    }
    const existingUser=await User.findOne({email});
    if (existingUser){
        throw new ApiError(409,'User already exists');
    }
    const hashedPassword=await bcrypt.hash(password,10);

    const user=await User.create({
        email,
        password:hashedPassword
    });
    res.status(201).json({message:'User registered successfully'});
    };
exports.login= async (req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email});
    if(!user){
        throw new ApiError(401,'Invalid Credentials');
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new ApiError(401,'Invalid Credentials');
    }

    const token = jwt.sign(
        {userId:user._id,
            role:user.role
        },
        process.env.JWT_SECRET,
        {expiresIn:'1h'}
    );

    res.json({token});
};