import "./HeaderWithSearch.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import logo from "../../assets/images/alpha-logo.svg";

export default function HeaderWithSearch(props) {
  return (
    <section className="SearchHeader">
     <img src={logo} alt="Alpha Calorie Tracker Logo"></img>
    </section>
  );
}
