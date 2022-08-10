import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'

export const getRestaurants = createAsyncThunk('restaurants/getRestaurants', async (coordinates,filters) => {

  let jwt = JSON.parse(sessionStorage.getItem("jwt"));

  let response;

  try{

   response = await fetch(`https://calorie-tracker-prod-wfc97.ondigitalocean.app/api/nearby?lat=${coordinates.lat}&lon=${coordinates.lon}&maxDist=500`, {
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
  // const params = {
  //   lat: lat,
  //   long: long,
  //   maxDistance: maxDistance
  // };

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