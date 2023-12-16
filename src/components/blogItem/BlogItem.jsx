import React, { useState } from 'react'
import './BlogItem.scss'
import avatarDef from '../img/avatar.svg'
import { Link, useNavigate } from 'react-router-dom'
import { fetchDeleteArticle, fetchLikeArticle, fetchDellikeArticle } from '../../store/BlogSlice'
import { useDispatch, useSelector } from 'react-redux'
import ModalDelete from '../modalDelete/ModalDelete'
import { Checkbox } from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import DateFns from '../utilites/DateFns'
import Key from '../utilites/Key'
import { Button } from 'antd'
import ReactMarkdown from 'react-markdown'

const BlogItem = ({ singlePage, artice }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const login = useSelector((state) => state.regReduser.username)

  const [modalOpen, setModalOpen] = useState(false)
  const [checkLike, setCheckLike] = useState(artice?.favorited || false)
  const [LikeCount, setLikeCount] = useState(artice.favoritesCount)

  const authorUser = artice.author.username

  const closeModal = () => setModalOpen(false)

  const openModal = () => setModalOpen(true)

  const handleCheckboxClick = (event) => {
    if (event.target.checked) {
      dispatch(fetchLikeArticle(artice.slug))
      setCheckLike(true)
      setLikeCount(LikeCount + 1)
    } else {
      dispatch(fetchDellikeArticle(artice.slug))
      setCheckLike(false)
      setLikeCount(LikeCount - 1)
    }
  }
  const deleteArticle = () => {
    dispatch(fetchDeleteArticle(artice.slug))
    setModalOpen(false)
    navigate('/articles', { replace: true })
  }

  return (
    <>
      <div className="itemBlog">
        <div className="itemBlog__title">
          {!singlePage && (
            <h1>
              <Link className="itemBlog__titleLink" to={`${artice.slug}`}>
                {artice.title}
              </Link>
            </h1>
          )}
          {singlePage && <h1 className="itemBlog__titleLink">{artice.title}</h1>}
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: 'red' }} />}
            disabled={!login}
            checked={checkLike}
            onClick={(event) => handleCheckboxClick(event)}
          />
          <div>{LikeCount}</div>
          <div className="itemBlog__avatar">
            <div className="itemBlog__name">
              <span className="itemBlog__author">{artice.author.username}</span>
              <span className="itemBlog__date">{DateFns(artice.createdAt)}</span>
            </div>

            <img className="itemBlog__avatar" src={artice.author.image || avatarDef} alt="avatar" />
          </div>
        </div>

        {artice.tagList.map(
          (tag) =>
            tag && (
              <div className="itemBlog__tag" key={Key()}>
                {tag}
              </div>
            )
        )}
        <div className="itemBlog__shortButton">
          <div className="itemBlog__shortText">{artice.description}</div>
          {singlePage && login === authorUser && (
            <div className="itemBlog__button">
              <Button className="itemBlog__delete" onClick={openModal}>
                Delete
              </Button>
              <Link to="edit">
                <Button className="itemBlog__edit">Edit</Button>
              </Link>
            </div>
          )}
        </div>
        {singlePage && (
          <div className="itemBlog__body">
            <ReactMarkdown>{artice.body}</ReactMarkdown>
          </div>
        )}
      </div>
      <ModalDelete modalOpen={modalOpen} closeModal={closeModal} handleDelete={deleteArticle} />
    </>
  )
}
export default BlogItem
