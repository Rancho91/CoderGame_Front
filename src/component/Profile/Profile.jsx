import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/actions/actions";
import Perfil from "../Dashboard/DashBoardComponents/ProfileEdit";

function Profile() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0();

  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(userLogout(user));
    }
  }, [isAuthenticated, user, dispatch]);

  return isLoading ? (
    <div>Loading ...</div>
  ) : (
    isAuthenticated && <div> <Perfil/> </div>
  );
}

export default Profile;
