import express from 'express';
//import authUser from '../middleware/authUser.js';
import {registerUser,loginUser,bookAppointment,listAppointment} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.post('/book-appointment',  bookAppointment);

userRouter.get('/appointments' , listAppointment  );

export default userRouter