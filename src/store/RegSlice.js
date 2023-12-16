import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchRegister = createAsyncThunk(
  'register/fetchRegister',
  async function ({ userName: username, email, password }, { rejectWithValue }) {
    try {
      const res = await fetch('https://blog.kata.academy/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ user: { username, email, password } }),
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
export const fetchLogin = createAsyncThunk(
  'register/fetchLogin',
  async function ({ email, password }, { rejectWithValue }) {
    try {
      const res = await fetch('https://blog.kata.academy/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ user: { email, password } }),
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
export const fetchGetUser = createAsyncThunk('register/fetchGetUser', async function (_, { rejectWithValue }) {
  try {
    const res = await fetch('https://blog.kata.academy/api/user', {
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
})
export const fetchUpdateUser = createAsyncThunk(
  'register/fetchUpdateUser',
  async function ({ userName: username, email, password, avatarUrl: image }, { rejectWithValue }) {
    try {
      const res = await fetch('https://blog.kata.academy/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          user: {
            email,
            username,
            password,
            image,
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

const regSlice = createSlice({
  name: 'register',
  initialState: {
    username: '',
    email: '',
    bio: '',
    image: '',
    userRequestStatus: null,
    error: null,
    userEdit: false,
  },
  reducers: {
    logOut(state) {
      localStorage.clear()
      state.username = ''
      state.email = ''
      state.bio = ''
      state.image = ''
      state.userRequestStatus = ''
    },
    NoEdit(state) {
      state.userEdit = false
    },
  },
  extraReducers: {
    [fetchRegister.pending]: (state) => {
      state.userRequestStatus = 'pending'
      state.error = null
      state.userEdit = false
    },
    [fetchLogin.pending]: (state) => {
      state.userRequestStatus = 'pending'
      state.error = null
      state.userEdit = false
    },
    [fetchGetUser.pending]: (state) => {
      state.userRequestStatus = 'pending'
      state.error = null
      state.userEdit = false
    },
    [fetchUpdateUser.pending]: (state) => {
      state.userRequestStatus = 'pending'
      state.error = null
      state.userEdit = false
    },
    [fetchRegister.fulfilled]: (state) => {
      state.userRequestStatus = 'fulfilled'
      state.userEdit = true
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.userRequestStatus = 'fulfilled'
      state.username = action.payload.user.username
      state.email = action.payload.user.email
      state.bio = action.payload.user.bio
      state.image = action.payload.user.image
      localStorage.setItem('token', action.payload.user.token)
      state.userEdit = true
    },
    [fetchGetUser.fulfilled]: (state, action) => {
      state.userRequestStatus = 'fulfilled'
      state.username = action.payload.user.username
      state.email = action.payload.user.email
      state.bio = action.payload.user.bio
      state.image = action.payload.user.image
      localStorage.setItem('token', action.payload.user.token)
      state.userEdit = true
    },
    [fetchUpdateUser.fulfilled]: (state) => {
      state.userRequestStatus = 'fulfilled'
      state.userEdit = true
    },
    [fetchRegister.rejected]: (state, action) => {
      state.error = action.payload
      state.userRequestStatus = 'rejected'
      state.userIsEdit = false
    },
    [fetchUpdateUser.rejected]: (state, action) => {
      state.error = action.payload
      state.userRequestStatus = 'rejected'
      state.userEdit = false
    },
  },
})
export const { logOut, NoEdit } = regSlice.actions
export default regSlice.reducer
