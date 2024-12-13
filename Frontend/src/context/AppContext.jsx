import { createContext, useState } from "react";
import { doctors } from "../assets/assets.js";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = '$';
  const backendUrl = 'http://localhost:5000';

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);

  const value = {
    doctors,
    currencySymbol,
    token,
    setToken,
    backendUrl,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;





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