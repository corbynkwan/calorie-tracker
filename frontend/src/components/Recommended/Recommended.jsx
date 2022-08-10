import { Button, Grid} from '@mui/material';
import './Recommended.css';
import { useSelector, useDispatch} from 'react-redux'
import {useState} from 'react'
import { useEffect } from 'react'
import { Food } from '../Foods/Food';
import { getAllFoods } from '../../store/foodsSlice';

function getCoordinates() {
    return new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

async function getRecommendation(setRecommendation) {
    try{
        let jwt = JSON.parse(sessionStorage.getItem("jwt"));
        let d = new Date();
        const position = await getCoordinates();
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let response;
        try{
            response = await fetch(`https://calorie-tracker-prod-wfc97.ondigitalocean.app/api/Recommendation/${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${(d.getDate()).toString().padStart(2,'0')}?lat=${lat}&lon=${lng}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${jwt.token}`
                }
            })
        } catch(err) {
            console.log(err)
        }
        let resultJson = await response.json();
        let result = resultJson.result.map(function (e){
            return {name:e.name,
                calories:e.calories,
                protein:e.protein,
                carbs:e.carbs,
                fat:e.fat,
                filters:e.filters,
                from:'temp',
                thumbnail:e.thumbnail}
        });
        let ids = [];
        for(let i in result){
            // get restaurant name by id
                ids.push(resultJson.result[i].restaurantId);
        }

        response = await fetch('https://calorie-tracker-prod-wfc97.ondigitalocean.app/api/getEateryName?ids=[' + ids + ']', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${jwt.token}`
            }
        })
        let restaurantJson = await response.json();

        for(let i in result){
            result[i].from = resultJson.result[i].name;
        }



        setRecommendation(result);

    }
    catch (e) {
        console.log(e);
    }

}

export default function Recommended({user}) {

    const renderFoods = () => {
        const dispatch = useDispatch();
        const [recommendation,setRecommendation] = useState([]);
        useEffect(() => {
            if (user != null && user != undefined) {
                console.log("recommend rendered");
                getRecommendation(setRecommendation);
            }
        }, []);
        const foods = recommendation;
        console.log("renderingFood!");
        console.log(foods);
        let res = [];
        if(foods){
            for (let i = 0; i < foods.length && i < 4; i++) {
                //      name: "Burger",
                //       calories: 750,
                //       filters: [],
                //       from: "Triple O's",
                //       thumbnail: "https://food.ubc.ca/wp-content/uploads/2020/01/Triple_B-1024x684.jpg"
                res.push(
                    <Grid item xs={3}> <Food food={foods[i]}></Food></Grid>
                );
            }
        }
        return res;
    }

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