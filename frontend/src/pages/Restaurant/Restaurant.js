import * as React from "react";
import { Paper} from "@mui/material";
import {useLocation} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { postUserLog } from '../../store/userSlice';
import FoodTable from "./FoodTable";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Button,
  ButtonGroup,
  Grid,
  TextField,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Container } from '@mui/material';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { setDate } from "../../store/dateSlice";
import {
  deleteUserLog,
  putUserLog,
  getUserLog,
  getUser,
} from "../../store/userSlice";
import useStyles from "../FoodDiary/style";
import Header from "../../components/Header/Header";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
export default function Restaurant(props) {
  const dispatch = useDispatch();
  let query = useQuery();
  const storeDate = useSelector((state) => state.date);
  const [dateTime, setDateTime] = React.useState(new Date(storeDate.date));
  const classes = useStyles();


  return (
    <>
    
<Container maxWidth="md">
    <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          className={classes.grid}
          spacing={3}
        >
    <Grid item style={{margin: "20px"}}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date desktop"
                value={dateTime}
                onChange={(dateTime) => {
                  console.log("What is dateTime", dateTime.toISOString())
                  setDateTime(dateTime);
                  dispatch(setDate(dateTime.toISOString()));
                  // Date only format e.g. "2022-07-23"
                  dispatch(getUserLog(dateTime.toISOString()));
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>

    <Header user={props.user} logout={props.logout}/>

    <FoodTable id={query.get("id")}/>
    </Grid>
    </Container>
    </>
  );
}