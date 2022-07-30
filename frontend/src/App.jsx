/*
  *Root Component
  handles auth + routing

*/

// * Dependencies
/* packages */
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from 'react-redux';

/* styling */
import './App.css';

/* components & pages*/
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import FoodDiary from './pages/FoodDiary/FoodDiary';

import CustomFoodPage from './pages/CustomFood/CustomFoodPage';
import Restaurant from './/pages/Restaurant/Restaurant';
/* redux related */ 
import { getUser } from './store/userSlice';

function App() {

  const {loginWithRedirect, logout, user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
  const dispatch = useDispatch();

  //* Checking if authenticated, saving user, session data. 
  useEffect(() => {
    
    const authGateway = async() => {
      if (!isLoading && !user) {
        loginWithRedirect();
      } else if (!isLoading && user) {
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("jwt", JSON.stringify({token: await getAccessTokenSilently()}));
        dispatch(getUser());
      }
    }

    authGateway();

  }, [isLoading]);

  //* Monitoring changes to user
  useEffect(async() => {

    if (isAuthenticated) {
      dispatch(getUser());
    } else if (!isLoading && !isAuthenticated) {
      alert("Session Expired, Please login again.");
      window.location.reload();
    }
  }, [dispatch]);

  const userData = useSelector(state => state.user);

  //* Routing with Header + Footer as constant
  return (
    <div className="App">
      <Header user={userData} logout={logout}/>
        <Routes>
          <Route path="/" element={<Home user={userData}/>} />
          <Route path="diary" element={<FoodDiary user={userData}/>} />
          <Route path="diary/add" element={<CustomFoodPage />} />
          <Route path="restaurant" element={<Restaurant />} />
        </Routes>
      <Footer/>
    </div>

  );
}

export default App;
