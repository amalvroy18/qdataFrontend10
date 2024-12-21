import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Files from './pages/Files'
import Auth from './pages/Auth'
import DashBoard from './pages/DashBoard'
import Header from './components/Header'
import Footer from './components/Footer'
import PageNotFound from './PageNotFound'
import Profile from './components/Profile'
import FileCard from './components/FileCard'
import SideBar from './components/SideBar'
import { useContext } from 'react'
import { isLoginAuthContext } from './context/Contextshare'
import MyFiles from './components/MyFiles'


function App() {
  const {isLoginStatus} = useContext(isLoginAuthContext)
  
  

  return (
    <>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/file' element={<Files/>} />
        <Route path='/myfile' element={<MyFiles/>} />
        <Route path='/register' element={<Auth register/>} />
        <Route path='/login' element={<Auth/>} />
        <Route path='/dashboard' element={<DashBoard/>} />
        <Route path='*' element={<PageNotFound/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/filecard' element={<FileCard/>} /> {/*  */}
        <Route path='/sidebar' element={<SideBar/>} />

      </Routes>
      <Footer/>
     
    </>
  )
}

export default App
