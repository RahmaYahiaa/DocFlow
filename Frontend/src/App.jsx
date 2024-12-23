import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import Contact from './pages/Contact'
import About from './pages/About'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Appointment from './pages/Appointment'
import { ToastContainer } from 'react-toastify';
import PayPalPayment from './pages/PayPalPayment';

import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/doctors' element={<Doctors />}></Route>
        <Route path='/doctors/:speciality' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/my-profile' element={<MyProfile />}></Route>
        <Route path='/my-appointments' element={<MyAppointments />}></Route>
        <Route path='/appointment/:docId' element={<Appointment />}></Route>
        <Route path='/pay-online' element={<PayPalPayment />}></Route>
      </Routes>
      <Footer/>

    </div>
  )
}

export default App;


//<Route path='/pay-online' element={<PayPalPayment />} />