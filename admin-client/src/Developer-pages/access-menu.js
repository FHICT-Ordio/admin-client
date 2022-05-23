import React from "react";
import './development-styles.css'

import { useAuth0 } from "@auth0/auth0-react";
import NavigationFooter from "./Components/NavigationFooter";



const DeveloperAccessMenuComponent = (props) =>
{
    const { user, isAuthenticated } = useAuth0();

    return (
        <div id="development">
            <link />
            <br />
            <center>
                <h1>Accessing menus through API</h1>                
            </center>
            <br /><br />
            <div className="default-offset">
                <p>
                    
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

            <NavigationFooter prevLink={"/development/api-usage"} prevText={"API usage"} />
        </div>
    );
}

export default DeveloperAccessMenuComponent;