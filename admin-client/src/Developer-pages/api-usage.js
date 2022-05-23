import React from "react";
import './development-styles.css'

import { useAuth0 } from "@auth0/auth0-react";
import NavigationFooter from "./Components/NavigationFooter";



const DeveloperApiComponent = (props) =>
{
    const { user, isAuthenticated } = useAuth0();

    return (
        <div id="development">
            <link />
            <br />
            <center>
                <h1>API usage</h1>                
            </center>
            <br /><br />
            <div className="default-offset">
                <p>
                    Ordio
                </p>
                <br />
                {
                    !isAuthenticated ?
                        <p>
                            
                        </p>
                    :
                        <div>
                            
                        </div>
                }
            </div>

            <NavigationFooter prevLink={"/development/getting-started"} prevText={"Getting started"} nextLink={"/development/accessing-menus"} nextText={"Accessing menus"} />
        </div>
    );
}

export default DeveloperApiComponent;