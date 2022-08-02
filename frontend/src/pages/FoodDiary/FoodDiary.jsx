/*
 *Food Diary Page
 */

import * as React from "react";

import {
  Paper,
  Button,
  ButtonGroup,
  Grid,
  TextField,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUserLog,
  putUserLog,
  getUserLog,
  getUser,
} from "../../store/userSlice";
import { setDate } from "../../store/dateSlice";

/* styles */
import useStyles from "./style";

/* components */
import FoodTable from "../../components/FoodDiary/FoodTable";
import Report from "../../components/Report/Report";
export default function FoodDiary(props) {
  const classes = useStyles();
  const storeDate = useSelector((state) => state.date);
  const [dateTime, setDateTime] = React.useState(new Date(storeDate.date));
  // Quick Tools
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // timezone offset in milliseconds
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const handleQuickToolsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleQuickToolsClose = () => {
    setAnchorEl(null);
  };

  // Data manipulation events

  const dispatch = useDispatch();

  /* Delete Food Log */
  const handleDeleteEvent = (row) => {
    let confirmation = confirm(
      `Delete entry for '${row.name}'? Press OK to confirm.`
    );

    if (confirmation) {
      dispatch(deleteUserLog(row.id));
    }
  };

  /* Edit Food Log */
  const handleEditEvent = (row) => {
    dispatch(putUserLog(row));
  };

  return (
    <>
      <Paper className={classes.wrapper}>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          className={classes.grid}
          spacing={3}
        >
          <Grid item>
            <Typography variant="h4" className={classes.heading}>
              Food Diary
            </Typography>
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date desktop"
                inputFormat="MM/dd/yyyy"
                value={dateTime}
                onChange={(dateTime) => {
                  // minus timezone offset to get ISOstring representing local time     
                  dateTime = new Date(dateTime - tzoffset).toISOString()
                  setDateTime(dateTime);
                  // Date only format e.g. "2022-07-23"
                  dispatch(setDate(dateTime));
                  dispatch(getUserLog(dateTime.substring(0, 10)));
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <ButtonGroup variant="contained" color="primary">
              <Button>
                <Link
                  to="/diary/add"
                  className={classes.link}
                  state={{ selectedDateTime: dateTime }}
                >
                  ADD FOOD
                </Link>
              </Button>

              <Button
                onClick={handleQuickToolsClick}
                endIcon={<ArrowDropDownIcon />}
              >
                {" "}
                QUICK TOOLS{" "}
              </Button>

              <Menu
                id="menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleQuickToolsClose}
              >
                <MenuItem onClick={handleQuickToolsClose} disableRipple>
                  Copy Yesterday
                </MenuItem>

                <MenuItem onClick={handleQuickToolsClose} disableRipple>
                  Copy from date
                </MenuItem>
              </Menu>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <FoodTable
              user={props.user}
              editEvent={handleEditEvent}
              deleteEvent={handleDeleteEvent}
            />
          </Grid>
          {/* <Grid item>
            <Report />
          </Grid> */}
        </Grid>
      </Paper>
    </>
  );
}
