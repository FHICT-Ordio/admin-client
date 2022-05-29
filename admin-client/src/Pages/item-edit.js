import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetMenu } from "../api/menuApi";
import { useAuth0 } from '@auth0/auth0-react';
import { sha256 } from 'js-sha256'

import { Form, Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { GetItem, UpdateItem } from "../api/itemApi";


const EditItemComponent = (props) => {
    const [ menu, setMenu ] = React.useState();
    const [ item, setItem ] = React.useState();

    const [ newName, setNewName ] = React.useState();
    const [ newDescription, setNewDescription ] = React.useState();
    const [ newPrice, setNewPrice ] = React.useState();
    const [ newTags, setNewTags ] = React.useState();
    const [ newCategories, setNewCategories ] = React.useState([]);

    const [ showAlert, setShowAlert ] = useState(false);
    const [ alertType, setAlertType ] = useState();
    const [ alertHeading, setAlertHeading ] = useState();
    const [ alertMessage, setAlertMessage ] = useState();

    const { menuId, itemId } = useParams();
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    useEffect(async () => {
        if (menu === undefined || item === undefined) 
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
                return;
            }

            if (menu === undefined)
            {
                GetMenu(accessToken, menuId).then(res => { setMenu(res) });       
            }

            if (item === undefined)
            {
                GetItem(accessToken, menuId, itemId).then(res => { setItem(res) });
            }
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

    const onCheckboxChange = async (event, id) => {
        const checked = event.target.checked;

        if(newCategories.length === 0)
        {
            item.categories.map(x => {
                newCategories.push(x.id);
            })
            item.categories = [];
        }

        if (checked)
        {
            newCategories.push(id)
        } else {
            const index = newCategories.findIndex(x => x == id);
            newCategories.splice(index, 1);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        if (newName !== undefined && newName.length === 0)
        {
            displayAlert("danger", "Shoot! Something went wrong!", "An item name is required, the field can not be empty!")
            return;
        }

        if (newPrice !== undefined && newPrice.length === 0)
        {
            displayAlert("danger", "Shoot! Something went wrong!", "A price is required, the field can not be empty!")
            return;
        }

        if (newName === undefined && newDescription === undefined && newPrice === undefined && newTags === undefined && (newCategories === item.categories || newCategories === []))
        {
            displayAlert("warning", "Whoopsie! Nothing to update", "Its seems like no changes were made and theres nothing for us to update")
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
        }

        const status = await UpdateItem(accessToken, menuId, itemId, newName, newDescription, newPrice, newTags ? newTags.split(' ') : undefined, newCategories);

        if(status === 200)
        {
            displayAlert("success", "Aaahww yeah!", "Your category has been updated, you can make more changes or leave this page.")
        }
    }

    return (
        menu !== undefined && item !== undefined && !isLoading &&
        <div>
            <div>
                <br />
                <center><h1>Edit <i>{item.name}</i></h1></center>
            </div>
            <div>
                <Alert className="default-offset" variant={alertType} onClose={() => setShowAlert(false)} show={showAlert} dismissible>
                    <Alert.Heading>{alertHeading}</Alert.Heading>
                    <p>
                        {alertMessage}
                    </p>
                </Alert>
                <Form className="default-offset" onSubmit={onSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Item name</Form.Label>
                        <Form.Control defaultValue={item.name} onChange={(event) => { setNewName(event.target.value) }} />
                        <Form.Text className="text-muted">
                            * Required
                        </Form.Text>
                    </Form.Group>

                    <br />
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={item.description} onChange={(event) => { setNewDescription(event.target.value) }}/>
                    </Form.Group>

                    <br />                    
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control defaultValue={item.price} pattern="[0-9.]*" onChange={(event) => { setNewPrice(event.target.value); }} />
                        <Form.Text className="text-muted">
                            * Required. Set to 0 if item is free. 
                            Use a dot not a comma for decimal specification
                        </Form.Text>
                    </Form.Group>

                    <br />
                    <Form.Group controlId="tags">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={item.tags.join().replace(",", " ")} onChange={(event) => { setNewTags(event.target.value); }} />
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
                                    <Form.Check type="checkbox" key={x.id} id={x.id} label={x.name} defaultChecked={item.categories.find(i => i.id == x.id) !== undefined} onChange={(event) => onCheckboxChange(event, x.id)} />
                                );
                            })
                        }
                        <Form.Text className="text-muted">
                            * At least one category is required
                        </Form.Text>                    
                    </Form.Group>

                    <br />
                    <Form.Group>
                        <Button className="btn btn-primary btn-large centerButton" type="submit">Update item</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}

export default EditItemComponent;