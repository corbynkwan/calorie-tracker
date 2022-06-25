import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import {BACKEND_URI} from '../config'
import axios from 'axios'
const ROUTE = `${BACKEND_URI}/users`;
export const getUser = createAsyncThunk('user/getUser', async (userId) => {
  //DUMMY DATA until backend is ready
  const user = {
	name: "Joey Sandles",
	weight: 120,
	height: 150,
	expectedCalories: 2000,
	todaysCalories: 1500,
  }
  /* UNCOMMENT after adding backend  
  const response = await axios.get(ROUTE,userId);
  return response.data;
  */
 return user;
});
export const putUser = createAsyncThunk('user/putUser', async (user) => {
  const response = await axios.put(ROUTE,user);
  return user
});
export const postUser = createAsyncThunk('user/postUser', async (user) => {
  const response = await axios.post(ROUTE,user);
  return response.data;
});

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
      example_reducer: (state,action) => {        
        state = action.payload
        return state;
      }
    },
    extraReducers(builder) {
      builder
        .addCase(getUser.fulfilled, (state, action) => {
          console.log('getUser.fulfilled',action.payload)
          return action.payload;
        })
        .addCase(putUser.fulfilled, (state, action) => {
          console.log('putUser.fulfilled',action.payload)
          //if status 200 then update state TODO: check if 400 status goes to putUser.fulfilled 
          state = action.payload
        })  
        .addCase(postUser.fulfilled, (state, action) => {
          console.log('postUser.fulfilled',action.payload)
        }) 

    }
})



export const { } = userSlice.actions

export default userSlice.reducer