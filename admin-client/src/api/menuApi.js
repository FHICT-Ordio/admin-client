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
    return res.json();
}

export const DeleteMenu = async (token, id) =>
{
    let res = await
    fetch(process.env.REACT_APP_API_URL + '/Menu/' + id, {
        method: "DELETE",
        headers: {"Authorization": `Bearer ${token}`, "Access-Control-Allow-Origin": '*' }
    });
    return res.status;
}