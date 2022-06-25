import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import {BACKEND_URI} from '../config'
import axios from 'axios'
const ROUTE = `${BACKEND_URI}/foods`;

export const getFoods = createAsyncThunk('foods/getFoods', async (restaurantId,foodId,filters) => {
  const params = {};
  if(restaurantId !== undefined) {
    params.restaurantId = restaurantId;
  }
  if(foodId !== undefined) {
    params.foodId = restaurantId;
  }
  if(filters !== undefined) {
    params.filters = filters;
  }
  const response = await axios.get(ROUTE, params);
  return response.data;
});



const foodsSlice = createSlice({
    name: 'foods',
    initialState: [],
    reducers: {
      example_reducer: (state,action) => {        
        state = action.payload
        return state;
      }
    },
    extraReducers(builder) {
      builder
        .addCase(getFoods.fulfilled, (state, action) => {
          console.log('getFoods.fulfilled',action.payload)
          return action.payload;
        })
    }
})



export const { } = foodsSlice.actions

export default foodsSlice.reducer