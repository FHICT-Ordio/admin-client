import React, { useEffect } from "react";
import { useCookies } from 'react-cookie';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { DeleteMenu } from '../api/menuApi'

import PropTypes from 'prop-types';



const MenuEntry = ({ id, title, description, restaurantName, lastEdited, categories, items }) => {

    const [ isLoading, setLoading ] = React.useState(false);
    const [ userCookie ] = useCookies(['user']);
    
    /*
    useEffect(() => {
        
    });
    */

    const onDeleteClick = async () => {
        setLoading(true);
        await DeleteMenu(userCookie.token, id)
        setLoading(false);
        
        window.location.reload();
    }

    return (
        <Card className="menucard" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title style={{ textOverflow: 'ellipsis' }} >{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted" style={{ textOverflow: 'ellipsis' }} >{restaurantName}</Card.Subtitle>
                <Card.Text style={{height: '60px', textOverflow: 'ellipsis' }}>
                    {description}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem><center><Button variant="danger" disabled={isLoading} onClick={onDeleteClick} >Delete</Button></center></ListGroupItem>
            </ListGroup>
            <Card.Body>
                <Card.Link href={"menus/edit/" + id }><center>Edit</center></Card.Link>
                <center>Last edited: <i>{lastEdited.substring(0, 10)}</i></center>
            </Card.Body>
        </Card>
    )
}

MenuEntry.propTypes = {  
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    restaurantName: PropTypes.string.isRequired,
    lastEdited: PropTypes.string.isRequired,
    categories: PropTypes.array,
    items: PropTypes.array,
}  

export default MenuEntry;