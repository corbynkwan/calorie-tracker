import { Button, Grid} from '@mui/material';
import './Recommended.css';
import { useSelector, useDispatch, setState} from 'react-redux'
import { useEffect } from 'react'
import { Food } from '../Foods/Food';
import { getAllFoods } from '../../store/foodsSlice';

async function getRecommendation() {

}

export default function Recommended() {
    const dispatch = useDispatch();
    const [recommendation,setRecommendation] = useState([]);
    let recommended = sets
    useEffect(() => {
       console.log("recommend rendered");
       getRecommendation();
    }, []);
    const foods = useSelector(state => state.foods.allFoods);
    const renderFoods = () => {
        let res = [];
        for (let i = 0; i < foods.length; i++) {
            //      name: "Burger",
            //       calories: 750,
            //       filters: [],
            //       from: "Triple O's",
            //       thumbnail: "https://food.ubc.ca/wp-content/uploads/2020/01/Triple_B-1024x684.jpg"
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