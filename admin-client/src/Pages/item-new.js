import React, { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { Form, Alert, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { sha256 } from 'js-sha256'
import { GetMenu } from "../api/menuApi";
import { CreateItem } from "../api/itemApi";


const NewItemComponent = (props) => {
    const [ menu, setMenu ] = useState();
    const { menuId } = useParams();

    const [ name, setName ] = useState();
    const [ description, setDescription ] = useState();
    const [ price, setPrice ] = useState();
    const [ tags, setTags ] = useState();
    const [ categories, setCategories ] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState();
    const [alertHeading, setAlertHeading] = useState();
    const [alertMessage, setAlertMessage] = useState();

    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if (!isLoading && !isAuthenticated)
        {
            window.location.href = window.location.origin
        }

        if (menu === undefined)
        {
            GetMenu(menuId).then(res => { setMenu(res) });       
        }

        if (!isLoading && (menu !== undefined)) 
        {
            if (!isAuthenticated || sha256(user.sub) !== menu.owner)
            {
                window.location.href = window.location.origin
            }
        }
    });

    const displayAlert = (type, heading, message) => {
        setAlertType(type)
        setAlertHeading(heading)
        setAlertMessage(message)
        setShowAlert(true)
    }

    const onCheckboxChange = (event, id) => {
        const checked = event.target.checked;

        if (checked)
        {
            categories.push(id)
        } else {
            const index = categories.findIndex(x => x == id);
            categories.splice(index, 1);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        if (name === undefined || name.length === 0)
        {
            displayAlert("danger", "Whoops, something went wrong!", "An item name needs to be provided!")
            return;
        }

        if (price === undefined || isNaN(+price) || price < 0)
        {
            displayAlert("danger", "Whoops, something went wrong!", "A valid price needs to be provided!")
            return;
        }

        if (categories === undefined || categories.length === 0)
        {
            displayAlert("danger", "Whoops, something went wrong!", "At least one category needs to be selected")
            return;
        }


        let accessToken;
        try {
            const domain = "ordio.eu.auth0.com";
            accessToken = await getAccessTokenSilently({
                audience: `https://${domain}/api/v2/`,
                scope: "read:current_user",
            });
        } catch (e) {
            console.log(e.message);
            return;
        }
        
        const status = await CreateItem(accessToken, menuId, name, description, price, tags ? tags.split(' ') : undefined, categories);
        if (status === 200)
        {
            window.location.href = window.location.origin + "/menus/edit/" + menuId;
            return;
        } else {
            displayAlert("danger", "Whats that? Something went wrong!", "An unexpected error occured, try again later");            
        }
    }

    return (
        menu !== undefined &&
        <div>
            <br />
            <center><h1>New item</h1></center>
            <br />
            <Alert className="default-offset" variant={alertType} onClose={() => setShowAlert(false)} show={showAlert} dismissible>
                <Alert.Heading>{alertHeading}</Alert.Heading>
                <p>
                    {alertMessage}
                </p>
            </Alert>
            <Form className="default-offset" onSubmit={onSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Item name</Form.Label>
                    <Form.Control placeholder="Pizza Margherita" onChange={(event) => { setName(event.target.value) }} />
                    <Form.Text className="text-muted">
                        * Required
                    </Form.Text>
                </Form.Group>
                
                <br />
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Freshly baked margarita pizza. Tomato, cheese, basil" onChange={(event) => { setDescription(event.target.value) }}/>
                </Form.Group>

                <br />
                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control placeholder="9.99" pattern="[0-9.]*" onChange={(event) => { setPrice(event.target.value); }} />
                    <Form.Text className="text-muted">
                        * Required. Set to 0 if item is free. 
                        Use a dot not a comma for decimal specification
                    </Form.Text>
                </Form.Group>

                <br />
                <Form.Group controlId="tags">
                    <Form.Label>Tags</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Pizza, Hot buy, Dinner, Pizza of the day" onChange={(event) => { setTags(event.target.value); }}/>
                    <Form.Text className="text-muted">
                        Seperate multiple tags with spaces (' ')
                    </Form.Text>
                </Form.Group>

                <br />
                <Form.Group controlId="categories">
                    <Form.Label>Categories</Form.Label>
                    {
                        menu.categories.map(x => {
                            return (
                                <Form.Check type="checkbox" key={x.id} id={x.id} label={x.name} onChange={(event) => onCheckboxChange(event, x.id)} />
                            );
                        })
                    }
                    <Form.Text className="text-muted">
                        * At least one category is required
                    </Form.Text>                    
                </Form.Group>

                <br />
                <Form.Group>
                    <Button className="btn btn-primary btn-large centerButton" type="submit">Create Item</Button>
                </Form.Group>
            </Form>
            <br />
        </div>
    );
}

export default NewItemComponent;