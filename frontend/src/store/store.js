import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import restaurantsReducer from './restaurantsSlice'
import foodsReducer from './foodsSlice'
import dateReducer from './dateSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    restaurants:restaurantsReducer,
    foods: foodsReducer,
    date: dateReducer,
    rows: [
        
      ]
  }
})