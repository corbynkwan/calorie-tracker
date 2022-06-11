import * as React from 'react';
import {Paper, Button, ButtonGroup, Grid, TextField, Menu, MenuItem} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DataGrid} from '@mui/x-data-grid';


export default function InputForm(){

  const [value, setValue] = React.useState(new Date("04/10/2022 12:00:00"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const rows = [
    { id: 1, col1: 'Cell', col2: 'Cell', col3: 'Cell', col4: 'Cell', col5: 'Cell' },
    { id: 2, col1: 'Cell',col2: 'Cell', col3: 'Cell', col4: 'Cell', col5: 'Cell' },
    { id: 3, col1: 'Cell', col2: 'Cell', col3: 'Cell', col4: 'Cell', col5: 'Cell' },
    { id: 3, col1: 'Cell', col2: 'Cell', col3: 'Cell', col4: 'Cell', col5: 'Cell' }, 
  ];
  
  const columns = [
    { field: 'col1', headerName: 'Food', flex: 1},
    { field: 'col2', headerName: 'Calorie', flex: 1 },
    { field: 'col3', headerName: 'Carbs', flex: 1 },
    { field: 'col4', headerName: 'Protein', flex: 1 },
    { field: 'col5', headerName: 'Fat', flex: 1 }
  ];
  
  return (
    <>
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
          style={{minHeight:"100vh"}}
          spacing={3}>

          <Grid item>
              <div><strong>Food Diary</strong></div>
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
            <ButtonGroup variant = "contained" color="primary">
                  <Button > ADD FOOD </Button> 
                  <Button 
                   onClick={handleClick}
                   endIcon={<ArrowDropDownIcon />}
                  > QUICK TOOLS 
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
                    <MenuItem onClick={handleClose} disableRipple>
                      Remember meal
                    </MenuItem>
                  </Menu>
              </ButtonGroup>
          </Grid>
          <Grid item >
            <div style={{ height: 300, width: '100%'}}>
              <DataGrid rows={rows} columns={columns} />
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}