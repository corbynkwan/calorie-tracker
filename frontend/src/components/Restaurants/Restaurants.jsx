import { Button, Grid} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getRestaurants } from '../../store/restaurantsSlice';
import RestaurantCard from '../Restaurant/Restaurant';
import GoogleMap from '../GoogleMap/GoogleMap';
import './Restaurants.css';

export default function Restaurants({user}) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRestaurants())
    }, [user]);
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
            <h2>Restaurants on campus</h2>
            <GoogleMap />
            <h3>Walkable {'(<1KM)'}</h3>
            <div className='items-inline'>
               <Grid container item spacing={2}>
                   {renderRestaurants()}
               </Grid>
            </div>
        </section>
    );
}