import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import restaurantsReducer from './restaurantsSlice'
import foodsReducer from './foodsSlice'
export default configureStore({
  reducer: {
    user: userReducer,
    restaurants:restaurantsReducer,
    foods: foodsReducer,
    rows: [
        
      ]
  }
})