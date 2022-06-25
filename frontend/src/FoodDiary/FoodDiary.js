import * as React from "react";
import "../App.css";
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
import Header from "../Header";
import Footer from "../Footer";
import FoodTable from "./FoodTable";
import { Link } from "react-router-dom";
export default function FoodDiary() {
  const [value, setValue] = React.useState(new Date("04/10/2022 12:00:00"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Header />
      <Paper
        sx={{
          p: 2,
          minWidth: 600,
        }}
      >
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          style={{ minHeight: "100vh" }}
          spacing={3}
        >
          <Grid item>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                textDecoration: "none",
              }}
            >
              Food Diary
            </Typography>
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
            <ButtonGroup
              variant="contained"
              color="primary"
          
            >
              <Button>
                <Link
                  to="/customFoodPage"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  ADD FOOD
                </Link>
              </Button>

              <Button onClick={handleClick} endIcon={<ArrowDropDownIcon />}>
                QUICK TOOLS
              </Button>
              <Menu
                id="menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} disableRipple>
                  Copy Yesterday
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                  Copy from date
                </MenuItem>
              </Menu>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <FoodTable />
          </Grid>
        </Grid>
      </Paper>
      <Footer />
    </>
  );
}
