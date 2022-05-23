import React, { useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Row, Button } from 'react-bootstrap';
import { GetUserMenus } from "../api/menuApi";

import MenuEntry from "../Components/menuCard";

const MenusComponent = (props) =>
{
    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [ menus, setMenus ] = React.useState();

    useEffect(async () =>
    {
        if (menus === undefined)
        {
                let accessToken;
            try {
                const domain = "ordio.eu.auth0.com";
                accessToken = await getAccessTokenSilently({
                    audience: `https://${domain}/api/v2/`,
                    scope: "read:current_user",
                });
            } catch (e) {
                console.log(e.message);
            }
            GetUserMenus(accessToken).then(json => setMenus(json));
        }

        if (!isLoading && !isAuthenticated)
        {
            window.location.href = window.location.origin
        }
    });

    return (
        isAuthenticated && (
        <div>
            <br />
            <center>
                <h1>Menus</h1>
                <Button variant="success" href="/menus/new">+ New Menu</Button>
            </center>
            <br /><br />
            {
                menus !== undefined &&
                <div>                    
                    <Container>
                        <Row>
                        {
                            menus.map(x => {     
                                return(                       
                                    <MenuEntry key={x.id} id={x.id} title={x.title} description={x.description} restaurantName={x.restaurantName} lastEdited={x.lastEdited} categories={x.categories} items={x.items} /> 
                                )
                            })                        
                        }
                        </Row>
                    </Container>
                </div>
            }
        </div>
        )
    );
}

export default MenusComponent;