import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); 
  }
};

export default connectDB;





// import mongoose from "mongoose";

// const connectDB =async()=>{
//     // mongoose.connection.on('connected',()=>console.log('Database Connected'))
//     mongoose.connect("mongodb+srv://rahma:<QuzIgAIRi9XlNdST>@DocFlow.fn8jl.mongodb.net/?retryWrites=true&w=majority&appName=DocFlow", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//       }).then(() => console.log('MongoDB connected'))
//         .catch(err => console.log(err));
// }

// export default connectDB;