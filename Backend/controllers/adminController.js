import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from "cloudinary";
import doctorModel from '../models/doctorModel.js';
// add api for add doctor
const addDoctor = async (req, res) => {
    try{
        const{name,email,password,speciality,degree,experience,about,fees,address}=req.body;
        const imageFile=req.file
        // console.log({name,email,password,speciality,degree,exprience,about,fees,address},imageFile);

        //checking for al data to add docyor
        if(!name||!email||!password||!speciality||!degree||!experience||!about||!fees||!address||!imageFile){
            return res.json({success:false, message:"All fields are required"})
        }

        //validate email format
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Enter a valid email"})
        }

        //validate password
        if(password.length<8){
            return res.json({success:false, message:"Password should be at least 8 characters long"})
        }
        
         //hash password
        // const salt =await bycrpt.getSalt(10)  //just for konweledge
        const hashedPassword = await bcrypt.hash(password, 10);

        //upload image to clodinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;


        const doctorData={
            name,
            email,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            image: imageUrl,
            date:Date.now()
        }

        const newDoctor= new doctorModel(doctorData)
        await newDoctor.save()
        
        res.json({success:true, message:"Doctor added successfully"})


    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//api for admin login

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;


        if(email === process.process.env.ADMIN_EMAIL && process.process.env.ADMIN_PASSWORD ){
            const token = isJWT.sign(email+password, process.env.JWT_SECRET)
            res.json({sucess:true , token})
        }else{
            res.json({sucess:false, message:"Invaild credentials"})
        }

        } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// api for doctor list

const allDoctors = async (req,res) =>{
    try{
        const doctors = await doctorModel.find({}).select('-password');
        res.json({success:true, doctors});
        
    }catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
   
    }
}




export {addDoctor , loginAdmin , allDoctors }