import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import {userLogout} from "../../../redux/actions/actions"


function Logout(){
    const { logout } = useAuth0()
    const dispatch = useDispatch()
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <button onClick={handleLogout}>Logaut</button>
    </div>
  );
}

export default Logout
