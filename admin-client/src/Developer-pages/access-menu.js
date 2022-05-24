import React from "react";
import './development-styles.css'

import { useAuth0 } from "@auth0/auth0-react";
import NavigationFooter from "./Components/NavigationFooter";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { CopyBlock, vs2015 as theme } from "react-code-blocks";


import Collapsible from 'react-collapsible'



const DeveloperAccessMenuComponent = (props) =>
{
    const { user, isAuthenticated } = useAuth0();

    const [ swaggerOpen, setSwaggerOpen ] = React.useState(true);

    return (
        <div id="development">
            <link />
            <br />
            <center>
                <h1>Accessing menus through API</h1>                
            </center>
            <br /><br />
            <div className="default-offset">
                <div>
                    <p>s
                        The first major API access point is the <span className="endpoint">"/Menu/&#123;menuId&#125;"</span> access point. This acces point can be used to retreive a user menu in its entirety, including the categories with their contained items, and items with the categories they belong to.
                        An ID for a menu to be retreived should be provided as URL parameter. The exact content of the JSON response can be found on the Swagger portal.
                    </p>
                </div>
                <br /> <br />
                
                <div>
                    <h3 class="collapsible-trigger" onClick={() => setSwaggerOpen(!swaggerOpen)}>Swagger</h3>                    
                    <Collapsible
                        open={swaggerOpen} 
                        onOpen={() => setSwaggerOpen(true)}
                        onClose={() => setSwaggerOpen(false)}
                        triggerClassName="collapsible-trigger"
                        >
                        <center>
                            <iframe src="https://fhict-ordio.github.io/general/#/Menu/get_Menu__menuID_" name="myiFrame" scrolling="yes" frameBorder="0" marginHeight="0px" marginWidth="0px" height="600px" width="100%" allowFullScreen />
                        </center>
                    </Collapsible>
                    {
                        !swaggerOpen &&
                    <span>...</span>
                    }
                </div>
                
                <br /><br />
                <div>
                    <h3>Code snippets</h3>
                    <br />
                    
                    <div>
                        <Tabs>
                            <TabList>
                                <Tab>JavaScript</Tab>
                                <Tab>C#</Tab>
                            </TabList>
                                
                            <TabPanel id="js">
                                <CopyBlock 
                                    text= {"export const GetMenu = async (id) =>\n{\n    let res = await\n        fetch(\"https://86.92.40.132:1000/Menu/\" + id, {\n            method: \"GET\",\n            headers: { \"Content-Type\": \"application/json\", \"Access-Control-Allow-Origin\": '*' }\n        });\n    return ((res === 200) ? res.json() : res);\n}"}
                                    language={"js"}
                                    showLineNumbers={true}
                                    theme={theme}
                                    codeBlock
                                />
                            </TabPanel>
                            <TabPanel id="csharp">
                                <CopyBlock 
                                    text={"using System.Net.Http.Headers;\n\npublic static HttpResponseMessage GetMenu(int id)\n{\n    using (var client = new HttpClient())\n    {\n        client.BaseAddress = new Uri(\"https://86.92.40.132:1000\");\n        client.DefaultRequestHeaders.Accept.Clear();\n        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(\"application/json\"));\n        client.DefaultRequestHeaders.Add(\"Access-Control-Allow-Origin\", \"*\");\n\n        try {\n            return await client.GetAsync(\"/Menu/\" + id);\n        } catch (Exception ex)\n        {\n            Console.WriteLine(ex);\n            return null;\n        }\n    }\n}"}
                                    language={"cpp"}
                                    showLineNumbers={true}
                                    theme={theme}
                                    codeBlock
                                />
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>

            <NavigationFooter prevLink={"/development/api-usage"} prevText={"API usage"} />
        </div>
    );
}

export default DeveloperAccessMenuComponent;