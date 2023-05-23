import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from "react-router-dom";
import styles from "./navBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

function NavBar() {
  return (
<nav className={`${styles.navBar} ${styles.noMarginBottom}`}>
  <div className="container">
  <div className={`row ${styles.container}`}>
        <div className={`col-md-6 ${styles.logoContainer}`}>
          <Link to={"/"} className={styles.logoLink}>
            <img
              src="https://res.cloudinary.com/dnkaxvkr9/image/upload/v1684796467/samples/vaxtuoeyophrccpxzont.png"
              alt="codergame"
              className={`img-fluid ${styles.logo}`}
            />
          </Link>
        </div>
        <div className={`col-md-6 ${styles.searchBarContainer}`}>
          <SearchBar />
        </div>
      </div>
  </div>
      
    </nav>
  );
}

export default NavBar;