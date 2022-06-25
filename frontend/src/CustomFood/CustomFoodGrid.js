import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  TextField,
  Button,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import nutritionFact from "../images/nutritionFact.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  parentContainer: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 800,
    border: "1px solid grey",
  },
  standalone: {
    textAlign: "center",
    height: 70,
    backgroundColor: "#378FE7",
  },
  media: {
    height: 450,
    width: 280,
  },
  addFoodButton: {
    backgroundColor: "#378FE7",
    color: "white",

  },
  gridHeader: {
    fontFamily: "monospace",
    color: "white",
    fontWeight: 700,
    letterSpacing: ".2rem",
    textDecoration: "none",
  },
  title: {
    fontFamily: "monospace",
    color: "black",
    fontWeight: 700,
    letterSpacing: ".2rem",
  },
}));

import { useSelector, useDispatch } from 'react-redux'

import { postUserLog, getUser } from '../globalSlices/userSlice';

export default function CustomFoodGrid() {
  const classes = useStyles();

  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getUser())
  }, [dispatch]);

  let user = useSelector(state => state.user);
  console.log(user);
  
  const handleSubmit = () => {
    let modifications = [];

    modifications.push(document.querySelector('#desc').value);
    modifications.push(document.querySelector('#calories').value);
    modifications.push(document.querySelector('#fat').value);
    modifications.push(document.querySelector('#carbs').value);
    modifications.push(document.querySelector('#protein').value);

    let newRow = {
      name: modifications[0],
      calories: modifications[1],
      fat: modifications[2],
      carbs: modifications[3],
      protein: modifications[4]
    }

    dispatch(postUserLog(newRow));

    alert('done');

  }


  return (
    <div>
      <div className={classes.root}>
        <Grid container className={classes.parentContainer}>
          <Grid container spacing={4}>
            <Grid item xs={12} className={classes.standalone}>
              <Typography variant="h4" className={classes.gridHeader}>
                Custom Food:
              </Typography>
            </Grid>
            <Grid item container direction="column" alignItems="center">
              <Grid
                item
                container
                alignItems="center"
                justifyContent="center"
                spacing={2}
              >
                <Grid item xs={6} container alignItems="center">
                  <Grid container spacing={6} alignItems="center">
                    <Grid container item xs={12} spacing={3}>
                      <Grid
                        item
                        container
                        xs={12}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Typography variant="h5" className={classes.title}>
                          Name:
                        </Typography>

                        <Grid item xs={6}>
                          <TextField
                            id="desc"
                            label="name"
                            type="text"
                            variant="filled"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={3}>
                      <Grid item xs={6}>
                        <TextField
                          id="calories"
                          label="Calories"
                          type="number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="filled"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="fat"
                          label="Total Fat"
                          type="number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">kg</InputAdornment>
                            ),
                          }}
                          variant="filled"
                        />
                      </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={3}>
                      <Grid item xs={6}>
                        <TextField
                          id="carbs"
                          label="Total Carbs"
                          type="number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">g</InputAdornment>
                            ),
                          }}
                          variant="filled"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="protein"
                          label="Total Protein"
                          type="number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">g</InputAdornment>
                            ),
                          }}
                          variant="filled"
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      justifyContent="center"
                      alignItems="center"
                      xs={12}
                      spacing={3}
                    >
                      <Grid item xs={4}>
                        <Grid item>
                          <Button className={classes.addFoodButton} onClick={handleSubmit}>
                            ADD FOOD
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid>
                    <img
                      src={nutritionFact}
                      className={classes.media}
                      alt="nutritionFact"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
