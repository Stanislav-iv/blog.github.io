import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchRegister, NoEdit } from '../../store/RegSlice'
import RegUser from '../regUser/RegUser'

const SignUp = () => {
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

  const handlerFormSubmit = (data) => {
    dispatch(fetchRegister(data))
  }

  return (
    <>
      {errorServer && <h2> An error occured: {errorServer} </h2>}
      <RegUser signUp handlerFormSubmit={handlerFormSubmit} />;
    </>
  )
}

export default SignUp
