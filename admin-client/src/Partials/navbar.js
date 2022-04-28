import React from "react";

import { Container, Navbar, Nav } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from '../Components/authLogin'
import LogoutButton from "../Components/authLogout";

import logo from '../Media/Logo.png';


function Navbar_(props)
{
    const { user, isAuthenticated } = useAuth0();

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/"><img src={logo} class="logo" alt=""/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    { isAuthenticated && (<Nav.Link href="/menus">Menus</Nav.Link>) }
                </Nav>                
                { isAuthenticated ?
                    <Nav>
                        { user.picture &&                        
                            <Nav.Item>                            
                                    <img class="profile-picture" src={ user.picture } alt=""/>                             
                            </Nav.Item>
                        }
                        <Nav.Item ><p class="welcome-text">Welcome {user.name}!</p></Nav.Item>
                        <Nav.Item class="align"><LogoutButton /></Nav.Item>
                    </ Nav>
                    :
                    <Nav>
                        <Nav.Item><LoginButton /></Nav.Item>
                    </Nav>
                }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

/*
<NavDropdown title="Dropdown" id="basic-nav-dropdown">
    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
    <NavDropdown.Divider />
    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
</NavDropdown>s
*/

export default Navbar_;