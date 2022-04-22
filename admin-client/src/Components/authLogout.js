import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Button } from 'react-bootstrap'
import { useCookies } from 'react-cookie'

const LogoutButton = () => {
    const { logout } = useAuth0();
    const [ userCookie, removeCookie ] = useCookies(['user']);

    return (
        <Button class="login-button" onClick={() => { logout({ returnTo: window.location.origin }); removeCookie('token'); }} >
            Log Out
        </Button>
    );
};

export default LogoutButton;