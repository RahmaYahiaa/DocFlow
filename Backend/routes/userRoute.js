import express from 'express';
//import authUser from '../middleware/authUser.js';
import {registerUser,loginUser,getProfile,updateProfile,bookAppointment,listAppointment} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.get('/get-profile', authUser,getProfile);

userRouter.put('/update-profile', upload.single('image'), authUser,updateProfile);

userRouter.post('/book-appointment',  bookAppointment);

userRouter.get('/appointments' , listAppointment  );

export default userRouter