import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import {BACKEND_URI} from '../config'
import axios from 'axios'
const ROUTE = `${BACKEND_URI}/users`;
export const getUser = createAsyncThunk('user/getUser', async (userId) => {
  //DUMMY DATA until backend is ready
  let user = {
    name: "Human",
    weight: 120,
    height: 150,
    expectedCalories: 2000,
    todaysCalories: 1500,
    log: [
      {
        id: 1,
        name: "ancake",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
      },
      {
        id: 2,
        name: "Donut",
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
      },
      {
        id: 3,
        name: "Frozen yoghurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
      },
      {
        id: 4,
        name: "Gingerbread",
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
      },
      {
        id: 5,
        name: "Honeycomb",
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
      },
      {
        id: 6,
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
      },
      {
        id: 7,
        name: "Jelly Bean",
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
      },
      {
        id: 8,
        name: "Kitkat",
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7.0,
      }
    ]
  }
  /* UNCOMMENT after adding backend  
  const response = await axios.get(ROUTE,userId);
  return response.data;
  */
 return user;
});
export const postUserLog = createAsyncThunk('user/postUserLog', async (newRow) => {
  //console.log(user);
  //const response = await axios.put(ROUTE,user);
  return newRow;
});
export const putUserLog = createAsyncThunk('user/putUserLog', async (newRow) => {
  //console.log(user);
  //const response = await axios.put(ROUTE,user);
  return newRow;
});
export const deleteUserLog = createAsyncThunk('user/deleteUserLog', async (logId) => {
  //const response = await axios.post(ROUTE,user);
  return logId;
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
        .addCase(postUserLog.fulfilled, (state, action) => {
          console.log('postUserLog.fulfilled',action.payload)
          //if status 200 then update state TODO: check if 400 status goes to putUser.fulfilled
          action.payload.id = state.log.length;
          state.log.push(action.payload);
          console.log(state.log);
        })  
        .addCase(putUserLog.fulfilled, (state, action) => {
          console.log('putUserLog.fulfilled',action.payload)
          //if status 200 then update state TODO: check if 400 status goes to putUser.fulfilled 
          state.log[action.payload.id-1] = action.payload;
        })  
        .addCase(deleteUserLog.fulfilled, (state, action) => {

          state.log.splice(action.payload-1, 1);

          let updatedLogs = [];

          let idx = 0;
          for (let log of state.log) {

            log.id = idx + 1;
            updatedLogs.push(log);
            idx++;

          }

          state.log = updatedLogs;
          console.log('deleteUser.fulfilled',action.payload)
        }) 

    }
})



export const { } = userSlice.actions

export default userSlice.reducer