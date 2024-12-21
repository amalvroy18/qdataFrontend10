import React, { useEffect, useState,useContext } from 'react'
import Profile from '../components/Profile'
import MyFiles from '../components/MyFiles'
import Files from './Files'
import { addResponseContext, EditResponseContext } from '../context/Contextshare'
function DashBoard() {
  const {addResponse} = useContext(addResponseContext)
  const {editResponse} = useContext(addResponseContext)
  const [username, setUsername] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
    }

  },[])
  useEffect(() => {
      /* getAllProject(); */ // Fetch projects when the component mounts or searchKey changes
    }, [addResponse,editResponse]);
  return (
    <>
    <div className="container-fluid">
    <h2 className='my-4 ms-3'>Welcome <span className='text-info' style={{fontSize:'52px'}}>{username}</span></h2>
    <div className="row mt-5">
      <div className="col-md-1 px-md-5"></div>
      <div className="col-md-10 px-md-5">
      <Files/>
      </div>
      <div className="col-md-1 px-md-5"></div>
     
    </div>
    </div>
    
    </>
  )
}

export default DashBoard