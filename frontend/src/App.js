import logo from './logo.svg';
import './App.css';
import RestaurantCard from "./Restaurant/Restaurant";
import {Button, ButtonBase, Container, Grid, Paper, styled, Typography} from "@material-ui/core";
import ItemSelectionComponent, {ItemCard} from "./Item/Item";
import Header from './Header';



function App() {
  return (
    <div className="App">
      <Header/>
    </div>

  );
}

export default App;
