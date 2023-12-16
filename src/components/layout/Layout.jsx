import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderMenu from '../headerMenu/HeaderMenu'

const Layout = () => (
  <>
    <HeaderMenu />

    <Outlet />
  </>
)

export default Layout
