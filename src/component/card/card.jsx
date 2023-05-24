import React,{useState} from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";


function Card ({game, refreshHandler}){
 const {name, image, description, price, released,Favorites, id} = game
 const {user} = useAuth0()


 const addDleneteFavorites= async()=>{
  
    if(!Favorites.length){
      try {
        await axios.post("http://localhost:3001/user/favorites",{idUser:user.sub, idVideogame:id})
        refreshHandler()
          } catch (error) {
        window.alert(error.message)
      }
    } else{
      try {
        await axios.put("http://localhost:3001/user/favorites",{idUser:user.sub, idVideogame:id})
        refreshHandler()
      } catch (error) {
        window.alert(error.message)
      }
    }
  }

    return(
      <Link to={`/videogames/${id}`}>
      <div className={`col-sm-12 col-md-12 text-center ${styles.container}`}>
      <div className={`row ${styles.title}`}>
        <div className={`${styles.price}`}>
          <p className="mt-3 mr-3">{price}</p>
        </div>
        <div className="col-12">
          <h1>{name}</h1>
        </div>
      </div>
    
      <div  className={`row ${styles.image}`} style={{ backgroundImage: `url(${image})` }} >
      </div>
    
      {/* <div className="row">
        <div className="col-12 d-flex align-items-center flex-column">
          <p className={styles.description}>{released}</p>
        </div>
      </div> */}
    
      {/* <div className="row">
        <div className="col-12 d-flex align-items-center">
          <p className={styles.description}>{description?description:null}</p>
        </div>
      </div> */}
    
      <div className="row">
        <div className={`col-6 ${styles.buy}`}>
        <button onClick={addDleneteFavorites}>
            <FontAwesomeIcon
            icon={faHeart}
            className={Favorites?.length?styles.heartIconFav:styles.heartIcon}
            /> 
        </button>      
         </div>
        <div className={`col-6 ${styles.buy}`}>
          <p>Buy</p>
        </div>
      </div>
    </div>
    </Link>
        )
}

export default Card