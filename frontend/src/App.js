import logo from './logo.svg';
import './App.css';
import RestaurantCard from "./Restaurant/Restaurant";
import {Button, ButtonBase, Container, Grid, Paper, styled, Typography} from "@material-ui/core";
import ItemSelectionComponent, {ItemCard} from "./Item/Item";



function App() {
  return (
    <div className="App">
      <header className="App-header">

          <Button variant="contained" size="large">
              Hello Wolrd
          </Button>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
        <RestaurantCard></RestaurantCard>
    </div>

  );
}

export default App;
