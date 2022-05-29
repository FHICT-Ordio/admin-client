import React from 'react';
import { Routes, Route } from 'react-router'
import { useAuth0 } from "@auth0/auth0-react";

import './App.css';
import loading from './Media/Loading.gif'

import NavbarComponent from './Components/navbar'
import HomeComponent from './Pages/home'
import MenusComponent from './Pages/menus'
import EditMenuComponent from './Pages/menu-edit';
import NewMenuComponent from './Pages/menu-new';
import NewCategoryComponent from './Pages/category-new';
import EditCategoryComponent from './Pages/category-edit';
import NewItemComponent from './Pages/item-new';
import EditItemComponent from './Pages/item-edit';
import DeveloperHomeComponent from './Developer-pages/home';
import DeveloperGettingStartedComponent from './Developer-pages/getting-started';
import DeveloperApiComponent from './Developer-pages/api-usage';
import DeveloperAccessMenuComponent from './Developer-pages/access-menu';




function App()
{
    const { isLoading } = useAuth0();
    
    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                crossOrigin="anonymous" 
            />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" /> 

            <nav>
                <NavbarComponent />
            </nav>

            {
                !isLoading ?
                <Routes>
                    <Route path="*" element={<HomeComponent />} />
                    <Route path="menus" element={<MenusComponent />} />
                    <Route path="menus/new" element={<NewMenuComponent />} />
                    <Route path="menus/edit/:menuId" element={<EditMenuComponent />} />
                    <Route path="menus/edit/:menuId/categories/new" element={<NewCategoryComponent />} />
                    <Route path="menus/edit/:menuId/categories/:categoryId" element={<EditCategoryComponent />} />
                    <Route path="menus/edit/:menuId/items/new" element={<NewItemComponent />} />
                    <Route path="menus/edit/:menuId/items/:itemId" element={<EditItemComponent />} />
                    <Route path="development" element={<DeveloperHomeComponent />} />
                    <Route path="development/getting-started" element={<DeveloperGettingStartedComponent />} />
                    <Route path="development/api-usage" element={<DeveloperApiComponent />} />
                    <Route path="development/accessing-menus" element={<DeveloperAccessMenuComponent />} />
                </ Routes>
                :
                <center><img src={loading} className="loadgif" alt="loading"/></center>
            }
        </>
    );
}

export default App;
