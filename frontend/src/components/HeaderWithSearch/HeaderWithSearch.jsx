import "./HeaderWithSearch.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/images/alpha-logo.svg";
import { InstantSearch, SearchBox, Hits, Stats, RefinementList, Menu } from 'react-instantsearch-dom';
import { searchClient } from "../../typesenseAdapter";
import {useState} from 'react';
import RestaurantCard from "../Restaurant/Restaurant";

const hit = ({hit}) => {
  return (
    <div className="hit">

      <RestaurantCard restaurant={hit}/>

    </div>
  )
}

const Content = () => {
  return (
    <div className="searchResults">
      <h2>Search Results</h2>
      <Stats></Stats>
      <section className="search-sidebar">
        <div className="searchFilters">
          <h3>Diet</h3>
          <RefinementList attribute="filters"></RefinementList>
        </div>
        <div className="searchFilters">
          <h3>Cuisine</h3>
          <RefinementList attribute="cuisine"></RefinementList>
        </div>
      </section>
      <Hits hitComponent={hit}></Hits>
    </div>
  )
}

export default function HeaderWithSearch(props) {

  const [showResults, setShowResults] = useState(false);
  document.querySelector('body').style.overflowY = 'visible';

  const displayManager = (state) => {
    if (state.query.length > 0) {
      document.querySelector('body').style.overflowY = 'hidden';
      setShowResults(true);
    } else {
      setShowResults(false);
      document.querySelector('body').style.overflowY = 'visible';
    }
  } 

  return (
    <section className="SearchHeader">
      <img src={logo} alt="Alpha Calorie Tracker Logo"></img>

      <InstantSearch indexName="restaurants" searchClient={searchClient} onSearchStateChange={searchState => displayManager(searchState)}>
        <SearchBox></SearchBox>
        {showResults? <Content/>:""}
      </InstantSearch>
    </section>
  );
}
