import * as React from "react";
import { Paper } from "@mui/material";
import CustomFoodGrid from "../../components/CustomFood/CustomFoodGrid";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postUserLog } from "../../store/userSlice";
import HeaderWithSearch from "../../components/HeaderWithSearch/HeaderWithSearch";

export default function CustomFoodPage(props) {
  const location = useLocation();
  const { selectedDateTime } = location.state;

  const dispatch = useDispatch();

  const submitEvent = (newRow) => {
    newRow["dateTime"] = selectedDateTime;
    dispatch(postUserLog(newRow));
  };

  return (
    <>
    <HeaderWithSearch user={props.user} logout={props.logout} inner={true}/>
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
