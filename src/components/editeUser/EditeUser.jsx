import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchUpdateUser, NoEdit } from '../../store/RegSlice'
import RegUser from '../regUser/RegUser'

const EditUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const user = useSelector((state) => state.regReduser)
  const userRequestStatus = useSelector((state) => state.regReduser.userRequestStatus)
  const errorServer = useSelector((state) => state.regReduser.error)
  const userEdit = useSelector((state) => state.regReduser.userEdit)

  const fromPage = location.state?.from?.pathname || '/'

  useEffect(() => {
    if (userRequestStatus === 'fulfilled' && userEdit) {
      dispatch(NoEdit())
      navigate(fromPage, { replace: true })
    }
  }, [navigate, fromPage, userRequestStatus, userEdit, dispatch])

  const handlerFormSubmit = (data) => {
    dispatch(fetchUpdateUser(data))
  }

  return (
    <>
      {errorServer && <h2> An error occured: {errorServer} </h2>}

      <RegUser user={user} handlerFormSubmit={handlerFormSubmit} />
    </>
  )
}

export default EditUser
