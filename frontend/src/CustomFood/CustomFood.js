import * as React from 'react';
import {Paper, Button, Grid, TextField,InputAdornment} from '@mui/material';
export default function CustomFood(){
  
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
          xs={12} spacing={3}
          >
            <Grid item>
             
          </Grid>   
          <Grid item>nut
              <div>Nutrition Facts</div>
          </Grid>   
         <hr></hr>
          <Grid item >
            <TextField
                id="Calories"
                label="Calories"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
              />
           </Grid>
          <Grid item>
              <TextField
                id="Total Fat"
                label="Total Fat"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                }}
                variant="filled"
              />
            </Grid>
            <Grid item>
              <TextField
                
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }}
                variant="filled"
              />
            </Grid>
            <Grid item>
              <TextField
                id="Protein"
                label="Total Protein"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }}
                variant="filled"
              />
            </Grid>
            <Grid item>
              <TextField
                id="Sodium"
                label="Sodium"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">mg</InputAdornment>,
                }}
                variant="filled"
              />
            </Grid>
            <Grid item>
              <TextField
                id="Potassium"
                label="Potassium"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">mg</InputAdornment>,
                }}
                variant="filled"
              />
            </Grid>
            <Grid item>
             <TextField
                id="Cholesterol"
                label="Cholesterol"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">mg</InputAdornment>,
                }}
                variant="filled"
              />
              
            </Grid>
            <Button  variant = "contained" color="primary"> ADD FOOD </Button>
        </Grid> 
      </Paper>
    </> 
  )
}