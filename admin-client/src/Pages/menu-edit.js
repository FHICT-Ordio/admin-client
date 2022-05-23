import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UpdateMenu, GetMenu } from "../api/menuApi";
import { useAuth0 } from '@auth0/auth0-react';
import { sha256 } from 'js-sha256'
import CategoryCard from "../Components/categoryCard";

import { Form, Button } from "react-bootstrap";
import { Alert, Container, Row } from "react-bootstrap";
import ItemCard from "../Components/itemCard";


const EditMenuComponent = (props) => {
    const [ menu, setMenu ] = React.useState();
    const [ newTitle, setNewTitle ] = React.useState();
    const [ newRestaurantName, setNewRestaurantName ] = React.useState();
    const [ newDescription, setNewDescription ] = React.useState();
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState();
    const [alertHeading, setAlertHeading] = useState();
    const [alertMessage, setAlertMessage] = useState();

    const { menuId } = useParams();
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    useEffect(async() => {
        if (menu === undefined)
        {
            GetMenu(menuId).then(res => { setMenu(res) });       
        }

        if (!isLoading && menu !== undefined)
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

    const onSubmit = async (event) => {
        event.preventDefault();

        if (newTitle !== undefined && newTitle.length === 0)
        {
            displayAlert("danger", "Oh no! Something went wrong!", "A menu title is required, the field can not be empty!")
            return;
        }

        if (newRestaurantName !== undefined && newRestaurantName.length === 0 )
        {
            displayAlert("danger", "Oh no! Something went wrong!", "A restaurant name is required, the field can not be empty!")
            return;
        }

        if (newTitle === undefined && newRestaurantName === undefined && newDescription === undefined)
        {
            displayAlert("warning", "Nothing to update", "Its seems like no changes were made and theres nothing for us to update")
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
        const status = await UpdateMenu(accessToken, menu.id, newTitle, newRestaurantName, newDescription);

        if(status === 200)
        {
            displayAlert("success", "Aaahww yeah!", "Your menu has been updated, you can make more changes or leave this page.")
        }
    }

    return (
        menu !== undefined && !isLoading &&
        <div>
            <div>
                <br />
                <center><h1>Edit <i>{menu.title}</i></h1></center>
            </div>
            <div>
                <Alert className="default-offset" variant={alertType} onClose={() => setShowAlert(false)} show={showAlert} dismissible>
                    <Alert.Heading>{alertHeading}</Alert.Heading>
                    <p>
                        {alertMessage}
                    </p>
                </Alert>
                <Form className="default-offset" onSubmit={onSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Menu name</Form.Label>
                        <Form.Control defaultValue={menu.title} onChange={(event) => { setNewTitle(event.target.value) }} />
                        <Form.Text className="text-muted">
                            * Required
                        </Form.Text>
                    </Form.Group>

                    <br />
                    <Form.Group controlId="restaurantName">
                        <Form.Label>Restaurannt name</Form.Label>
                        <Form.Control defaultValue={menu.restaurantName} onChange={(event) => { setNewRestaurantName(event.target.value) }}/>
                        <Form.Text className="text-muted">
                            * Required
                        </Form.Text>
                    </Form.Group>

                    <br />
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={menu.description} onChange={(event) => { setNewDescription(event.target.value) }}/>
                    </Form.Group>

                    <br />
                    <Form.Group>
                        <Button className="btn btn-primary btn-large centerButton" type="submit">Update menu</Button>
                    </Form.Group>
                </Form>
            </div>
            <br /><hr className="default-offset"/>
            <div>
                <center>
                    <h1>Categories</h1>
                    <Button variant="success" href={ window.location.href + "/categories/new" }>+ New Category</Button>
                    <br />
                    <br />
                </center>
                <div>
                    <Container>
                        <Row>
                        {
                            menu.categories.map(x => {     
                                return(                       
                                    <CategoryCard key={x.id} id={x.id} menuId={menu.id} name={x.name} description={x.description} items={x.items} /> 
                                )
                            })
                        }
                        </Row>
                    </Container>
                </div>
            </div>
            <br /><hr className="default-offset"/>
            <div>
                <center>
                    <h1>Items</h1>
                    <Button variant="success" href={ window.location.href + "/items/new" }>+ New Item</Button>
                    <br />
                    <br />
                </center>
                <div>
                    <Container>
                        <Row>
                        {  
                            menu.items.map(x => {                                   
                                return(                
                                    <ItemCard key={x.id} id={x.id} menuId={menu.id} name={x.name} description={x.description} price={x.price} tags={x.tags} categories={x.categories} /> 
                                )
                            })
                        }
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default EditMenuComponent;