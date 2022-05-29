import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './index.css';
import App from './App';
import MenusComponent from './Pages/menus';
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
                    <Route path="*" element={<App />} >
                        <Route path="*/menus" element={<MenusComponent />} >
                            <Route path="*/menus/new" element={<NewMenuComponent />} />
                            <Route path="*/menus/edit/:menuId" element={<EditMenuComponent />} >
                                <Route path="*/menus/edit/:menuId/categories/new" element={<NewCategoryComponent />} />
                                <Route path="*/menus/edit/:menuId/categories/:categoryId" element={<EditCategoryComponent />} />
                                <Route path="*/menus/edit/:menuId/items/new" element={<NewItemComponent />} />
                                <Route path="*/menus/edit/:menuId/items/:itemId" element={<EditItemComponent />} />                                
                            </Route>                            
                        </Route>
                        <Route path="*/development" element={<DeveloperHomeComponent />}>
                            <Route path="*/development/getting-started" element={<DeveloperGettingStartedComponent />} />
                            <Route path="*/development/api-usage" element={<DeveloperApiComponent />} />
                            <Route path="*/development/accessing-menus" element={<DeveloperAccessMenuComponent />} />
                        </Route>
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
