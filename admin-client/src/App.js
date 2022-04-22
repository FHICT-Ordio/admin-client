import React, { Component } from 'react';
import { Routes, Route } from 'react-router'
import { useCookies } from 'react-cookie'

import './App.css';
import { useAuth0 } from "@auth0/auth0-react";

import Navbar_ from './Partials/navbar'
import Home_ from './Partials/home'
import Menus_ from './Partials/menus'
import Authorize from './Components/authorize';

import loading from './Media/Loading.gif'


function App()
{
    const { isLoading } = useAuth0();
    const [ userCookies ] = useCookies(['user']);


    Authorize();
    


    if (isLoading) {
        return <center><img src={loading} class="loadgif"/></center>;
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
                <Navbar_ />
            </nav>
            <Routes>
                <Route path="" element={<Home_ />} />
                <Route path="menus" element = { <Menus_ />} />
            </ Routes>   
        </>
    );
}

export default App;
