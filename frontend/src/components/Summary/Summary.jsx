import "./Summary.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState} from 'react'

export default function Summary(props) {

  let [caloriesRemaining, setCaloriesRemaining] = useState(1500);
  let [greeting, setGreeting] = useState("");
  let [message, setMessage] = useState("");

  useEffect(() => {

    let today = new Date()
    let currentHour = today.getHours()

    if (currentHour < 12) {
      setGreeting('morning');
      setMessage(`So, what's for breakfast today?`);
    } else if (currentHour < 16) {
      setGreeting('afternoon');
      setMessage(`Have a filling lunch :)`);
    } else if (currentHour < 18) {
      setGreeting('evening');
      setMessage(`Craving for a snack? We've got you covered.`);
    }else {
      setGreeting('evening');
      setMessage(`It's time for dinner, chatter & laughter!`);
    }

    if (props.user != null && props.user != undefined) {
      let target = 1500
      for (let entry of props.user.log) {
        if(entry.calories != null) {
          target -= entry.calories;
          let maxWidth = document.querySelector('.progress-bar-underlay').clientWidth;
          let targetWidth = (1 - (target)/1500) * maxWidth;
          document.querySelector('.progress-bar-overlay').style.width = `${targetWidth}px`;
        }
      }
      setCaloriesRemaining(target);

    }

}, []);

  return (
    <section className="Summary">
      <div className="greeting">
        <h1>
          <small>Good {greeting},<br/></small>{" "}
          {props.user.info.name != undefined ? props.user.info.name : ""}
        </h1>
      </div>

      <div className="time-remaining">
        <h3>{message}</h3>
      </div>

      <div className="right-intake-status">
        <h3>Your Intake</h3>
        <p>{caloriesRemaining} Calories remaining</p>
        <div className="progress-bar-underlay"></div>
        <div className="progress-bar-overlay"></div>
        <Link to="/diary" style={{ textDecoration: "none" }}>
          <Button variant="outlined">Log →</Button>
        </Link>
        <Link to="/report" style={{ textDecoration: "none" }}>
          <Button variant="outlined">Visualise →</Button>
        </Link>
      </div>
    </section>
  );
}
