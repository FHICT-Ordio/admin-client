import React from "react";
import { Card, ListGroup, ListGroupItem, Button, Alert } from 'react-bootstrap'

import PropTypes from 'prop-types';
import { ArchiveItem } from "../api/itemApi";
import { useAuth0 } from "@auth0/auth0-react";



const ItemCard = ({ id, menuId, name, description, price, tags, categories, ignoreCategories, ignoreWarnings }) => {

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
        await ArchiveItem(accessToken, menuId, id)
        setLoading(false);
        
        window.location.reload();
    }

    return (
        <Card className="card" style={{ width: '18rem' }} onDoubleClick={() => {window.location.href += "/items/" + id;}}>
            <Card.Body>
                <Card.Title style={{ textOverflow: 'ellipsis' }} >{name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted" style={{ textOverflow: 'ellipsis' }}>
                    { 
                        ((categories.length !== 0 || isNaN(+price) || price < 0 || name === "") || (ignoreWarnings === true)) ?
                            <>
                                {
                                    new Intl.NumberFormat(undefined, {
                                        style: 'currency',
                                        currency: 'EUR',
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    }).format(price)     
                                }                    
                            </>
                        :
                            <>
                                <br />
                                <Alert variant="warning">
                                    <Alert.Heading style={{fontSize: 14}}><center>Invalid item, hidden on menu</center></Alert.Heading>
                                </Alert>
                            </>
                    }
                </Card.Subtitle>
                <Card.Text >
                    {
                        (categories.length === 0) && (ignoreCategories === undefined || ignoreCategories === false) ? 
                            <Alert variant="danger">
                                <Alert.Heading style={{fontSize: 14}}><center>No categories selected</center></Alert.Heading>
                            </Alert>
                            :
                            <div>
                                {description}
                            </div>
                    }
                    
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                {
                    (ignoreCategories === undefined || ignoreCategories === false) &&
                    <ListGroupItem>Categories: {categories.length}</ListGroupItem>
                }
                {
                    (tags.length > 0 && tags[0] !== "") &&
                    <ListGroupItem>
                        Tags: 
                        {
                            tags.map(x => {
                                let end = "";
                                if (tags.indexOf(x) < tags.length - 1)
                                {
                                    end = ",";
                                }
                                return " " + x + end;
                            })
                        }
                    </ListGroupItem>     
                }
                {
                    
                }
            </ListGroup>
            <Card.Body>
                <center><Button variant="primary" href={ window.location.href + "/items/" + id} style={{width: '100px', marginBottom: '10px'}}>Edit</Button></center>
                <center><Button variant="danger" disabled={isLoading} onClick={onArchiveClick} style={{width: '100px', marginBottom: '10px'}}>Archive</Button></center>
            </Card.Body>
        </Card>
    )
}

ItemCard.propTypes = {  
    id: PropTypes.number.isRequired,
    menuId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    tags: PropTypes.array,
    categories: PropTypes.array
}  

export default ItemCard;