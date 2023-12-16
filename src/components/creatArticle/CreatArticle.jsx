import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchCreateArticle } from '../../store/BlogSlice'
import ArticleItem from '../articleItem/ArticleItem'

const CreatArticle = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handlerFormSubmit = ({ title, description, text: body }, tagList) => {
    dispatch(fetchCreateArticle({ title, description, body, tagList }))
    navigate('/articles', { replace: true })
  }

  return <ArticleItem handlerFormSubmit={handlerFormSubmit} />
}

export default CreatArticle
