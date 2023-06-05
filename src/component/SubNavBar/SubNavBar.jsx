import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllVideogames, query } from "../../redux/actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./subnavbar.module.css";




const SubNavBar = () => {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const genresList = useSelector((state) => state.genresFilter);
  const queryState = useSelector((state) => state.query)
  const platformsList = useSelector((state) => state.platformsFilter);
  const [filter, setFilter] = useState({});
  const dispatch = useDispatch();

  const navigate = useNavigate()

      const change = (event)=>{
        let querys
        if(isAuthenticated){
          setFilter({...filter, sub:user.sub, ...queryState, [event.target.name]:event.target.value, })
         querys = {...filter, sub:user.sub,...queryState, [event.target.name]:event.target.value,}}
         else {
          setFilter({...filter,...queryState, [event.target.name]:event.target.value })
          querys = {...filter,...queryState, [event.target.name]:event.target.value }}
        
        dispatch(query(querys))
        navigate('./videogames')
      }
      console.log(filter)
      
      useEffect(()=>{
        
        const get = () =>{
          dispatch(getAllVideogames({...filter,...queryState, page:1}))
        }
        get()
      },[filter])

      const onChangeUser = (event) =>{
          switch(event.target.value){
            case "Login":{
              loginWithRedirect();
              break
            };
            case "Logout":{
              logout();

              break
            };
            case "Profile":{
              navigate("/profile");
              break;
            };
            case "Create Game":{
              navigate("/creategame")
            }

            default: break
          }
      }





    return (
    <div className={`row ${styles.subnavbar} ${styles.noMarginBottom}`}>
      <nav className={`navbar navbar-expand`}>
        <div className="container-fuild">
        </div>
        <div className={`col-3 ${styles.navbar__item}`}>
          <select name="genre" onChange={change}>
            <option value="">Genres</option>
            {genresList?.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div className={`col-3 ${styles.navbar__item}`}>
          <select name="platforms" onChange={change}>
            <option value="">Platforms</option>
            {platformsList?.map((platform) => (
              <option key={platform.id} value={platform.name}>
                {platform.name}
              </option>
            ))}
          </select>
        </div>
        <div className={`col-3 ${styles.navbar__item}`}>
            <Link to="/videogames" className={styles.allGamesButton}>
            <a className={styles.allGamesLink}>🎮All Games</a>            </Link>
        </div>
        <div className={`col-3 d-flex flex-row ${styles.navbar__item}`}>
              <div className="col-5">
                <Link to="/favorites">
                     <FontAwesomeIcon icon={faHeart} className={styles.heartIcon} />
                      </Link>
             </div>

              <div className={`col-5 ${styles.navbar__item}`}>
                <FontAwesomeIcon icon={faUser} className={`${styles.userIcon}`} />

                <select name="User" id="" onChange={onChangeUser}>
  <option value="options" disabled selected>Options</option>
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
  );
};

export default SubNavBar;
