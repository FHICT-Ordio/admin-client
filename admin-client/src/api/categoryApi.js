export const GetCategory = async (token, menuId, id) =>
{
    let res = await
    fetch(process.env.REACT_APP_API_URL + '/Menu/' + menuId + "/category/" + id, {
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

export const DeleteCategory = async (token, menuId, id) =>
{
    let res = await
    fetch(process.env.REACT_APP_API_URL + '/Menu/' + menuId + "/category/" + id, {
        method: "DELETE",
        headers: {
                    "Authorization": `Bearer ${token}`, 
                    "Access-Control-Allow-Origin": '*' 
                }
    });
    return res.status;
}

export const UpdateCategory = async (token, menuId, id, _name, _description) =>
{
    let res = await
    fetch(process.env.REACT_APP_API_URL + '/Menu/' + menuId + "/category/" + id, {
        method: "PUT",
        headers:{
                    "Authorization": `Bearer ${token}`, 
                    "Access-Control-Allow-Origin": '*', 
                    "Content-Type": "application/json"
                },
        body: JSON.stringify({ name: _name, description: _description })
    });
    return res.status;
}

export const CreateCategory = async (token, menuId, _name, _description) => {
    let res = await
    fetch(process.env.REACT_APP_API_URL + '/Menu/' + menuId + "/Category", {
        method: "POST",
        headers:{
                    "Authorization": `Bearer ${token}`, 
                    "Access-Control-Allow-Origin": '*', 
                    "Content-Type": "application/json"
                },
        body: JSON.stringify({ name: _name, description: _description })
    });
    return res.status;
}