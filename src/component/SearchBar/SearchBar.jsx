import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./searchbar.module.css";

const SearchBar = ({ handlerFilter }) => {
  const [name, setName] = useState("");

  const handleInput = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlerFilter(name);
  };

  return (
    <div className={styles.searchBar}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="What game are you looking for?"
          value={name}
          onChange={handleInput}
        />
        <button type="submit" className={styles.searchButton}>
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
