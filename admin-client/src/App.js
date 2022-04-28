import React from 'react';
import { Routes, Route } from 'react-router'

import './App.css';
import { useAuth0 } from "@auth0/auth0-react";

import NavbarComponent from './Partials/navbar'
import HomeComponent from './Partials/home'
import MenusComponent from './Partials/menus'
import Authorize from './Components/authorize';

import loading from './Media/Loading.gif'




function App()
{
    const { isLoading } = useAuth0();

    Authorize();
    

    if (isLoading) {
        return <center><img src={loading} class="loadgif" alt="loading"/></center>;
    }

    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                crossorigin="anonymous" 
            />
            <nav>
                <NavbarComponent />
            </nav>
            <Routes>
                <Route path="" element={<HomeComponent />} />
                <Route path="menus" element = { <MenusComponent />} />
            </ Routes>   
        </>
    );
}

export default App;
