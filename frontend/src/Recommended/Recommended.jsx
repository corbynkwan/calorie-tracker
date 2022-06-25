import { Button, Grid} from '@mui/material';
import ItemSelectionComponent, { Food } from '../Foods/Food';
import './Recommended.css';

export default function Recommended() {

    return (
        <section className="Recommended">
            <h2>Recommended for you</h2>

            <div className='items-inline'>
               <Grid container item spacing={2}>
                   <Grid item xs={3} > <Food></Food></Grid>
                   <Grid item xs={3} > <Food></Food></Grid>
                   <Grid item xs={3} > <Food></Food></Grid>
                   <Grid item xs={3} > <Food></Food></Grid>
               </Grid>
            </div>
        </section>
    );
}