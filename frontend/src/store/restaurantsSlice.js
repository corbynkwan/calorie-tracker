import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'

export const getRestaurants = createAsyncThunk('restaurants/getRestaurants', async (restaurantId,filters) => {
  //Dummy data since backend isn't working
  const restaurants = [{
    name: "Pizza Hut",
    address: "6488 Pizza Blvd", 
    thumbnail: "http://logok.org/wp-content/uploads/2014/11/PizzaHut-logo-1967.png",
    desc: "Fast Food"
  },
  {
    name: "Triple O's",
    address: "UBC Sauders",
    thumbnail: "https://food.ubc.ca/wp-content/uploads/2020/01/Triple-Os-Logo-768x540.png",
    desc: "Fast Food"
  },
  {
    name: "Tim Hortons",
    address: "Forestry Building",
    thumbnail: "http://www.baycrestproam.ca/wp-content/uploads/2019/04/Tim-Hortons-Logo-NEW-v3-1.jpg",
    desc: "Fast Food"
  },
  {
    name: "Open Kitchen",
    address: "Orchard Commons",
    thumbnail: "https://food.ubc.ca/wp-content/uploads/2020/01/Open-Kitchen-Logo.png",
    desc: "Dinning Hall"
  },
  {
    name: "Mercante",
    address: "Ponderosa Commons",
    thumbnail: "https://food.ubc.ca/wp-content/uploads/2020/01/Mercante-Logo.png",
    desc: "Casual Dinning"
  },
  {
    name: "Ryuu Japanese Kitchen",
    address: "University Blvd",
    thumbnail: "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_300,w_300,f_auto,q_auto/284338/9540_688215.png",
    desc: "Casual Dinning"
  }
  ]

  /* ADD back once backend is working
  const params = {};
  if(restaurantId !== undefined) {
    params.restaurantId = restaurantId;
  }
  if(filters !== undefined) {
    params.filters = filters;
  }
  const response = await axios.get(ROUTE, params);
  return response.data;
  */
  return restaurants;
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