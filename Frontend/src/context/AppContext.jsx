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

// import { createContext, useState } from "react";
// import { doctors } from "../assets/assets"; // Ensure the path is correct

// export const AppContext = createContext();

// const AppContextProvider = ({ children }) => {
//   const currencySymbol = '$';
//   const backendUrl = import.meta.env.VITE.BACKEND_URL || 'http://localhost:5000'; 

//   const [token, setToken] = useState(localStorage.getItem('token') || false);

//   const value = {
//     doctors,
//     currencySymbol,
//     token,
//     setToken,
//     backendUrl,
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export default AppContextProvider;
