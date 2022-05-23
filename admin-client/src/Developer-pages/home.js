import React from "react";
import './development-styles.css'

import { useAuth0 } from "@auth0/auth0-react";
import NavigationFooter from "./Components/NavigationFooter";



const DeveloperHomeComponent = (props) =>
{
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();

    return (
        <div>
            <link />
            <br />
            <center>
                <h1>Developer center</h1>                
            </center>
            <br /><br />
            <div className="default-offset">
                <p style={{fontSize: 16}}>
                    Welcome to the Ordio development page! This place documents the usage of the Ordio platform for developers to extend upon existing technologies or make your own altogether!
                </p>
                <br />
                {
                    !isAuthenticated ?
                        <p>
                            To get started, log into your Ordio account or make one by clicking <a className="link" onClick={() => loginWithRedirect()}>here</a>!
                        </p>
                    :
                        <div>
                            <p>
                                The Ordio platform, henceforth referred to as "Ordio", works on two technologies: Auth0 for authorizing users, and a custom API for creating and interacting with user made restaurant menus.
                                This Admin tools functions as the main tool for users to alter the content of their menus. However, Ordio provides multiple open accesspoints that can be used to fetch and interact with these user-made menus.
                            </p>
                        </div>
                }
            </div>

            <NavigationFooter nextLink={"/development/getting-started"} nextText="Getting started with Ordio API" />
        </div>
    );
}

export default DeveloperHomeComponent;