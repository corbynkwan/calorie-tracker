import {Button, Container, Grid, Paper, styled, Typography} from "@material-ui/core";
import {Img} from "../Restaurant/Restaurant";
import {Food} from "./Food"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getRestaurantFoods } from '../../store/foodsSlice';
/* */
export default function Foods() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRestaurantFoods())
    }, [dispatch]); 
    const foods = useSelector(state => state.foods.restaurantFoods);
    const renderFoods = () => {
        let res = [];
        for (let i = 0; i < foods.length; i++) {
          res.push(
            <Grid item xs={3}> <Food food={foods[i]}></Food></Grid>
          );
        }
        return res;
    }
   return(
       <Container maxWidth={"md"}>
           <Paper>
               <Grid container spacing={2}>
                   <Grid item>
                       <Container disableGutters  sx={{ width: 128, height: 128}}>
                           <Img alt="complex" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/VAN_CAT.png/220px-VAN_CAT.png" />
                       </Container>
                   </Grid>
                   <Grid item xs={2} sm container>
                       <Grid item xs container direction="column" spacing={2}>
                           <Grid item xs>
                               <Typography gutterBottom variant="subtitle1" component="div">
                                   Cat Restaurant
                               </Typography>
                               <Typography variant="body2" gutterBottom>
                                   address..
                               </Typography>
                               <Typography variant="body2" >
                                   Description&map...
                               </Typography>
                           </Grid>
                       </Grid>
                   </Grid>
               </Grid>

           <Grid container  spacing={2}>
               <Grid container item  spacing={2}>
                   {renderFoods()}
               </Grid>
               <Grid container item  spacing={2}>
                   {renderFoods()}
               </Grid>
           </Grid>
           </Paper>
       </Container>
   )
}



export {Foods};