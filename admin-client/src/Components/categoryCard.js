import React from "react";
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap'

import PropTypes from 'prop-types';
import { DeleteCategory } from "../api/categoryApi";
import { useAuth0 } from "@auth0/auth0-react";



const CategoryCard = ({ id, menuId, name, description, items }) => {

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
        await DeleteCategory(accessToken, menuId, id)
        setLoading(false);
        
        window.location.reload();
    }

    return (
        <Card className="card" style={{ width: '18rem' }} onDoubleClick={() => {window.location.href += "/categories/" + id;}}>
            <Card.Body>
                <Card.Title style={{ textOverflow: 'ellipsis' }} >{name}</Card.Title>
                <Card.Text style={{ height: '60px', textOverflow: 'ellipsis' }}>
                    {description}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">                
                <ListGroupItem>Items: {items.length}</ListGroupItem>                                
            </ListGroup>
            <Card.Body>
                <center><Button variant="primary" href={ window.location.href + "/categories/" + id} style={{width: '100px', marginBottom: '10px'}}>Edit</Button></center>
                <center><Button variant="danger" disabled={isLoading} onClick={onArchiveClick} style={{width: '100px', marginBottom: '10px'}}>Delete</Button></center>
            </Card.Body>
        </Card>
    )
}

CategoryCard.propTypes = {  
    id: PropTypes.number.isRequired,
    menuId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    items: PropTypes.array,
}  

export default CategoryCard;