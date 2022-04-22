import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useCookies } from 'react-cookie';


function Authorize(props)
{
    const { user, getAccessTokenSilently } = useAuth0();
    const [ userCookie, setCookie ] = useCookies(['user']);

    useEffect(() => {
        const getUserMetadata = async () => {
          const domain = "ordio.eu.auth0.com";
      
          try {
            const accessToken = await getAccessTokenSilently({
              audience: `https://${domain}/api/v2/`,
              scope: "read:current_user",
            });

            setCookie('token', accessToken, { maxAge: 86400 });
          } catch (e) {
            console.log(e.message);
          }
        };
      
        getUserMetadata();
        console.log("Hello World!");
        
      }, [getAccessTokenSilently, user?.sub, setCookie]);

}

export default Authorize;