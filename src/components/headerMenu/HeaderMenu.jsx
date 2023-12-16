import React, { useEffect } from 'react'
import './HeaderMenu.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchGetUser, logOut } from '../../store/RegSlice'

import { Button } from 'antd'
import avatarDef from '../img/avatar.svg'
const HeaderMenu = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const fromPage = location.state?.from?.pathname || '/'
  const dispatch = useDispatch()
  const login = useSelector((state) => state.regReduser.email)

  const userName = useSelector((state) => state.regReduser.username) || 'Jon Doe'

  const userAvatar = useSelector((state) => state.regReduser.image) || avatarDef

  const handleLogOutClick = () => {
    localStorage.clear()
    dispatch(logOut())
    navigate(fromPage, { replace: true })
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchGetUser())
    }
  }, [dispatch])
  return (
    <div className="header">
      <Link className="header__title" to="/articles">
        <div className="header__title_font">Realworld Blog</div>
      </Link>
      {!login && (
        <>
          <Link className="header__in" to="/sign-in">
            <Button className="header__signIn" type="text">
              Sign In
            </Button>
          </Link>
          <Link className="header__up" to="/sign-up">
            <Button className="header__signUp">Sign Up</Button>
          </Link>
        </>
      )}

      {login && (
        <>
          <Link className="header__in" to="/new-article">
            <Button className="header__signUp">Create article</Button>
          </Link>
          <Link className="header__user" to="/profile">
            <div className="header__userName">{userName}</div>
            <img className="header__userImg" src={userAvatar} alt="avatar" />
          </Link>

          <div>
            <Button className="header__LogOut" onClick={handleLogOutClick}>
              Log Out
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
export default HeaderMenu
