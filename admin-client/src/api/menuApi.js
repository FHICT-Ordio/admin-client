import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';

const GetMenus = (path) => 
{
    const [result, setResult] = React.useState();
    const [ userCookie ] = useCookies(['user']);

    useEffect(() => {
        fetch(path + '/Menu/GetAll', {
            method: "GET",
            headers: {"Authorization": `Bearer ${userCookie.token}`}
          }).then(res => res.json()).then(json => setResult(json));
    })
    
    return result;
}

export default GetMenus;