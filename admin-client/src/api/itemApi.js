export const GetItem = async (token, menuId, id) =>
{
    let res = await
    fetch(process.env.REACT_APP_API_URL + '/Menu/' + menuId + "/Item/" + id, {
        headers: {
                    "Authorization": `Bearer ${token}`, 
                    "Access-Control-Allow-Origin": '*' 
                }
    });
    if (res.status === 400)
    {
        return res.status;
    }
    return res.json();
} 


export const UpdateItem = async (token, menuId, id, _name, _description, _price, _tags, _categories) =>
{
    if (_categories === [])
    {
        _categories = undefined
    }

    let res = await
    fetch(process.env.REACT_APP_API_URL + '/Menu/' + menuId + "/Item/" + id, {
        method: "PUT",
        headers:{
                    "Authorization": `Bearer ${token}`, 
                    "Access-Control-Allow-Origin": '*', 
                    "Content-Type": "application/json"
                },
        body: JSON.stringify({ name: _name, description: _description, price: _price, tags: _tags, categories: _categories })
    });
    return res.status;
}


export const ArchiveItem = async (token, menuId, id) =>
{
    let res = await
        fetch(process.env.REACT_APP_API_URL + '/Menu/' + menuId + "/Item/" + id, {
            method: "DELETE",
            headers: {
                        "Authorization": `Bearer ${token}`, 
                        "Access-Control-Allow-Origin": '*' 
                    }
        });
    return res.status;
}

export const CreateItem = async (token, menuId, _name, _description, _price, _tags, _categories) => {
    let res = await
        fetch(process.env.REACT_APP_API_URL + '/Menu/' + menuId + "/Item", {
            method: "POST",
            headers:{
                        "Authorization": `Bearer ${token}`, 
                        "Access-Control-Allow-Origin": '*', 
                        "Content-Type": "application/json"
                    },
            body: JSON.stringify({ name: _name, description: _description, price: _price, tags: _tags, categories: _categories })
        });
    return res.status;
}