import { Button, Grid} from '@mui/material';
import ItemSelectionComponent, { ItemCard } from '../Item/Item';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getRestaurants } from './restaurantsSlice';
import RestaurantCard from '../Restaurant/Restaurant';
export default function Restaurants() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRestaurants())
    }, [dispatch]); 
    const user = useSelector(state => state.restaurants);
    return (
        <section className="Restaurants">
            <h2>Restaurants @ UBC</h2>

            <div className='items-inline'>
               <Grid container item spacing={2}>
                   <Grid item xs={5} > <RestaurantCard></RestaurantCard></Grid>
                   <Grid item xs={5} > <RestaurantCard></RestaurantCard></Grid>
                   <Grid item xs={5} > <RestaurantCard></RestaurantCard></Grid>
                   <Grid item xs={5} > <RestaurantCard></RestaurantCard></Grid>
                   <Grid item xs={5} > <RestaurantCard></RestaurantCard></Grid>
                   <Grid item xs={5} > <RestaurantCard></RestaurantCard></Grid>
               </Grid>
            </div>
        </section>
    );
}