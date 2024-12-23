import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom';
import {assets} from '../assets/assets';



const Navbar = () => {

    const { aToken, setAToken } = useContext(AdminContext); 

    const navigate = useNavigate();


    const logout = () => {
      if (aToken) {
          setAToken(null); // Set token to null to ensure proper state update
          localStorage.removeItem('aToken'); // Remove token from localStorage
      }
      // Navigate after clearing the token
      navigate('/');
  };
  

  return (
    <div className='flex justify-between items-center px-4 sm-px-10 border-b bg-white '>
        <div className='flex items-center gap-2 text-xs'>
            <img className='w-36 cm-w-40 cursor-pointer ' src={assets.admin_logo} alt='' />
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
        </div>
        <button onClick={logout}  className='cursor-pointer bg-primary text-white text-sm px-10 py-2 rounded-full'>Log out</button>
      
    </div>
  )
}

export default Navbar
