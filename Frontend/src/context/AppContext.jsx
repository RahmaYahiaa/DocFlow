import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify"; // التأكد من استيراد toast بشكل صحيح
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = "$";
  const backendUrl = "http://localhost:5000";

  // تعريف الحالات (states)
  const [doctor, setDoctor] = useState([]);
  const [userData, setUserData] = useState(null); // إضافة userData و setUserData
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  // تحميل بيانات الأطباء
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) {
        setDoctor(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // تحميل بيانات المستخدم
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message); // تم تصحيح الخطأ في عرض الرسالة
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  // useEffect الأول لتحميل بيانات المستخدم
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(null); // تصحيح القيمة الافتراضية عند عدم وجود token
    }
  }, [token]);

  // useEffect الثاني لتحميل بيانات الأطباء
  useEffect(() => {
    getDoctorsData();
  }, []);

  // القيمة التي سيتم تمريرها إلى الـ Context
  const value = {
    doctors: doctor,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
// import { createContext, useState } from "react";
// import { doctors } from "../assets/assets.js";

// export const AppContext = createContext();

// const AppContextProvider = ({ children }) => {
//   const currencySymbol = '$';
//   const backendUrl = 'http://localhost:5000';

//   const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);

//   const value = {
//     doctors,
//     currencySymbol,
//     token,
//     setToken,
//     backendUrl,
//     // userData,
//     // setUserData,
//     // loadUserProfileData
//   };
//   const loadUserProfileData = async () => {
//     try{
//       const {data} = await axios.get(backendUrl+'/api/user/get-profile',{ headers:{token}});
//       if(data.success){
//         setUserData(data.userData);
//       }else{
//         toast.error(err.message);
//       }
//     }catch(err){
//       console.log(err);
//       toast.error(err.message);
//     }
//   }
  // // use effect
  // useEffect(()=>{
  //   if(token){
  //     loadUserProfileData();
  //   }else{
  //     setUserData(false);
  //   }
  // },[token]);

//   return (
//     <AppContext.Provider value={value}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export default AppContextProvider;





// //////
// import { createContext, useEffect, useState } from "react";
// import toast from "react-toastify"
// // import { doctors } from "../assets/assets.js";
// import axios from 'axios'

// export const AppContext = createContext();

// const AppContextProvider = ({ children }) => {
//   const currencySymbol = '$';
//   const backendUrl = 'http://localhost:5000';
//   const [doctor,setDoctor]=useState([])
//   const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);

//   const value = {
//     doctors,
//     currencySymbol,
//     token,
//     setToken,
//     backendUrl,
//  userData,
//     setUserData,
//     loadUserProfileData
//   };
//    const getDoctorsData = async () => {
//     try{
//     const { data } = await axios.get(backendUrl + '/api/doctor/list');
//     if(data.success){
//       setDoctor(data.doctors)}
//       else{
//         toast.error(data.message)
//       }

//     }catch(error){
// console.log(error)
// toast.error(error.message)
//     }
//    }

// const loadUserProfileData = async () => {
//   try{
//     const {data} = await axios.get(backendUrl+'/api/user/get-profile',{ headers:{token}});
//     if(data.success){
//       setUserData(data.userData);
//     }else{
//       toast.error(err.message);
//     }
//   }catch(err){
//     console.log(err);
//     toast.error(err.message);
//   }
// }
// // use effect
// useEffect(()=>{
//   if(token){
//     loadUserProfileData();
//   }else{
//     setUserData(false);
//   }
// },[token]);

//    useEffect(()=>{
//     getDoctorsData()
//    },[])
//    }
//   return (
//     <AppContext.Provider value={value}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export default AppContextProvider;