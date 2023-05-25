import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import Logout from "../NavBar/logaut/logaut";


function Profile(){

    const dispatch = useDispatch();
    const { user, isAuthenticated, isLoading } = useAuth0();

    const userId = useSelector((state) => state.userId);

    useEffect(() => {
        if (isAuthenticated) {
          dispatch(userLogout(user));
        }
      }, [isAuthenticated, user, dispatch]);
    
      if (isLoading) {
        return <div>Loading ...</div>;
      }
      return (
        
        isAuthenticated && (
          <div >
            <img src={user.picture} alt={user.name} />
    
            <h2>{user.name}</h2>
    
            <p>{user.email}</p>
            
    
            {/* <Link  to={"/payment"}>Buy game</Link> */}

            <div>
                <Logout/>
            </div>
          </div>
        )
      );





}

export default Profile;