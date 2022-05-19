import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetMenu } from "../api/menuApi";

const EditMenu = (props) => {
    const { menuId } = useParams();
    const [ menu, setMenu ] = React.useState();

    useEffect(() => {
        GetMenu(menuId).then(json => setMenu(json))
    });

    return (
        <div>
            <center><h1>Edit</h1></center>
            {JSON.stringify(menu)}
        </div>
    );
}

export default EditMenu;