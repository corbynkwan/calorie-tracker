import { Button, Grid} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getRestaurants } from '../../store/restaurantsSlice';
import RestaurantCard from '../Restaurant/Restaurant';
export default function Restaurants() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRestaurants())
    }, [dispatch]);
    const restaurants = useSelector(state => state.restaurants);
    const renderRestaurants = () => {
        let res = [];
        for (let i = 0; i < restaurants.length; i++) {
          res.push(
            <Grid key={restaurants[i]._id} item xs={5} ><RestaurantCard restaurant={restaurants[i]}></RestaurantCard></Grid>
          );
        }
        return res;
    }
    return (
        <section className="Restaurants">
            <h2>Restaurants @ UBC</h2>
            <div className='items-inline'>
               <Grid container item spacing={2}>
                   {renderRestaurants()}
               </Grid>
            </div>
        </section>
    );
}