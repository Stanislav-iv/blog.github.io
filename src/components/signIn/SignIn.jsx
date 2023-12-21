import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchLogin, NoEdit } from '../../store/RegSlice'
import LogUser from '../logUser/LogUser'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const userRequestStatus = useSelector((state) => state.regReduser.userRequestStatus)
  const errorServer = useSelector((state) => state.regReduser.error)
  const userEdit = useSelector((state) => state.regReduser.userEdit)

  const fromPage = location.state?.from?.pathname || '/'

  useEffect(() => {
    if (userRequestStatus === 'fulfilled' && userEdit) {
      navigate(fromPage, { replace: true })
      dispatch(NoEdit())
    }
  }, [dispatch, navigate, fromPage, userRequestStatus, userEdit])

  const handleFormSubmit = (data) => {
    dispatch(fetchLogin({ email: data.email, password: data.password }))
  }
  return (
    <>
      {errorServer && <h2> An error occured: {errorServer} </h2>}
      <LogUser handleFormSubmit={handleFormSubmit} userRequestStatus={userRequestStatus} />;
    </>
  )
}

export default SignIn
