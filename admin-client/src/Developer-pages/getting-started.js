import React, { useEffect } from "react";
import './development-styles.css'

import { useAuth0 } from "@auth0/auth0-react";
import NavigationFooter from "./Components/NavigationFooter";



const DeveloperGettingStartedComponent = (props) =>
{
    const { isLoading, isAuthenticated } = useAuth0();

    useEffect(() => {
        if (!isLoading && !isAuthenticated)
        {
            window.location.href = window.location.origin
        }
    })

    return (
        <div id="development">
            <link />
            <br />
            <center>
                <h1>Getting started</h1>                
            </center>
            <br /><br />
            <div className="default-offset">
                <p>
                    This page will give you a guide on how to implement the Ordio API into your own project. Code snippets will available for JavaScript and C# applications. Other applications implement the codes in similar ways.
                </p> <br />
                <p>
                    First of all, to make the proces of implementing Ordios API calls easier, a public swagger portal exists containig a quick and easy documentation on all existing endpoints. This portal can be found <a href="https://fhict-ordio.github.io/general/" target="_blank">here</a>.
                    Some of the endpoints here have an [A] tag next to them. These endpoints require user authorization through Auth0-tokens, and will not be discussed in this guide as these tokens can currently not be aquired outside of in-house developed applications.
                </p> <br />
                <p>
                    To implement the API the only requirement is a project (we will use JavaScript and C# projects in our examples) with some form of online fetching methods.
                </p>
            </div>

            <NavigationFooter prevLink={"/development"} prevText={"Home"} nextLink={"/development/api-usage"} nextText={"API usage"} />
        </div>
    );
}

export default DeveloperGettingStartedComponent;