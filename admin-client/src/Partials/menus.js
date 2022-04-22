import React, { useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import GetMenus from "../api/menuApi";
import { useCookies } from 'react-cookie';
import App from "../App";

const Menus_ = (props) =>
{
    const { isAuthenticated } = useAuth0();
    const [result, setResult] = React.useState();
    const [ userCookie ] = useCookies(['user']);

    useEffect(() =>
    {
        if (result === undefined)
        {
            fetch('http://localhost:1001/Menu/GetAll', {
                method: "GET",
                headers: {"Authorization": `Bearer ${userCookie.token}`}
            }).then(res => res.json()).then(json => setResult(json));
        }
    });

    return (
        isAuthenticated && (
        <div>
            <center><h1>Menus</h1></center>
            { JSON.stringify(result) }
        </div>
        )
    );
}

export default Menus_;