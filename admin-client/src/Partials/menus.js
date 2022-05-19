import React, { useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { useCookies } from 'react-cookie';
import { Container, Row, Button } from 'react-bootstrap';
import { GetUserMenus } from "../api/menuApi";

import MenuEntry from "../Components/menuEntry";
import { Navigate } from "react-router-dom";

const MenusComponent = (props) =>
{
    const { isAuthenticated, isLoading } = useAuth0();
    const [ menus, setMenus ] = React.useState();
    const [ userCookie ] = useCookies(['user']);

    useEffect(() =>
    {
        if (menus === undefined)
        {            
            GetUserMenus(userCookie.token).then(json => setMenus(json));
        }

        if (!isLoading && !isAuthenticated)
        {
            
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