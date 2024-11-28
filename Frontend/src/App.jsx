import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import Contact from './pages/Contact'
import About from './pages/About'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
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
        <Route path='/my-appointments/:docId' element={<MyAppointments />}></Route>

      </Routes>

    </div>
  )
}

export default App
