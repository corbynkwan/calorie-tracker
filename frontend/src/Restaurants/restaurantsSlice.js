import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import {BACKEND_URI} from '../config'
import axios from 'axios'
const ROUTE = `${BACKEND_URI}/restaurants`;

export const getRestaurants = createAsyncThunk('restaurants/getRestaurants', async (restaurantId,filters) => {
  const params = {};
  if(restaurantId !== undefined) {
    params.restaurantId = restaurantId;
  }
  if(filters !== undefined) {
    params.filters = filters;
  }
  const response = await axios.get(ROUTE, params);
  return response.data;
});

export const getNearbyRestaurants = createAsyncThunk('restaurants/getNearbyRestaurants', async (lat,long,maxDistance) => {
  const params = {
    lat: lat,
    long: long,
    maxDistance: maxDistance
  };
  const response = await axios.get(ROUTE,params);
  return response.data;
});


const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState: [],
    reducers: {
      example_reducer: (state,action) => {        
        state = action.payload
        return state;
      }
    },
    extraReducers(builder) {
      builder
        .addCase(getRestaurants.fulfilled, (state, action) => {
          console.log('getRestaurants.fulfilled',action.payload)
          return action.payload;
        })
        .addCase(getNearbyRestaurants.fulfilled, (state, action) => {
          console.log('getRestaurants.fulfilled',action.payload)
          return action.payload;
        })


    }
})



export const { } = restaurantsSlice.actions

export default restaurantsSlice.reducer