import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { fetchUpdateArticle, fetchSingleArticle } from '../../store/BlogSlice'
import ArticleItem from '../articleItem/ArticleItem'

const UpdateArticle = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()
  const article = useSelector((state) => state.articlesReducer.singleArticle)

  const navigate = useNavigate()
  const location = useLocation()
  const fromPage = location.state?.from?.pathname || '/'
  const articleRequestStatus = useSelector((state) => state.articlesReducer.articleRequestStatus)
  const error = useSelector((state) => state.articlesReducer.error)
  const creatArticle = useSelector((state) => state.articlesReducer.creatArticle)

  useEffect(() => {
    dispatch(fetchSingleArticle(slug))
  }, [dispatch, slug])

  useEffect(() => {
    if (creatArticle === true) {
      navigate(fromPage, { replace: true })
    }
  }, [navigate, fromPage, creatArticle])

  const handlerFormSubmit = ({ title, description, text: body }, tagList) => {
    dispatch(fetchUpdateArticle({ slug, title, description, body, tagList }))

    navigate(fromPage, { replace: true })
  }

  return (
    <>
      {articleRequestStatus === 'pending' && <h2> Loading ...</h2>}
      {articleRequestStatus === 'rejected' && <h2> An error occured: {error} </h2>}

      {articleRequestStatus === 'fulfilled' && article && (
        <>
          <ArticleItem article={article} handlerFormSubmit={handlerFormSubmit} />
        </>
      )}
    </>
  )
}

export default UpdateArticle
