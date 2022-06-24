import { Button, Grid} from '@mui/material';
import ItemSelectionComponent, { ItemCard } from '../Item/Item';
import RestaurantCard from '../Restaurant/Restaurant';
import './BrowseRestros.css';

export default function BrowseRestros() {

    return (
        <section className="BrowseRestros">
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