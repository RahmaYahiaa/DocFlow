import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';

import dotenv from 'dotenv';
dotenv.config();

console.log('MONGODB_URI:', process.env.MONGODB_URI); // Log to check if the variable is loaded correctly

//app config 
const app = express();

// Example usage of environment variables
const port = process.env.PORT || 5000;

connectDB()
connectCloudinary()


//middlewares
app.use(express.json())
// app.use(bodyParser.json());
app.use(cors())


//api endpoints
app.use('/api/user',userRouter)
app.use('/api/admin',adminRouter)//localhost:5000/api/admin/add-doctor
app.use('/api/doctor',doctorRouter)


app.get('/',(req, res)=>{
    res.send('Hello from DocFlow API')
})
app.listen(port,()=>console.log("server started" ,port))