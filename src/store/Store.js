import { configureStore } from '@reduxjs/toolkit'
import BlogReducer from './BlogSlice'
import RegReduser from './RegSlice'

export default configureStore({
  reducer: {
    articlesReducer: BlogReducer,
    regReduser: RegReduser,
  },
})
