import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AdminContext =createContext();

const AdminContextProvider = (props) => {
    
    const [aToken , setAToken] = useState(localStorage.getItem ('aToken') ? localStorage.getItem('aToken') : ' ' );
    const backendUrl =  import.meta.env?.VITE_BACKEND_URL || "http://localhost:5000"; 
    
    const [dashData ,setDashData ] = useState(false)
    const [appointments , setAppointments] = useState([])


    const getDashData = async () =>{
        try {

            const { data } = await axios.get( backendUrl  + '/api/admin/dashboard' , {headers:{aToken}  })

            if (data.success){
                setDashData(data.dashData)
                console.log(data.dashData);
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
            
        }
    }

    const cancelAppointment = async (appointmentId) =>{
        try {
            const {data} = await axios.post( backendUrl + '/api/admin/cancel-appointment' , {appointmentId}, {headers:{aToken} })

            if(data.success){
                toast.success(data.message);
                getAllAppointments();
            }else{
                toast.error(data.message)

            }
            
        } catch (error) {
            toast.error(error.message)
        }

    }

    const getAllAppointments = async () =>{
        try {

            const {data} = await axios.get( backendUrl + '/api/admin/appointments' , {headers:{aToken}})

            if (data.success){
                setAppointments(data.appointments);
                console.log(data.appointments)
            }else{
                toast.error(data.message)
            }


            
        } catch (error) {
            toast.error(error.message)
        }
}

    const value ={
        backendUrl,
        aToken,setAToken,
        dashData,getDashData,
        appointments , setAppointments,
        getAllAppointments,cancelAppointment

    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
} 


export default AdminContextProvider;
