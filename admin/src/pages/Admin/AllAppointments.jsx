import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import  {AppContext} from '../../context/AppContext'
import { assets } from '../../assets/assets';

const AllAppointments = () => {

  const{aToken ,  appointments , getAllAppointments ,cancelAppointment} = useContext(AdminContext);
  const {calculateAge , slotDateFormat , currency} = useContext(AppContext);

  useEffect(() =>{
    if(aToken){
      getAllAppointments()
    }

  },[aToken])


  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium '>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_1fr] grid-flow-col py-3 px-6 border-b '>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {
          appointments.map((item , index)=>(

            <div className='flex flex-wrapjustify-between max-sm:gap-2 sm-grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr ] items-center px-border border-b hover:bg-gray-500' key={index}>
              <p className='mac-sm:hidden'>{index+1}</p>
              <div className='flex  items-center gap-2'>
                <img className='w-8 rounded-full ' src={item.userData.img} alt=''/>
                <p>{item.userData.name}</p>
              </div>

              <p>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat} , {item.slotTime}</p>

              <div className='flex  items-center gap-2'>
                <img className='w-8 rounded-full bg-gray-200 ' src={item.docData.img} alt=''/>
                <p>{item.docData.name}</p>
              </div>

              <p>{currency}{item.amount}</p>{
                item.cancelled 
                ?<p className='text-red-400 text-xs font-medium'>cancelled</p>
                :<img onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} className='w-10 cursor-pointer '  />

              }
              

            </div>



          ))
        }
        
      </div>
      
    </div>
  )
}

export default AllAppointments;
