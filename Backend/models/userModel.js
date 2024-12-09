import mongoose from 'mongoose';

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:'../../Frontend/src/assets/profile_pic.png'
    },
    address:{
        type:Object,
        default:{
            line1:'',line2:''
        }
    },
    gender:{
        type:String,
        enum:['Male','Female','Not selected'],
        default:'Not selected'
    },
    dob:{
        type:String,
        default:'Not selected'
    },
    phone:{
        type:String,
        default:'00000000000'
    }
});
const userModel = mongoose.models.User || mongoose.model('User', userSchema);
export default userModel