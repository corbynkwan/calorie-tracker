import "./Summary.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function Summary(props) {
  return (
    <section className="Summary">
      <div className="greeting">
        <h1>
          <small>Good afternoon,</small>{" "}
          {props.user.info.name != undefined ? props.user.info.name : ""}
        </h1>
      </div>

      <div className="time-remaining">
        <h3>Its Lunch time in 2 hours!</h3>
      </div>

      <div className="right-intake-status">
        <h3>Your Intake</h3>
        <p>800 Calories remaining</p>
        <div className="progress-bar-underlay"></div>
        <div className="progress-bar-overlay"></div>
        <Link to="/diary" style={{ textDecoration: "none" }}>
          <Button variant="outlined">Add More →</Button>
        </Link>
      </div>
    </section>
  );
}
