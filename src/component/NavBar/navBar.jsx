import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import styles from "./navBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

function NavBar() {
  return (
    <div className="container">
      <nav className={`${styles.navBar}`}>
        <div className="container">
          <div className={`row ${styles.container}`}>
            <div className={`col-md-4 ${styles.logoContainer}`}>
              <Link to={"/"} className={styles.logoLink}>
                <img
                  // src="https://res.cloudinary.com/dnkaxvkr9/image/upload/v1684796467/samples/vaxtuoeyophrccpxzont.png"
                  src="https://res.cloudinary.com/dnkaxvkr9/image/upload/v1686082344/f7disvq5mkgf0jpvzgsy.png"
                  alt="codergame"
                  className={`img-fluid ${styles.logo}`}
                />
              </Link>
            </div>
            <div className={`col-md-8 ${styles.searchBarContainer}`}>
              <SearchBar />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
