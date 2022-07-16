import * as React from "react";
import { Paper} from "@mui/material";
import CustomFoodGrid from "../../components/CustomFood/CustomFoodGrid";

import { useSelector, useDispatch } from 'react-redux'
import { postUserLog } from '../../store/userSlice';

export default function CustomFoodPage() {
  const dispatch = useDispatch();

  const submitEvent = (newRow) => {
    dispatch(postUserLog(newRow));
  }

  return (
    <>
       <Paper
        sx={{
          p: 2,
          minWidth: 600,
        }}
      >
        <CustomFoodGrid submitEvent={submitEvent}/>
      </Paper>
    </>
  );
}
