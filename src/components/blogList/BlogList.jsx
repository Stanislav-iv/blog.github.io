import React, { useEffect, useState } from 'react'
import './BlogList.scss'
import { Pagination, Row } from 'antd'
import BlogItem from '../blogItem/BlogItem'
import { useDispatch, useSelector } from 'react-redux'
import { getArticles } from '../../store/BlogSlice'

const BlogList = () => {
  const [offset, setOffset] = useState(0)
  const article = useSelector((state) => state.articlesReducer.article)
  const articleRequestStatus = useSelector((state) => state.articlesReducer.articleRequestStatus)
  const errorArticle = useSelector((state) => state.articlesReducer.error)
  const articlesCount = useSelector((state) => state.articlesReducer.articlesCount)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getArticles({ limit: 5, offset }))
  }, [dispatch, offset])

  return (
    <>
      {articleRequestStatus === 'pending' && <h2> Loading ...</h2>}
      {articleRequestStatus === 'rejected' && <h2> An error occured: {errorArticle} </h2>}

      {articleRequestStatus === 'fulfilled' &&
        article.articles.map((artic) => {
          return <BlogItem key={artic.slug} artice={artic} />
        })}
      {articleRequestStatus === 'fulfilled' && (
        <Row className="pagination" justify={'center'}>
          <Pagination
            onChange={(page) => {
              setOffset((page - 1) * 5)
            }}
            defaultCurrent={offset / 5 + 1}
            total={Math.ceil(articlesCount / 5)}
            pageSize={1}
          />
        </Row>
      )}
    </>
  )
}
export default BlogList
