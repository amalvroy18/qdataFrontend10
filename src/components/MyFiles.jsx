import React, { useContext, useEffect, useState } from 'react'
import AddFiles from './AddFiles'
import EditFiles from './EditFiles'
import FileCard from './FileCard'
import { removeUserProjectApi, userProjectApi } from '../services/allApi'
import { addResponseContext, EditResponseContext } from '../context/Contextshare'

function MyFiles() {

  const {addResponse} = useContext(addResponseContext)
  const [deleteStatus,setDeleteStatus] = useState(false)
  const [userProject,setUserProject] = useState([])
  const {editResponse} = useContext(EditResponseContext)

  const getuserProject = async()=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`

    }
    const result = await userProjectApi(reqHeader)
    setUserProject(result.data);
    
  }
  console.log(userProject);

  const handleDelete = async(id)=>{
   const result =  await removeUserProjectApi(id)
   if(result.status ==200)
    setDeleteStatus(true)
  }
  

  useEffect(()=>{
    getuserProject()
    setDeleteStatus(false)
  },[addResponse,deleteStatus,editResponse])

  return (
    <>
    <div className='shadow p-md-5 p-3'>
      <div className='d-flex mt-4 m-auto mb-3'>
      <h4 className='text-Primary me-auto'>My Project</h4>
      <AddFiles/>
      </div>

      {userProject?.length>0?
        userProject?.map((item)=>(
          <div className='p-3 rounded-2 mb-2'style={{backgroundColor:'burlywood'}}>
        <h5>{item.title}</h5>
        <div className='d-flex ms-auto'>
          <button className='btn btn-success ms-2'><EditFiles project={item}/></button>
          <button  className='btn btn-danger ms-2' onClick={()=>handleDelete(item._id)}>Delete</button>
          <button  className='btn btn-primary ms-2'>Share</button>
          <button  className='btn btn-secondary ms-2'>Open</button>
        </div>
      </div>
        ))
      :
      <p className='text-danger'>No Project </p>
      }
      
    </div>
    </>
  )
}

export default MyFiles