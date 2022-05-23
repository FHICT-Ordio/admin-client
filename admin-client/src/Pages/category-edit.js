import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UpdateMenu, GetMenu } from "../api/menuApi";
import { useAuth0 } from '@auth0/auth0-react';
import { sha256 } from 'js-sha256'

import { Form, Button, Container, Row } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { GetCategory, UpdateCategory } from "../api/categoryApi";
import ItemCard from "../Components/itemCard";


const EditCategoryComponent = (props) => {
    const [ menu, setMenu ] = React.useState();
    const [ category, setCategory ] = React.useState();

    const [ newName, setNewName ] = React.useState();
    const [ newDescription, setNewDescription ] = React.useState();
    const [ showAlert, setShowAlert ] = useState(false);
    const [ alertType, setAlertType ] = useState();
    const [ alertHeading, setAlertHeading ] = useState();
    const [ alertMessage, setAlertMessage ] = useState();

    const { menuId, categoryId } = useParams();
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    useEffect(async() => {
        if (menu === undefined)
        {
            GetMenu(menuId).then(res => { setMenu(res) });       
        }

        if (category === undefined)
        {
            GetCategory(menuId, categoryId).then(res => { setCategory(res) });
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

    const onSubmit = async (event) => {
        event.preventDefault();

        if (newName !== undefined && newName.length === 0)
        {
            displayAlert("danger", "Shoot! Something went wrong!", "A category name is required, the field can not be empty!")
            return;
        }

        if (newName === undefined && newDescription === undefined)
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
        const status = await UpdateCategory(accessToken, menuId, categoryId, newName, newDescription);

        if(status === 200)
        {
            displayAlert("success", "Aaahww yeah!", "Your category has been updated, you can make more changes or leave this page.")
        }
    }

    return (
        menu !== undefined && category !== undefined && !isLoading &&
        <div>
            <div>
                <br />
                <center><h1>Edit <i>{category.name}</i></h1></center>
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
                        <Form.Label>Category name</Form.Label>
                        <Form.Control defaultValue={category.name} onChange={(event) => { setNewName(event.target.value) }} />
                        <Form.Text className="text-muted">
                            * Required
                        </Form.Text>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={category.description} onChange={(event) => { setNewDescription(event.target.value) }}/>
                    </Form.Group>
                    <br />                    
                    <Form.Group>
                        <Button className="btn btn-primary btn-large centerButton" type="submit">Update category</Button>
                    </Form.Group>
                </Form>
            </div>
            <br /><hr className="default-offset"/>
            <div>
                <center>
                    <h1>Category items</h1>
                    <p className="text-muted">
                        Add or remove items to this category through the item editor page
                    </p>
                    <br />
                    <br />
                </center>
                <div>
                    <Container>
                        <Row>
                        {  
                            category.items.map(x => {                                   
                                return(                
                                    <ItemCard key={x.id} id={x.id} menuId={menu.id} name={x.name} description={x.description} price={x.price} tags={x.tags} categories={x.categories} ignoreCategories={true} ignoreWarnings={true} /> 
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

export default EditCategoryComponent;