import React, { createContext, useState } from 'react'

export const addResponseContext = createContext({})
export const EditResponseContext = createContext({})
export const isLoginAuthContext = createContext(false)

function Contextshare({children}) {

    const [addResponse , setAddResponse] = useState({})
    const [editResponse , setEditResponse] = useState({})
    const [isLoginStatus , setisLoginStatus] = useState(false)
    
    
  return (
    <addResponseContext.Provider value={{addResponse, setAddResponse}}>
        <EditResponseContext.Provider value={{editResponse, setEditResponse}}>
         <isLoginAuthContext.Provider value={{isLoginStatus , setisLoginStatus}}> 
          {children}
         </isLoginAuthContext.Provider>
        </EditResponseContext.Provider>
    </addResponseContext.Provider>
  )
}

export default Contextshare