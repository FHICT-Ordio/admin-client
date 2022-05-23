export const GetUserMenus = async (token) => 
{
    let res = await 
    fetch(process.env.REACT_APP_API_URL + '/Menu/GetAll', {
        method: "GET",
        headers: {"Authorization": `Bearer ${token}`, "Access-Control-Allow-Origin": '*' }
    });
    return res.json();
}

export const GetMenu = async (id) =>
{
    let res = await
    fetch(process.env.REACT_APP_API_URL + '/Menu/' + id, {
        headers: {"Access-Control-Allow-Origin": '*' }
    });
    if (res.status === 400)
    {
        return res.status;
    }
    return res.json();
}

export const ArchiveMenu = async (token, id) =>
{
    let res = await
    fetch(process.env.REACT_APP_API_URL + '/Menu/' + id, {
        method: "DELETE",
        headers: {"Authorization": `Bearer ${token}`, "Access-Control-Allow-Origin": '*' }
    });
    return res.status;
}

export const UpdateMenu = async (token, id, _title, _restaurantName, _description) =>
{
    let res = await
    fetch(process.env.REACT_APP_API_URL + '/Menu/' + id, {
        method: "PUT",
        headers:{
                    "Authorization": `Bearer ${token}`, 
                    "Access-Control-Allow-Origin": '*', 
                    "Content-Type": "application/json"
                },
        body: JSON.stringify({ title: _title, restaurantName: _restaurantName, description: _description })
    });
    return res.status;
}

export const CreateMenu = async (token, _title, _restaurantName, _description) => {
    let res = await
    fetch(process.env.REACT_APP_API_URL + '/Menu', {
        method: "POST",
        headers:{
                    "Authorization": `Bearer ${token}`, 
                    "Access-Control-Allow-Origin": '*', 
                    "Content-Type": "application/json"
                },
        body: JSON.stringify({ title: _title, restaurantName: _restaurantName, description: _description })
    });
    return res.status;
}