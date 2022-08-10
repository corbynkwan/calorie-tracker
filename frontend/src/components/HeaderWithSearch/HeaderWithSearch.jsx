import "./HeaderWithSearch.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import logo from "../../assets/images/alpha-logo.svg";
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';
import { searchClient } from "../../typesenseAdapter";

export default function HeaderWithSearch(props) {
  return (
    <section className="SearchHeader">
      <img src={logo} alt="Alpha Calorie Tracker Logo"></img>

      <InstantSearch searchClient={searchClient}>
        <SearchBox></SearchBox>
      </InstantSearch>
    </section>
  );
}
