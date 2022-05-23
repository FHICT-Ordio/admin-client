import React, { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { Form, Alert, Button } from "react-bootstrap";
import { CreateCategory } from "../api/categoryApi";
import { useParams } from "react-router-dom";


const NewCategoryComponent = (props) => {
    const { menuId } = useParams();

    const [name, setName] = useState();
    const [description, setDescription] = useState();   

    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState();
    const [alertHeading, setAlertHeading] = useState();
    const [alertMessage, setAlertMessage] = useState();

    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if (!isLoading && !isAuthenticated)
        {
            window.location.href = window.location.origin
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

        if (name === undefined || name.length === 0)
        {
            displayAlert("danger", "Whoops, something went wrong!", "A category name needs to be provided!")
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
        const status = await CreateCategory(accessToken, menuId, name, description);
        if (status === 200)
        {
            window.location.href = window.location.origin + "/menus/edit/" + menuId;
            return;
        } else {
            displayAlert("danger", "Whats that? Something went wrong!", "An unexpected error occured, try again later");
        }
    }

    return (
        <div>
            <br />
            <center><h1>New category</h1></center>
            <br />
            <Alert className="default-offset" variant={alertType} onClose={() => setShowAlert(false)} show={showAlert} dismissible>
                <Alert.Heading>{alertHeading}</Alert.Heading>
                <p>
                    {alertMessage}
                </p>
            </Alert>
            <Form className="default-offset" onSubmit={onSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>Category name</Form.Label>
                    <Form.Control placeholder="Pizza" onChange={(event) => { setName(event.target.value) }} />
                    <Form.Text className="text-muted">
                        * Required
                    </Form.Text>
                </Form.Group>

                <br />
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="All kinds of pizzas, all freshly made" onChange={(event) => { setDescription(event.target.value) }}/>
                    <Form.Text className="text-muted">
                        * Required
                    </Form.Text>
                </Form.Group>

                <br />
                <Form.Group>
                    <Button className="btn btn-primary btn-large centerButton" type="submit">Create category</Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default NewCategoryComponent;