import { useLocation, Navigate } from 'react-router-dom'

import React from 'react'
import { useSelector } from 'react-redux'

const NotFound = ({ children }) => {
  const location = useLocation()
  const login = useSelector((state) => state.regReduser.username)
  const loginUs = useSelector((state) => state.articlesReducer.updateUser)
  if (!login || login != loginUs.username) {
    return <Navigate to="/articles" state={{ from: location }} />
  }
  return children
}

export default NotFound
