import "./HeaderWithSearch.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/alpha-logo.svg";
import { InstantSearch, SearchBox, Hits, Stats, RefinementList } from 'react-instantsearch-dom';
import { searchClient } from "../../typesenseAdapter";
import {useState} from 'react';
import RestaurantCard from "../Restaurant/Restaurant";
import logoWhite from "../../assets/images/alpha-logo-white.svg";

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

export default function HeaderWithSearch({user, logout, inner}) {

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
    <>
      {inner?
        <section className="SearchHeader Header-Inner">
          <a href="/"><img src={logoWhite} alt="Alpha Calorie Tracker Logo"></img></a>

          <div className="middle-menu"> 
            <Link to="/diary" style={{ textDecoration: "none" }}>
              <span>Food Log</span>
            </Link>
            <Link to="/Report" style={{ textDecoration: "none" }}>
              <span>My Report</span>
            </Link>
          </div>

          <div className="right-panel" onClick={logout}>
            <p>Logout</p>
          </div>

        </section>
      :
        <section className="SearchHeader">
          <img src={logo} alt="Alpha Calorie Tracker Logo"></img>

          <InstantSearch indexName="restaurants" searchClient={searchClient} onSearchStateChange={searchState => displayManager(searchState)}>
            <SearchBox translations={{placeholder: 'Search Restuarants by name, address or cuisine'}}></SearchBox>
            {showResults? <Content/>:""}
          </InstantSearch>

          <div className="right-panel" onClick={logout}>
            <p>Logout</p>
          </div>
        </section>
      }
    </>
  );
}
