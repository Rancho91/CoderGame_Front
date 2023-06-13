import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {useLocation} from "react-router-dom"
import { api } from '../../App'
function Card({ game, refreshHandler, handleAddList, selectedGames }) {
  const { name, image, description, price, released, Favorites, id } = game;
  const { user, loginWithRedirect , isAuthenticated } = useAuth0();
  const [isSelected, setIsSelected] = useState(false);
  const location = useLocation()

  const addDleneteFavorites = async () => {
    if(isAuthenticated){
      if (!Favorites.length) {
        try {
          await api.post("user/favorites", {
            idUser: user.sub,
            idVideogame: id,
          });
          refreshHandler();
          console.log("Updated Game Data (Add Favorite):", refreshHandler); // Log new game data
  
        } catch (error) {
          window.alert(error.message);
        }
      } else {
        console.log("Deleting favorite game...");
  
        try {
          await api.put("/user/favorites", {
            idUser: user.sub,
            idVideogame: id,
          });
          refreshHandler();
          console.log("Updated Game Data (Remove Favorite):", refreshHandler);
  
        } catch (error) {
          window.alert(error.message);
        }
      }

    } else{
      loginWithRedirect()
    }

    
  };

  const handleCardClick = () => {
   setIsSelected(!isSelected);
  };

  const onBuyClick =async()=>{
    if(isAuthenticated)
   { try {
      const requestData = {
        idVideogame: [game.id],
        idUser: user?.sub
      };
      const response = await api.post("/payment/buy", requestData);
      refreshHandler();
    } catch (error) {
      window.alert(error.message)
    }
    }else {
      loginWithRedirect()
    }
  }

  const handleAdd = () =>{
    
    handleAddList(id, selectedGames.includes(game.id) )
  }

  
  return (
    <div
      className={`col-sm-12 col-md-12 text-center ${
        isSelected ? styles.selected : ""
      } ${styles.container}`}
      onClick={handleCardClick}
    >

      
        <div
          className={`row ${styles.image}`}
          style={{ backgroundImage: `url(${image})` }}
        >
                     
          <button onClick={addDleneteFavorites} className={styles.buttonHeart}>
            <FontAwesomeIcon
            icon={faHeart}
            className={
            Favorites?.length ? styles.heartIconFav : styles.heartIcon
            }/>
          </button>
        </div>

        
        <div className={`row ${styles.title}`}>
        
        <Link to={`/videogames/${id}`} className={styles.link}> <div className="col-12">
          <h1 className={styles.name}>{name}</h1>

         </div>   
      </Link>
      </div>
      {Favorites?.length && Favorites[0].buy?(<p>Purched</p>):(
      <div className="row">

        <div className={`col-6 ${styles.buy}`}>
          <p className="mt-3 mr-3">{price}</p>
        </div>

        <div className={`col-6 ${styles.buy}`}>
          {
            location?.pathname=="/favorites"?(

              
            <button onClick={handleAdd}>{
             selectedGames?.includes(game.id)?"-":"+" }</button>
            )
            :(

              <button onClick={onBuyClick}>Buy</button>
            )
          }
        </div>
      </div>)}
    </div>
  );
}

export default Card;
