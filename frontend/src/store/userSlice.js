import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("user/getUser", async () => {
  let info = JSON.parse(sessionStorage.getItem("user"));
  let jwt = JSON.parse(sessionStorage.getItem("jwt"));

  let response = await fetch("http://localhost:5001/User/FoodLogs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt.token}`,
    },
  });

  response = await response.json();
  let log = response.log;

  let reportResponse = await fetch(
    `http://localhost:5001/User/FoodLogReport/7`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt.token}`,
      },
    }
  );
  reportResponse = await reportResponse.json();
  let logsReport = reportResponse.logsReport;

  return { info: info, log: log, logsReport: logsReport};
});

export const getUserLog = createAsyncThunk(
  "user/getUserLog",
  async (dateTime) => {
    let jwt = JSON.parse(sessionStorage.getItem("jwt"));
    let response = await fetch(
      `http://localhost:5001/User/FoodLogs/${dateTime}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${jwt.token}`,
        },
      }
    );

    response = await response.json();
    let log = response.log;

    return log;
  }
);

export const getUserLogReportPeriod = createAsyncThunk(
  "user/getUserLogReportPeriod",
  async (period) => {
    let jwt = JSON.parse(sessionStorage.getItem("jwt"));
    let response = await fetch(
      `http://localhost:5001/User/FoodLogReport/${period}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${jwt.token}`,
        },
      }
    );
    response = await response.json();
    let logsReport = response.logsReport;

    return logsReport;
  }
);

export const postUserLog = createAsyncThunk(
  "user/postUserLog",
  async (newRow) => {
    let jwt = JSON.parse(sessionStorage.getItem("jwt"));

    let response = await fetch(
      "https://calorie-tracker-prod-wfc97.ondigitalocean.app/api/User/FoodLog",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${jwt.token}`,
        },
        body: `{
      "newRow": ${JSON.stringify(newRow)}
    }`,
      }
    );
    response = await response.json();
    let log = response.log;

    return log;
  }
);

export const putUserLog = createAsyncThunk(
  "user/putUserLog",
  async (newRow) => {
    let jwt = JSON.parse(sessionStorage.getItem("jwt"));

    let response = await fetch(
      "https://calorie-tracker-prod-wfc97.ondigitalocean.app/api/User/FoodLog",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${jwt.token}`,
        },
        body: `{
      "updatedRow": ${JSON.stringify(newRow)}
    }`,
      }
    );

    response = await response.json();
    let log = response.log;

    return log;
  }
);

export const deleteUserLog = createAsyncThunk(
  "user/deleteUserLog",
  async (logId) => {
    let jwt = JSON.parse(sessionStorage.getItem("jwt"));

    let response = await fetch(
      `https://calorie-tracker-prod-wfc97.ondigitalocean.app/api/User/FoodLog/${logId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${jwt.token}`,
        },
      }
    );

    response = await response.json();

    return logId;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    info: {},
    log: [],
    logsReport: [],
  },
  reducers: {
    example_reducer: (state, action) => {
      state = action.payload;
      return state;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        console.log("getUser.fulfilled", action.payload);
        state.info = action.payload.info;
        state.log = action.payload.log;
        state.logsReport = action.payload.logsReport;
      })
      .addCase(getUserLog.fulfilled, (state, action) => {
        console.log("getUserLog.fulfilled", action.payload);
        state.log = action.payload;
      })
      .addCase(getUserLogReportPeriod.fulfilled, (state, action) => {
        console.log("getUserReportPeriod.fulfilled", action.payload);
        state.logsReport = action.payload;
      })
      .addCase(postUserLog.fulfilled, (state, action) => {
        console.log("postUserLog.fulfilled", action.payload);
        //if status 200 then update state TODO: check if 400 status goes to putUser.fulfilled
        state.log.push(action.payload);
      })
      .addCase(putUserLog.fulfilled, (state, action) => {
        console.log("putUserLog.fulfilled", action.payload);
        //if status 200 then update state TODO: check if 400 status goes to putUser.fulfilled
        let index = state.log.findIndex(
          (log) => log.id == action.payload.oldId
        );
        state.log.splice(index, 1);

        let updatedLogs = [];

        let idx = 0;
        for (let log of state.log) {
          log.id = idx + 1;
          updatedLogs.push(log);
          idx++;
        }

        updatedLogs.push(action.payload);
        state.log = updatedLogs;
      })
      .addCase(deleteUserLog.fulfilled, (state, action) => {
        let index = state.log.findIndex((log) => log.id == action.payload);
        state.log.splice(index, 1);

        let updatedLogs = [];

        let idx = 0;
        for (let log of state.log) {
          log.id = idx + 1;
          updatedLogs.push(log);
          idx++;
        }

        state.log = updatedLogs;
        console.log("deleteUser.fulfilled", action.payload);
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
