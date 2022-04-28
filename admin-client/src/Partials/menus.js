import React, { useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { useCookies } from 'react-cookie';

import GetUserMenus from "../api/menuApi";

const MenusComponent = (props) =>
{
    const { isAuthenticated } = useAuth0();
    const [ menus, setMenus ] = React.useState();
    const [ userCookie ] = useCookies(['user']);

    useEffect(() =>
    {
        if (menus === undefined)
        {
            GetUserMenus('http://localhost:1001/Menu/GetAll', userCookie.token).then(json => setMenus(json));
        }
    });

    return (
        isAuthenticated && (
        <div>
            <center><h1>Menus</h1></center>
            { JSON.stringify(menus) }
        </div>
        )
    );
}

export default MenusComponent;