import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./searchbar.module.css";
import { useDispatch } from "react-redux";
import { getAllVideogames, query } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const SearchBar = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user, isAuthenticated } = useAuth0()

  const handleInput = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isAuthenticated){
      dispatch(query({name, sub:user.sub}))
      dispatch(getAllVideogames({name, sub:user.sub}))
    } else {
      dispatch(query({name}))
      dispatch(getAllVideogames(name))
    }
    

    navigate("/videogames")
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
