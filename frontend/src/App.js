import logo from './logo.svg';
import './App.css';
import RestaurantCard from "./Restaurant/Restaurant";
import {Button, ButtonBase, Container, Grid, Paper, styled, Typography} from "@material-ui/core";
import ItemSelectionComponent, {ItemCard} from "./Foods/Foods";
import Header from './Header';
import Summary from './Summary/Summary';
import Recommended from './Recommended/Recommended';
import Restaurants from './Restaurants/Restaurants';
import Footer from './Footer';
import CustomFood from './CustomFood/CustomFood';
import InputForm from './InputForm';


function App() {

  const closePopUp = () => {
    document.querySelector('.add-intake-popout').style.display = 'none';
    document.querySelector('.food-diary-popout').style.display = 'none';
    document.querySelector('.item-selection-popout').style.display = 'none';
    document.querySelector('.popout-wrapper').style.display = 'none';
    document.querySelector('body').style.overflowY = 'unset';
  }

  return (
    <div className="App">
      <Header/>
      <Summary/>
      <Recommended/>
      <Restaurants/>
      <Footer/>
    

      <section className='popout-wrapper'>
        <div className='btn-close'><Button variant="outlined" onClick={closePopUp}>Close</Button></div>
        <div className='add-intake-popout'>
          <CustomFood/>
        </div>
        <div className='food-diary-popout'>
          <InputForm/>
        </div>
        <div className='item-selection-popout'>
          <ItemSelectionComponent/>
        </div>
      </section>
    </div>

  );
}

export default App;
