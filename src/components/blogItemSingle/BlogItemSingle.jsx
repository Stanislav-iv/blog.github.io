import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSingleArticle } from '../../store/BlogSlice'

import { useParams } from 'react-router-dom'
import BlogItem from '../blogItem/BlogItem'
const BlogItemSingle = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()

  const articleRequestStatus = useSelector((state) => state.articlesReducer.articleRequestStatus)
  const errorArticle = useSelector((state) => state.articlesReducer.error)

  useEffect(() => {
    dispatch(fetchSingleArticle(slug))
  }, [dispatch, slug])

  const artice = useSelector((state) => state.articlesReducer.singleArticle)

  return (
    <>
      {articleRequestStatus === 'pending' && <h2> Loading ...</h2>}
      {articleRequestStatus === 'rejected' && <h2> An error occured: {errorArticle} </h2>}

      {articleRequestStatus === 'fulfilled' && artice && (
        <div>
          <BlogItem artice={artice} singlePage />
        </div>
      )}
    </>
  )
}
export default BlogItemSingle
