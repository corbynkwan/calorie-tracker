import * as React from "react";
import { Paper } from "@mui/material";
import CustomFoodGrid from "../../components/CustomFood/CustomFoodGrid";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postUserLog } from "../../store/userSlice";

export default function CustomFoodPage() {
  const location = useLocation();
  const { selectedDateTime } = location.state;

  const dispatch = useDispatch();

  const submitEvent = (newRow) => {
    newRow["dateTime"] = selectedDateTime;
    dispatch(postUserLog(newRow));
  };

  return (
    <>
      <Paper
        sx={{
          p: 2,
          minWidth: 600,
        }}
      >
        <CustomFoodGrid submitEvent={submitEvent} />
      </Paper>
    </>
  );
}
