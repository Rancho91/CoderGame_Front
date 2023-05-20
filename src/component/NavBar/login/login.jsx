import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Login(){
    const {loginWithRedirect, user}= useAuth0()
    console.log(user)

    return(
        <div>
            <button onClick={()=> loginWithRedirect()}>Login</button>
        </div>
    )
}

export default Login