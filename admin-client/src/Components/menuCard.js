import React from "react";
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { ArchiveMenu } from '../api/menuApi'

import PropTypes from 'prop-types';
import { useAuth0 } from "@auth0/auth0-react";



const MenuCard = ({ id, title, description, restaurantName, lastEdited, categories, items }) => {

    const [ isLoading, setLoading ] = React.useState(false);
    const { getAccessTokenSilently } = useAuth0();
    
    const onArchiveClick = async () => {
        setLoading(true);

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

        await ArchiveMenu(accessToken, id)
        setLoading(false);
        
        window.location.reload();
    }

    return (
        <Card className="card" style={{ width: '18rem' }} onDoubleClick={() => {window.location.href = window.location.origin + "/menus/edit/" + id;}}>
            <Card.Body>
                <Card.Title style={{ textOverflow: 'ellipsis' }} >{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted" style={{ textOverflow: 'ellipsis' }} >{restaurantName}</Card.Subtitle>
                <Card.Text className="card-text">
                    {description}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">                
                <ListGroupItem>Categories: {categories.length}</ListGroupItem>
                <ListGroupItem>Items: {items.length}</ListGroupItem>                                
            </ListGroup>
            <Card.Body>
                <center><Button variant="primary" className="theme-blue" href={"menus/edit/" + id} style={{width: '100px', marginBottom: '10px'}}>Edit</Button></center>
                <center><Button variant="danger" className="theme-red" disabled={isLoading} onClick={onArchiveClick} style={{width: '100px', marginBottom: '10px'}}>Archive</Button></center>
                <center>Last edited: <i>{lastEdited.substring(0, 10)}</i></center>
            </Card.Body>
        </Card>
    )
}

MenuCard.propTypes = {  
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    restaurantName: PropTypes.string.isRequired,
    lastEdited: PropTypes.string.isRequired,
    categories: PropTypes.array,
    items: PropTypes.array,
}  

export default MenuCard;