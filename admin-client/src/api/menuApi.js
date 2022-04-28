const GetUserMenus = async (path, token) => 
{
    let res = await 
    fetch(path, {
        method: "GET",
        headers: {"Authorization": `Bearer ${token}`, "Access-Control-Allow-Origin": '*' }
    });

    return res.json();
}

export default GetUserMenus;