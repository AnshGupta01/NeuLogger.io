import React, { useState } from 'react'
import userContext from './userContext'

function userProvider({children}) {

    const [user, setUser] = useState({
        name: "Ansh"
    })

  return (
    
    <userContext.Provider value={user}>
        {children}
    </userContext.Provider>
    
  )
}

export default userProvider