import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getArticles = createAsyncThunk(
  'article/getArticles',
  async function ({ limit, offset }, { rejectWithValue }) {
    try {
      const res = await fetch(`https://blog.kata.academy/api/articles?limit=${limit}&offset=${offset}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
      if (!res.ok) {
        throw new Error('Server Error!')
      }
      const data = await res.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const fetchSingleArticle = createAsyncThunk(
  'article/fetchSingleArticle',
  async function (slug, { rejectWithValue }) {
    try {
      const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`)
      if (!res.ok) {
        throw new Error('Server Error!')
      }
      const data = await res.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const fetchCreateArticle = createAsyncThunk(
  'register/fetchCreateArticle',
  async function ({ title, description, body, tagList }, { rejectWithValue }) {
    try {
      const res = await fetch('https://blog.kata.academy/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          article: {
            title,
            description,
            body,
            tagList,
          },
        }),
      })
      if (!res.ok) {
        throw new Error('Server Error!')
      }
      const data = await res.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const fetchUpdateArticle = createAsyncThunk(
  'register/fetchUpdateArticle',
  async function ({ slug, title, description, body, tagList }, { rejectWithValue }) {
    try {
      const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          article: {
            title,
            description,
            body,
            tagList,
          },
        }),
      })
      if (!res.ok) {
        throw new Error('Server Error!')
      }
      const data = await res.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const fetchDeleteArticle = createAsyncThunk(
  'register/fetchDeleteArticle',
  async function (slug, { rejectWithValue }) {
    try {
      const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
      if (!res.ok) {
        throw new Error('Server Error!')
      }
      const data = await res.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const fetchLikeArticle = createAsyncThunk(
  'register/fetchLikeArticle',
  async function (slug, { rejectWithValue }) {
    try {
      const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
      if (!res.ok) {
        throw new Error('Server Error!')
      }
      const data = await res.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const fetchDellikeArticle = createAsyncThunk(
  'register/fetchDellikeArticle',
  async function (slug, { rejectWithValue }) {
    try {
      const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
      if (!res.ok) {
        throw new Error('Server Error!')
      }
      const data = await res.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const blogSlice = createSlice({
  name: 'article',
  initialState: {
    article: [],
    articleRequestStatus: '',
    articlesCount: null,
    error: null,
    singleArticle: null,
    creatArticle: false,
  },
  reducers: {},
  extraReducers: {
    [getArticles.pending]: (state) => {
      state.articleRequestStatus = 'pending'
      state.error = null
    },
    [fetchSingleArticle.pending]: (state) => {
      state.articleRequestStatus = 'pending'
      state.error = null
    },
    [fetchCreateArticle.pending]: (state) => {
      state.articleRequestStatus = 'pending'
      state.error = null
      state.creatArticle = false
    },
    [fetchUpdateArticle.pending]: (state) => {
      state.articleRequestStatus = 'pending'
      state.error = null
      state.creatArticle = false
    },
    [fetchDeleteArticle.pending]: (state) => {
      state.articleRequestStatus = 'pending'
      state.error = null
    },

    [getArticles.fulfilled]: (state, action) => {
      state.articleRequestStatus = 'fulfilled'
      state.articlesCount = action.payload.articlesCount
      state.article = action.payload
    },
    [fetchSingleArticle.fulfilled]: (state, action) => {
      state.singleArticle = { ...action.payload.article }
      state.articleRequestStatus = 'fulfilled'
    },
    [fetchCreateArticle.fulfilled]: (state) => {
      state.articleRequestStatus = 'fulfilled'
      state.creatArticle = true
    },
    [fetchUpdateArticle.fulfilled]: (state) => {
      state.articleRequestStatus = 'fulfilled'
      state.creatArticle = true
    },
    [fetchDeleteArticle.fulfilled]: (state) => {
      state.articleRequestStatus = 'fulfilled'
    },
    [getArticles.rejected]: (state, action) => {
      state.articleRequestStatus = 'rejected'
      state.error = action.payload
    },

    [fetchSingleArticle.rejected]: (state, action) => {
      state.error = action.payload
      state.articleRequestStatus = 'rejected'
    },
    [fetchCreateArticle.rejected]: (state, action) => {
      state.error = action.payload
      state.articleRequestStatus = 'rejected'
    },
    [fetchUpdateArticle.rejected]: (state, action) => {
      state.error = action.payload
      state.articleRequestStatus = 'rejected'
    },
    [fetchDeleteArticle.rejected]: (state, action) => {
      state.error = action.payload
      state.articleRequestStatus = 'rejected'
    },
    [fetchLikeArticle.rejected]: (state, action) => {
      state.error = action.payload
      state.articleRequestStatus = 'rejected'
    },
    [fetchDellikeArticle.rejected]: (state, action) => {
      state.error = action.payload
      state.articleRequestStatus = 'rejected'
    },
  },
})

export default blogSlice.reducer
