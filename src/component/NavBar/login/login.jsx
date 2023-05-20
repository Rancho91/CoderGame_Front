import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import {postUser} from "../../../redux/actions/actions"

function Login(){
    const {loginWithRedirect, user, isAuthenticated}= useAuth0()
    const dispatch = useDispatch()

    const sendUser = (e) =>{
        
        
        e.preventDefault();
        if (isAuthenticated){
            const {sub, name, email} = user
            dispatch(postUser({sub,name,email}))
        }

    }


    return(
        <div>
            <button onClick={()=>loginWithRedirect()}>Login</button>
        </div>
    )
}

export default Login