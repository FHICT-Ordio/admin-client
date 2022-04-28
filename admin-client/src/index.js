import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import { CookiesProvider } from "react-cookie";

import App from './App';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MenusComponent from './Partials/menus';

ReactDOM.render(
    <Auth0Provider
    domain="ordio.eu.auth0.com"
    clientId="sb9tD99oZDPCo8LfSJhvLho67FQIM5yz"
    redirectUri={window.location.origin}
    audience="https://ordio.eu.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata"
    >
    <CookiesProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route path="/menus" element= { <MenusComponent />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </CookiesProvider>
    </Auth0Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
