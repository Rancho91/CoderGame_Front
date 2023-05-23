import React from "react";
import { Link } from "react-router-dom";
import styles from "./navBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

function NavBar() {
  return (
<nav className={`${styles.navBar} ${styles.noMarginBottom}`}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link to={"/"} className={styles.logoLink}>
            <img
              src="https://res.cloudinary.com/dnkaxvkr9/image/upload/v1684796467/samples/vaxtuoeyophrccpxzont.png"
              alt="codergame"
              className={styles.logo}
            />
          </Link>
        </div>
        <div className={styles.searchBarContainer}>
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
