import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';


//app config 
const app = express();
const port =process.env.PORT || 5000
connectDB()
connectCloudinary()


//middlewares
app.use(express.json())
// app.use(bodyParser.json());
app.use(cors())


//api endpoints
app.use('/api/user',userRouter)
app.get('/',(req, res)=>{
    res.send('Hello from DocFlow API')
})
app.listen(port,()=>console.log("server started" ,port))