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
        console.log('getting recommendation');
        let jwt = JSON.parse(sessionStorage.getItem("jwt"));
        let d = new Date();
        const position = await getCoordinates();
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let tempToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNNTDFCa2JRQVpldWhaVS1YdnA2YyJ9.eyJpc3MiOiJodHRwczovL3RlYW1hbHBoYS1sb2NhbC51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTEzNDQwMDQ4OTg3MjA0ODExMzgiLCJhdWQiOlsiYXBpLnRyYWNrci50ZWFtYWxwaGEudWJjIiwiaHR0cHM6Ly90ZWFtYWxwaGEtbG9jYWwudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY1OTgzMzkwNSwiZXhwIjoxNjU5OTIwMzA1LCJhenAiOiJ1eDhDVmtZTFZ0N2sxOVloM2JUZjZ4UzdLTnJxemROQyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.mOzaPBHgjmGk89CmsGUkeZ4m-9de65dgKTg4gze19nQsJqCo0uY8Oa75QFUdy92K7vBWsh7SueOE7Ujs65vGNrIzCxgYP6K4d1mXTuhPcYXtgvBGyX6ANkI1zoy4OEko72beBIQ5howYuiBk75wepu2Ptgl1KH0BUGStD3-N_oeYIPlFJB_UGXUmlb42IXgD1FHO3zyx1TAxVFFCEvtzjgK5ALyYZb7iWIBMXeC4TRSGjv4A8VpiltbIOSRkGhrcLCjvIQcrwibLblisXmCFnJRIeNguO0DTDvGj9zdlnR1Q_ZgTSeog7FA1crmGmYJG9c4OIWNkYnDQ7XGCUq3TDg';
        console.log("hello");
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

        //console.log(resultJson)
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
        for(let i in result){
            // get restaurant name by id
            try{
                response = await fetch('https://calorie-tracker-prod-wfc97.ondigitalocean.app/api/eatery?id='+ resultJson.result[i].restaurantId, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${jwt.token}`
                    }
                })
            } catch(err) {
                console.log(err)
            }
            let restaurantJson = await response.json();
            result[i].from = restaurantJson.result.name;
        }
        setRecommendation(result);

    }
    catch (e) {
        console.log(e);
    }

}

export default function Recommended() {
    const dispatch = useDispatch();
    const [recommendation,setRecommendation] = useState([]);
    useEffect(() => {
       console.log("recommend rendered");
       getRecommendation(setRecommendation);
    }, []);
    const foods = recommendation;

    const renderFoods = () => {
        console.log("renderingFood!");
        let res = [];
        if(foods){
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