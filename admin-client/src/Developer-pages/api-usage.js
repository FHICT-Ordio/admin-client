import React, { useEffect } from "react";
import './development-styles.css'

import { useAuth0 } from "@auth0/auth0-react";
import NavigationFooter from "./Components/NavigationFooter";
import { Alert } from "react-bootstrap";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import 'react-tabs/style/react-tabs.css';
import { CopyBlock, vs2015 as theme } from "react-code-blocks";



const DeveloperApiComponent = (props) =>
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
                <h1>API usage</h1>                
            </center>
            <br /><br />
            <div className="default-offset">
                <p>
                    First off, the public Ordio API is accessible through the following url: 
                    <br /><br />
                    <h4 style={{ marginLeft: "25px"}}>https://robinvanhoof.tech:1000</h4>
                    <br />

                    This is the main host of the API gateway for the Ordio platform. All endpoints can be reached through this host, followed by the endpoint identifiers found in this guide and on the swagger portal.
                    <br /><br />
                    <center>
                        <Alert variant="warning" style={{width: '60%'}}>
                            <Alert.Heading>Important note</Alert.Heading>                        
                            Take note that the Ordio API and all Ordio products run on secured https protocol! This however does not mean your application needs to as well as the Ordio API also supports requests from http origins. 
                        </Alert>
                    </center>
                </p> <br /><br />

                
                <div>
                    <h3>Calling the API</h3>
                    <p>
                        In this guide we will mainly be focussing on the GET endpoints used to retreive user-made menus, categories and items. Some basic sample code snippets that can be used to make API calls or write your own API call methods can be found below.
                    </p>
                    <div>
                        <Tabs>
                            <TabList>
                                <Tab>JavaScript</Tab>
                                <Tab>C#</Tab>
                            </TabList>
                                
                            <TabPanel id="js">
                                <CopyBlock 
                                    text= {"export const Get = async () =>\n{\n    let res = await\n        fetch(\"https://robinvanhoof.tech:1000/\" + /* API Endpoint */, {\n            method: \"GET\",\n            headers: { \"Content-Type\": \"application/json\", \"Access-Control-Allow-Origin\": '*' }\n        });\n    return ((res.status === 200) ? res.json() : res);\n}"}
                                    language={"js"}
                                    showLineNumbers={true}
                                    theme={theme}
                                    codeBlock
                                />
                            </TabPanel>
                            <TabPanel id="csharp">
                                <CopyBlock 
                                    text={"using System.Net.Http.Headers;\n\npublic static HttpResponseMessage Get()\n{\n    using (var client = new HttpClient())\n    {\n        client.BaseAddress = new Uri(\"https://robinvanhoof.tech:1000\");\n        client.DefaultRequestHeaders.Accept.Clear();\n        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(\"application/json\"));\n        client.DefaultRequestHeaders.Add(\"Access-Control-Allow-Origin\", \"*\");\n\n        try {\n            return await client.GetAsync(/* API Endpoint */);\n        } catch (Exception ex)\n        {\n            Console.WriteLine(ex);\n            return null;\n        }\n    }\n}"}
                                    language={"cpp"}
                                    showLineNumbers={true}
                                    theme={theme}
                                    codeBlock
                                />
                            </TabPanel>
                        </Tabs>
                    </div>
                    <br />
                    <p>
                        A few things worth pointing out: Two headers (Content-Type and Access-Control-Allow-Origin) are specified for all requests. The Content-Type header is required for any type of requests that contain information in the body (POST, PUT, etc). The Access-Control-Allow-Origin header is required for all requests going to the Ordio API. If missing the API will always return an error.
                    </p>
                </div>
            </div>

            <NavigationFooter prevLink={"/development/getting-started"} prevText={"Getting started"} nextLink={"/development/accessing-menus"} nextText={"Accessing menus"} />
        </div>
    );
}

export default DeveloperApiComponent;