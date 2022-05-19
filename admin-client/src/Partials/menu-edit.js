import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetMenu } from "../api/menuApi";
import { useAuth0 } from '@auth0/auth0-react';
import { sha256 } from 'js-sha256'

const EditMenu = (props) => {
    const { menuId } = useParams();
    const [ menu, setMenu ] = React.useState();
    const { user, isAuthenticated, isLoading } = useAuth0();

    useEffect(() => {
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

    return (
        menu !== undefined && !isLoading &&
        <div>
            <div>
                <br />
                <center><h1>Edit <i>{menu.title}</i></h1></center>
            </div>
        </div>
    );
}

export default EditMenu;