import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import axios from 'axios'
export const getAllFoods = createAsyncThunk('foods/getAllFoods', async () => {
  const foods = [
    {
      name: "Pasta",
      calories: 550,
      filters: [],
      from: "Pizza Hut",
      thumbnail: "http://www.sahmreviews.com/wp-content/uploads/2008/07/Pizza-Hut-Tuscani-Pasta.jpg"
    },
    {
      name: "Burger",
      calories: 750,
      filters: [],
      from: "Triple O's",
      thumbnail: "https://food.ubc.ca/wp-content/uploads/2020/01/Triple_B-1024x684.jpg"
    },
    {
      name: "Sandwich",
      calories: 470,
      filters: [],
      from: "Tim Hortons",
      thumbnail: "https://01a8e909a3fba5b2fffd-e931ab414fc454cf04e294580edbfa99.ssl.cf1.rackcdn.com/0H5A5151-1.jpg"
    },
    {
      name: "Bento Box",
      calories: 600,
      filters: [],
      from: "Ryuu Japanese Kitchen",
      thumbnail: "http://theindigokitchen.com/wp-content/uploads/2017/09/Bento2.jpg"
    }

  ]
  return foods;
  /* ADD back once backend is working 
  const response = await axios.get(ROUTE);
  return response.data;
  */
});

export const getRestaurantFoods = createAsyncThunk('foods/getRestaurantFoods', async (eateryId) => {
  let jwt = JSON.parse(sessionStorage.getItem("jwt"));
  console.log('called')
  const params = {};
  if(eateryId !== undefined) {
    params.eateryId = eateryId;
  }
  console.log('params',params)
  console.log(JSON.stringify(params))
  let response;
  try{
   response = await fetch(`https://calorie-tracker-prod-wfc97.ondigitalocean.app/api/items?eateryId=${eateryId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${jwt.token}`
    }
  })
} catch(err) {
  console.log(err)
}
  response = (await response.json()).result;
  
  return response
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