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
    <div className="container">
      <div className={`row ${styles.subnavbar} ${styles.noMarginBottom}`}>
        <nav className={styles.navbar}>
          <div className={`col-6 ${styles.navbar__item}`}>
            <Link to="/videogames" className={styles.allGamesButton}>
              <a className={styles.allGamesLink}>AllGames</a>
            </Link>
          </div>

          <div className={`col-6 d-flex flex-row ${styles.navbar__item}`}>
            <div className="col-5">
              <Link to="/favorites">
                <FontAwesomeIcon icon={faHeart} className={styles.heartIcon} />
              </Link>
            </div>

            <div className={`col-5 ${styles.navbar__item}`}>
              <FontAwesomeIcon icon={faUser} className={`${styles.userIcon}`} />

              <select name="User" id="" onChange={onChangeUser}>
                <option value="options" disabled selected>
                  Options
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
