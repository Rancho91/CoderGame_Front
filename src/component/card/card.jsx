import React,{useState} from "react";
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
      <div className={`col-md-12 text-center ${styles.container}`}>
      <div className={`row ${styles.title}`}>
        <div className="col-12">
          <h1>{name}</h1>
        </div>
      </div>
    
      <div  className={`row ${styles.image}`} style={{ backgroundImage: `url(${image})` }} >
      </div>
    
      <div className="row">
        <div className="col-12 d-flex align-items-center flex-column">
          <p className={styles.description}>{released}</p>
        </div>
      </div>
    
      <div className="row">
        <div className="col-12 d-flex align-items-center">
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    
      <div className="row">
        <div className={`col-6 ${styles.price}`}>
        <button onClick={addDleneteFavorites}>
            <FontAwesomeIcon
            icon={faHeart}
            className={Favorites?.length?styles.heartIconFav:styles.heartIcon}
            /> 
        </button>      
         </div>
        <div className={`col-6 ${styles.price}`}>
          <p>Buy</p>
        </div>
      </div>
    </div>
    
        )
}

export default Card