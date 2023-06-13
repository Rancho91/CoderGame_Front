import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../redux/actions/actions";
import Perfil from "../Dashboard/DashBoardComponents/ProfileEdit";
import CoinBuyer from "../CoinBuyer/CoinBuyer";
import styles from "./profile.module.css"
function Profile() {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  // const handleButtonClick = () => {
  //   navigate("/payment");
  // }

  return isLoading ? (
    <div>Loading ...</div>
  ) : (
    isAuthenticated && (
      <div className={styles.container}>
          <Perfil />
      </div>
    )
  );
}

export default Profile;
