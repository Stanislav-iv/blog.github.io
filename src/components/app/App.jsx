import React from 'react'
import BlogList from '../blogList/BlogList'
import { Route, Routes, Navigate } from 'react-router-dom'
import Layout from '../layout/Layout'
import BlogItemSingle from '../blogItemSingle/BlogItemSingle'
import SignUp from '../signUp/SignUp'
import SignIn from '../signIn/SignIn'
import EditUser from '../editeUser/EditeUser'
import CreatArticle from '../creatArticle/CreatArticle'
import UpdateArticle from '../updateArticle/UpdateArticle'
import MustReg from '../hoc/Hoc'
import NotFound from '../hoc/NotFound'
import './App.scss'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="articles" replace />} />
        <Route path="articles" element={<BlogList />} />
        <Route path="articles/:slug" element={<BlogItemSingle />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route
          path="profile"
          element={
            <MustReg>
              <EditUser />
            </MustReg>
          }
        />
        <Route
          path="new-article"
          element={
            <MustReg>
              <CreatArticle />
            </MustReg>
          }
        />
        <Route
          path="articles/:slug/edit"
          element={
            <NotFound>
              <UpdateArticle />
            </NotFound>
          }
        />
      </Route>
    </Routes>
  )
}
export default App
