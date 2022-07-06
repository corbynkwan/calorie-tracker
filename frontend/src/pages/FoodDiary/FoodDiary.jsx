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
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FoodTable from "../../components/FoodDiary/FoodTable";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';

import useStyles from "./style";
import { deleteUserLog, putUserLog } from '../../store/userSlice';

export default function FoodDiary(props) {

  const classes = useStyles();

  const [value, setValue] = React.useState(new Date("04/10/2022 12:00:00"));

  // Quick Tools
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
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
    let confirmation = confirm(`Delete entry for '${row.name}'? Press OK to confirm.`);

    if (confirmation) {
      dispatch(deleteUserLog(row.id));
    }
  }

  /* Edit Food Log */
  const handleEditEvent = (row) => {
    dispatch(putUserLog(row));
  }

  return (
    <>
      <Paper className={classes.wrapper}>
        <Grid container justify="center" alignItems="center" direction="column" className={classes.grid} spacing={3}>

          <Grid item>
            <Typography variant="h4" className={classes.heading}>Food Diary</Typography>
          </Grid>

          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                value={value}
                onChange={setValue}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item>
            <ButtonGroup variant="contained" color="primary">

              <Button>
                <Link to="/diary/add" className={classes.link}>ADD FOOD</Link>
              </Button>

              <Button onClick={handleQuickToolsClick} endIcon={<ArrowDropDownIcon />}> QUICK TOOLS </Button>

              <Menu id="menu" anchorEl={anchorEl} open={open} onClose={handleQuickToolsClose}>

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
            <FoodTable user={props.user} editEvent={handleEditEvent} deleteEvent={handleDeleteEvent}/>
          </Grid>

        </Grid>
      </Paper>
    </>
  );
}
