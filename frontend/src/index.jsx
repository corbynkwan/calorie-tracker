/*
  *Entrypoint - Frontend
  Calorie Tracker by Team Alpha.
*/

// * Dependencies

/* packages */
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Auth0Provider } from '@auth0/auth0-react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
/* styles */
import "./index.css";

/* components */
import App from "./App";

/* redux related */
import store from './store/store';

// * Root Component
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <BrowserRouter>
    <Provider store={store}>  
      <Auth0Provider domain={process.env.REACT_APP_AUTH_DOMAIN} clientId={process.env.REACT_APP_AUTH_CLIENTID} scope={process.env.REACT_APP_AUTH_SCOPE} audience={process.env.REACT_APP_AUTH_AUDIENCE} redirectUri={window.location.origin} >
        <App/>
      </Auth0Provider>
    </Provider>
  </BrowserRouter>
);
