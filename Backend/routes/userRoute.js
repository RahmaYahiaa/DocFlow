import express from 'express';
import authUser from '../middlewares/authUser.js';
import {registerUser,loginUser,getProfile,updateProfile,bookAppointment,listAppointment ,cancelAppointment} from '../controllers/userController.js';
import upload from '../middlewares/multer.js';


const userRouter = express.Router();

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.get('/get-profile', authUser,getProfile);

userRouter.put('/update-profile', upload.single('image'), authUser, updateProfile);

userRouter.post('/book-appointment',bookAppointment);

userRouter.get('/appointments',authUser , listAppointment  );
userRouter.post('/cancel-appointment',authUser,cancelAppointment);

export default userRouter
