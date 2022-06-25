import { configureStore } from '@reduxjs/toolkit'
import userReducer from './globalSlices/userSlice'
import restaurantsReducer from './Restaurant/restaurantsSlice'
import foodsReducer from './Item/foodsSlice'
export default configureStore({
  reducer: {
    user: userReducer,
    restaurants:restaurantsReducer,
    foods: foodsReducer
  }
})