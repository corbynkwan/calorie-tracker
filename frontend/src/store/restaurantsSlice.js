import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'

export const getRestaurants = createAsyncThunk('restaurants/getRestaurants', async (restaurantId,filters) => {
  //Dummy data since backend isn't working
  let jwt = JSON.parse(sessionStorage.getItem("jwt"));
  console.log('called')

  let response;
  try{
   response = await fetch(`http://localhost:5001/eatery`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${jwt.token}`
    }
  })
} catch(err) {
  console.log(err)
}
  response = (await response.json()).results;
  return response
});

export const getNearbyRestaurants = createAsyncThunk('restaurants/getNearbyRestaurants', async (lat,long,maxDistance) => {
  const params = {
    lat: lat,
    long: long,
    maxDistance: maxDistance
  };
  //const response = await axios.get(ROUTE,params);
  //return response.data;

  return null;
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