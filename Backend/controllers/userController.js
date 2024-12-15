import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';
import doctorModel from '../models/doctorModel.js';
import { v2 as cloudinary } from "cloudinary";

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


// API to Book Appointment


// const bookAppointment = async (req, res) => {
//     try {
//         const { userID, docID, slotDate, slotTime } = req.body;

//         const docData = await doctorModel.findById(docID).select('.password');
//         if (!docData.available) {
//             return res.json({ success: false, message: 'Doctor not available' });
//         }
        
//         let slots_booked = docData.slots_booked;

//         // Checking for slot availability
//         if (slots_booked[slotDate]) {
//             if (slots_booked[slotDate].includes(slotTime)) {
//                 return res.json({ success: false, message: 'Slot not available' });
//             } else {
//                 slots_booked[slotDate].push(slotTime);
//             }
//         } else {
//             slots_booked[slotDate] = [];
//             slots_booked[slotDate].push(slotTime);
//         }

//         const userData = await userModel.findById(userID).select("-password");

//         delete docData.slots_booked;

//         const appointmentData = {
//             userID,
//             docID,
//             userData,
//             docData,
//             amount: docData.fees,
//             slotTime,
//             slotDate,
//             date: Date.now()
//         };

//         const newAppointment = new appointmentModel(appointmentData);
//         await newAppointment.save();

//         // Save new slots data in docData
//         await doctorModel.findByIdAndUpdate(docID, { slots_booked });

//         res.json({ success: true, message: 'Appointment Booked' });

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// }

const bookAppointment = async (req, res) => {
    try {
        const { userID, docID, slotDate, slotTime } = req.body;

        const docData = await doctorModel.findById(docID).select('.password');
        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor not available' });
        }
        
        let slots_booked = docData.slots_booked || {};  // التأكد من أن المتغير غير فارغ

        // التحقق من توفر الموعد
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot not available' });
            } else {
                slots_booked[slotDate].push(slotTime);  // إضافة الموعد الجديد
            }
        } else {
            slots_booked[slotDate] = [slotTime];  // إضافة التاريخ والوقت لأول مرة
        }

        const userData = await userModel.findById(userID).select("-password");

        delete docData.slots_booked;

        const appointmentData = {
            userID,
            docID,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // حفظ المواعيد الجديدة في `slots_booked` للطبيب
        await doctorModel.findByIdAndUpdate(docID, { slots_booked });

        res.json({ success: true, message: 'Appointment Booked' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//ApI to get user appointments for frontend my-appointments page

// const listAppointment = async (req, res) => {
//     try {
//         const { userID } = req.body;  
//         const appointments = await appointmentModel.find({ userID });

//         res.json({ success: true, appointments });  
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// }
const listAppointment = async (req, res) => {
    try {
        const { userID } = req.body;
        if (!userID) {
            return res.json({ success: false, message: "User ID is required." });
        }

        const appointments = await appointmentModel.find({ userID });
        if (appointments.length === 0) {
            return res.json({ success: false, message: "No appointments found." });
        }

        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}



// api user profile data
const getProfile = async(req,res)=>{
    try {
        const{userId}=req.body
        // find user data
        const userData = await userModel.findById(userId).select('-password')
        res.json({success:true, userData})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// API to update user profile data
const updateProfile = async(req,res)=>{
    try {
        const{userId,name,phone,address,dob,gender}=req.body
        const imageFile = req.file
        // find user data
        if(!name||!phone||!gender||!dob)
        {
            return res.json({success:false, message:"Missing Details"})
        }
        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

        if(imageFile)
        {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageUrl = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId,{profilePic:imageUrl})

        }
        res.json({success:true, message:"Profile updated successfully"})
  
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}


export {registerUser,loginUser,getProfile,updateProfile,bookAppointment,listAppointment} ;