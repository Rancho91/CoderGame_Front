import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllVideogames } from "../../redux/actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./subnavbar.module.css";
import Login from "../NavBar/login/login";
import Logout from "../NavBar/logaut/logaut";

const SubNavBar = ({ handlerFilter }) => {
  const { isAuthenticated } = useAuth0();
  const genresList = useSelector((state) => state.genresFilter);
  const platformsList = useSelector((state) => state.platformsFilter);
  const [filter, setFilter] = useState({});

  const dispatch = useDispatch();



      const change = (event)=>{
        setFilter({...filter, [event.target.name]:event.target.value})
      }
      useEffect(()=>{
        const get = () =>{
          dispatch(getAllVideogames(filter))
        }
        get()
      },[filter])

    return (
    <div className={`${styles.subnavbar} ${styles.noMarginBottom}`}>
      <nav className={styles.navbar}>
        <div className={styles.navbar__item}>
          <select name="genre" onChange={change}>
            <option value="">Genres</option>
            {genresList?.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.navbar__item}>
          <select name="platforms" onChange={change}>
            <option value="">Platforms</option>
            {platformsList?.map((platform) => (
              <option key={platform.id} value={platform.name}>
                {platform.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.navbar__item}>
          <Link to="/videogames" className={styles.allGamesButton}>
            🎮All Games
          </Link>
        </div>


        <div className={styles.navbar__item}>
          <Link to="/favorites">
            <FontAwesomeIcon icon={faHeart} className={styles.heartIcon} />
          </Link>
        </div>


        <div className={styles.navbar__item}>
          {isAuthenticated ? (
            <Link to="/" className={styles.loginLink}>
              <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
            </Link>
          ) : (
            <Link to="/login" className={styles.loginLink}>
              <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
            </Link>
          )}
        </div>
        
        {/* <div className="col-3"> 
              {isAuthenticated?<Logout/>:<Login rute="http://localhost:3000/"/> }  
            </div> */}
      </nav>
    </div>
  );
};

export default SubNavBar;

