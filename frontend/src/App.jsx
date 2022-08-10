/*
  *Root Component
  handles auth + routing

*/

// * Dependencies
/* packages */
import { useEffect, useState } from 'react';
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
import Report from './pages/Report/Report';
import Loading from './components/Loading/Loading';
/* redux related */ 
import { getUser } from './store/userSlice';

function App() {

  const {loginWithRedirect, logout, user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
  const dispatch = useDispatch();
  const [appReady,setAppReady] = useState(false);

  //* Checking if authenticated, saving user, session data. 
  useEffect(() => {
    
    const authGateway = async() => {
      if (!isLoading && !user) {
        loginWithRedirect();
      } else if (!isLoading && user) {
        console.log(user);
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("jwt", JSON.stringify({token: await getAccessTokenSilently()}));
        dispatch(getUser());
      }
    }

    authGateway();

  }, [isLoading]);

  const userData = useSelector(state => state.user);

  //* Monitoring changes to user
  useEffect(() =>{
    async function monitorChange() {
    if (isAuthenticated && sessionStorage.getItem("user")) {
      //console.log(`user is ${sessionStorage.getItem("user")}`)
      setAppReady(true);
    } else if (!isLoading && !isAuthenticated) {
      alert("Session Expired, Please login again.");
      window.location.reload();
    }
  }
  monitorChange();
}, [userData]);

  //* Routing with Header + Footer as constant
  return (
    <div className="App">
      {appReady?
      <div>
        <Routes>
          <Route path="/" element={<Home user={userData} logout={logout}/>} />
          <Route path="diary" element={<FoodDiary user={userData} logout={logout}/>} />
          <Route path="diary/add" element={<CustomFoodPage user={userData} logout={logout}/>} />
          <Route path="restaurant" element={<Restaurant user={userData} logout={logout} />} />
          <Route path="report" element={<Report user={userData} logout={logout} />}/>
        </Routes>
        <Footer/>
      </div> :
      <Loading/>
      }
    </div>

  );
}

export default App;
