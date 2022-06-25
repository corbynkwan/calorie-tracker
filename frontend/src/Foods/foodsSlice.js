import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import {BACKEND_URI} from '../config'
import axios from 'axios'
const ROUTE = `${BACKEND_URI}/foods`;

export const getAllFoods = createAsyncThunk('foods/getAllFoods', async () => {
  const foods = [
    {
      name: "pizza",
      calories: 1000,
      filters: []
    },
    {
      name: "burger",
      calories: 1000,
      filters: []
    },
    {
      name: "taco",
      calories: 1000,
      filters: []
    },
    {
      name: "something",
      calories: 1000,
      filters: []
    }

  ]
  return foods;
  /* ADD back once backend is working 
  const response = await axios.get(ROUTE);
  return response.data;
  */
});

export const getRestaurantFoods = createAsyncThunk('foods/getRestaurantFoods', async (restaurantId) => {
  const foods = [
    {
      name: "pizza 1",
      calories: 1000,
      filters: []
    },
    {
      name: "pizza 2",
      calories: 1000,
      filters: []
    },
    {
      name: "pizza 3",
      calories: 1000,
      filters: []
    },
    {
      name: "pizza 4",
      calories: 1000,
      filters: []
    }

  ]
  return foods;
  /* ADD back once backend is working 
  const params = {};
  if(restaurantId !== undefined) {
    params.restaurantId = restaurantId;
  }
  const response = await axios.get(ROUTE, params);
  return response.data;
  */
});

const foodsSlice = createSlice({
    name: 'foods',
    initialState: {
      allFoods: [],
      restaurantFoods:[]
    },
    reducers: {
      example_reducer: (state,action) => {        
        state = action.payload
        return state;
      }
    },
    extraReducers(builder) {
      builder
        .addCase(getAllFoods.fulfilled, (state, action) => {
          console.log('getAllFoods.fulfilled',action.payload)
          state.allFoods = action.payload;
          return state;
        })
        .addCase(getRestaurantFoods.fulfilled, (state, action) => {
          console.log('getRestaurantFoods.fulfilled',action.payload)
          state.restaurantFoods = action.payload;
          return state;
        })
    }
})



export const { } = foodsSlice.actions

export default foodsSlice.reducer