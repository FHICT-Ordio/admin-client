import React from 'react';
import { Routes, Route } from 'react-router'

import './App.css';
import { useAuth0 } from "@auth0/auth0-react";

import NavbarComponent from './Components/navbar'
import HomeComponent from './Pages/home'
import MenusComponent from './Pages/menus'

import loading from './Media/Loading.gif'
import EditMenuComponent from './Pages/menu-edit';
import NewMenuComponent from './Pages/menu-new';
import NewCategoryComponent from './Pages/category-new';
import EditCategoryComponent from './Pages/category-edit';
import NewItemComponent from './Pages/item-new';
import EditItemComponent from './Pages/item-edit';




function App()
{
    const { isLoading } = useAuth0();
    

    

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

            {
                !isLoading ?
                <Routes>
                    <Route path="" element={<HomeComponent />} />
                    <Route path="menus" element={<MenusComponent />} />
                    <Route path="menus/new" element={<NewMenuComponent />} />
                    <Route path="menus/edit/:menuId" element={<EditMenuComponent />} />
                    <Route path="menus/edit/:menuId/categories/new" element={<NewCategoryComponent />} />
                    <Route path="menus/edit/:menuId/categories/:categoryId" element={<EditCategoryComponent />} />
                    <Route path="menus/edit/:menuId/items/new" element={<NewItemComponent />} />
                    <Route path="menus/edit/:menuId/items/:itemId" element={<EditItemComponent />} />
                </ Routes>
                :
                <center><img src={loading} class="loadgif" alt="loading"/></center>
            }
        </>
    );
}

export default App;
