import React, { useEffect } from "react";
import { useCookies } from 'react-cookie';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { ArchiveMenu } from '../api/menuApi'

import PropTypes from 'prop-types';
import { useHref } from "react-router-dom";



const MenuCard = ({ id, title, description, restaurantName, lastEdited, categories, items }) => {

    const [ isLoading, setLoading ] = React.useState(false);
    const [ userCookie ] = useCookies(['user']);
    
    /*
    useEffect(() => {
        
    });
    */

    const onArchiveClick = async () => {
        setLoading(true);
        await ArchiveMenu(userCookie.token, id)
        setLoading(false);
        
        window.location.reload();
    }

    return (
        <Card className="menucard" style={{ width: '18rem' }} onDoubleClick={() => {window.location.href = window.location.origin + "/menus/edit/" + id;}}>
            <Card.Body>
                <Card.Title style={{ textOverflow: 'ellipsis' }} >{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted" style={{ textOverflow: 'ellipsis' }} >{restaurantName}</Card.Subtitle>
                <Card.Text style={{height: '60px', textOverflow: 'ellipsis' }}>
                    {description}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">                
                <ListGroupItem>Categories: {categories.length}</ListGroupItem>
                <ListGroupItem>Items: {items.length}</ListGroupItem>                                
            </ListGroup>
            <Card.Body>
                <center><Button variant="primary" href={"menus/edit/" + id} style={{width: '100px', marginBottom: '10px'}}>Edit</Button></center>
                <center><Button variant="danger" disabled={isLoading} onClick={onArchiveClick} style={{width: '100px', marginBottom: '10px'}}>Archive</Button></center>
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