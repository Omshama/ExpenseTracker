const User=require('../models/User');
const jwt=require('jsonwebtoken');

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"3h"});
};
//Register user
exports.registerUser=async(req , res)=>{
    const { fullName, email, password, profileImageUrl } = req.body;


    //Validationn
    if(!fullName||!email||!password){
        return res.status(400).json({message:"All Fields are Mandatory"});
    }
        //Check if user already exists
    try{
        const existingUser=await User.findOne({email});
        if(existingUser){
            res.status(400).json({message:"User Already Exits"});
        }
        //Create a User
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });
        res.status(201).json({
            id:user._id,
            user,
            token:generateToken(user._id),
        });
    }
    catch(err)
    {
        res.status(500).json({message:"Error Registering a User",errro:err.message});
    }

}
//Login user
exports.loginUser=async(req,res)=>{
    const{email,password}=req.body;
    //Check Validation
    if(!email||!password){
        return res.status(400).json({message:"All Fields are Required"});
    }
    try{
        const user =await User.findOne({email});
        if(!User || !(await user.comparePassword(password)))
        {
            return res.status(400).json({
                message:"Invalid Credentials"
            });
        }
        res.status(200).json({
            id:user._id,
            user,
            token:generateToken(user._id)
        });
    }
    catch(err)
    {
        res
        .status(500)
        .json({
            message:"Error Logging in User",error:err.message
        });
    }
};

//getUserInfo 
exports.getUserInfo=async(req,res)=>{
    try{
        const user =await User.findById(req.user.id).select("-password");
        if(!user)
        {
            return res.status(404).json({message:"User Not Found"});
        }
        res.status(200).json(user);


    }
    catch(err)
    {
        res
        .status(500)
        .json({
            message:"Error Getting User Details",error:err.message
        });
    }
}