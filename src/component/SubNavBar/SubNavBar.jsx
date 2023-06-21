import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./subnavbar.module.css";

const SubNavBar = () => {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const navigate = useNavigate();

  const onChangeUser = (event) => {
    switch (event.target.value) {
      case "Login": {
        loginWithRedirect();
        break;
      }
      case "Logout": {
        logout();
        break;
      }
      case "Profile": {
        navigate("/profile");
        break;
      }
      case "Create Game": {
        navigate("/creategame");
      }

      default:
        break;
    }
  };

  return (
    <div >
      <div className={styles.subnavbar}>
        <nav className={styles.navbarOrdering}>
          <div className="d-flex justify-content-center ">
            
            <div className="mx-1">
              <Link to="/videogames" className={styles.orderSelect}>
                AllGames
              </Link>
            </div>
            
            <div className="mx-1">
              <Link to="/favorites" className={styles.orderSelect}>
                <span >
                  <FontAwesomeIcon icon={faHeart} />
                  <span>  Favorites</span>
                </span>
              </Link>
            </div>

            <div className="mx-1" >
              <FontAwesomeIcon icon={faUser} />
              <select
                name="User"
                onChange={onChangeUser}
                className={`${styles.orderSelect} ${styles.selectedSelect}`}
              >
                <option value="options" disabled selected>
                  <span>
                  Options
                  </span>
                  
                </option>
                <option name="Create Game"> Create Game</option>
                {isAuthenticated ? (
                  <>
                    <option value="Profile">Profile</option>
                    <option value="Logout">Logout</option>
                  </>
                ) : (
                  <option value="Login">Login</option>
                )}
              </select>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SubNavBar;