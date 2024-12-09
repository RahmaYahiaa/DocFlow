import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'

//register user
const registerUser = async(req,res)=>{
    try {
        const { name, email, password } = req.body;
        if(!name||!email|| !password ){
            return res.json({success:false, message:"Missing Details"})
        }
        //validating email format
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Enter a valid Email"})
        }
        //validating strong password
        if(password.length <8){
            return res.json({success:false, message:"Password should be at least 8 characters long"})
        }
        
        //hash password
        // const salt =await bycrpt.getSalt(10)  //just for konweledge
        const hashedPassword = await bcrypt.hash(password, 10);

        const userData={
            name,
            email,
            password:hashedPassword
        }
        const newUser= new userModel(userData)
        const user = await newUser.save();

        const token=jwt.sign({id:user._id}, process.env.JWT_SECRET, { expiresIn: '1h' })//, { expiresIn: '1h' }
        res.json({success:true, message:"User registered successfully", token})
        
}
catch(error){
    console.log(error)
    res.json({success:false, message:error.message})
}
}



//user login
const loginUser= async(req,res)=>{
    try {
        const { email, password } = req.body;
        if(!email||!password){
            return res.json({success:false, message:"Missing Details"})
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false, message:"User not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success:false, message:"Invalid credentials"})
        }
        const token=jwt.sign({id:user._id}, process.env.JWT_SECRET)
        res.json({success:true, message:"User logged in successfully", token})
}
catch(error){
    console.log(error)
    res.json({success:false, message:error.message})
}
}
export {registerUser,loginUser} 