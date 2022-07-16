import { Button, Grid} from '@mui/material';
import './Recommended.css';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Food } from '../Foods/Food';
import { getAllFoods } from '../../store/foodsSlice';
export default function Recommended() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllFoods())
    }, [dispatch]); 
    const foods = useSelector(state => state.foods.allFoods);
    const renderFoods = () => {
        let res = [];
        for (let i = 0; i < foods.length; i++) {
          res.push(
            <Grid item xs={3}> <Food food={foods[i]}></Food></Grid>
          );
        }
        return res;
    }
    console.log(foods)
    return (
        <section className="Recommended">
            <h2>Recommended for you</h2>

            <div className='items-inline'>
               <Grid container item spacing={2}>
                   {renderFoods()}
               </Grid>
            </div>
        </section>
    );
}