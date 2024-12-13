import doctorModel from "../models/doctorModel.js";

const changeAvaliability = async (req,res) => {
    try{
        const {docId}=req.body
        const doctor = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{avaliable:!docData.avaliable})
        res.json({success:true, message:"Doctor's availability Changed"})
    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
const doctorList =async(req,res)=>{
    try{
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true, doctors})
    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {changeAvaliability, doctorList}