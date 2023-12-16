import { useLocation, Navigate } from 'react-router-dom'

import React from 'react'
import { useSelector } from 'react-redux'

const MustReg = ({ children }) => {
  const location = useLocation()
  const login = useSelector((state) => state.regReduser.email)
  if (!login) {
    return <Navigate to="/sign-in" state={{ from: location }} />
  }
  return children
}

export default MustReg
