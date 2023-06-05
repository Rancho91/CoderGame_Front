// import React,{useState} from "react";
// import { Link } from "react-router-dom";
// import styles from "./card.module.css"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart} from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import { useAuth0 } from "@auth0/auth0-react";

// function Card ({game, refreshHandler}){
//  const {name, image, description, price, released,Favorites, id} = game
//  const {user} = useAuth0()

//  const addDleneteFavorites= async()=>{

//     if(!Favorites.length){
//       try {
//         await axios.post("http://localhost:3001/user/favorites",{idUser:user.sub, idVideogame:id})
//         refreshHandler()
//           } catch (error) {
//         window.alert(error.message)
//       }
//     } else{
//       try {
//         await axios.put("http://localhost:3001/user/favorites",{idUser:user.sub, idVideogame:id})
//         refreshHandler()
//       } catch (error) {
//         window.alert(error.message)
//       }
//     }
//   }

//     return(
//       <div className={`col-sm-12 col-md-12 text-center ${styles.container}`}>
//       <div className={`row ${styles.title}`}>
//         <div className={`${styles.price}`}>
//           <p className="mt-3 mr-3">{price}</p>
//         </div>
//         <div className="col-12">
//           <h1>{name}</h1>
//         </div>
//       </div>
//         <Link to={`/videogames/${id}`}>

//       <div  className={`row ${styles.image}`} style={{ backgroundImage: `url(${image})` }} >
//       </div>
//       </Link>

//       {/* <div className="row">
//         <div className="col-12 d-flex align-items-center flex-column">
//           <p className={styles.description}>{released}</p>
//         </div>
//       </div> */}

//       {/* <div className="row">
//         <div className="col-12 d-flex align-items-center">
//           <p className={styles.description}>{description?description:null}</p>
//         </div>
//       </div> */}

//       <div className="row">
//         <div className={`col-6 ${styles.buy}`}>
//         <button onClick={addDleneteFavorites}>
//             <FontAwesomeIcon
//             icon={faHeart}
//             className={Favorites?.length?styles.heartIconFav:styles.heartIcon}
//             />
//         </button>
//          </div>
//         <div className={`col-6 ${styles.buy}`}>
//           <p>Buy</p>
//         </div>
//       </div>
//     </div>
//         )
// }

// export default Card


import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {useLocation} from "react-router-dom"

function Card({ game, refreshHandler, handleAddList, selectedGames }) {
  const { name, image, description, price, released, Favorites, id } = game;
  const { user, loginWithRedirect , isAuthenticated } = useAuth0();
  const [isSelected, setIsSelected] = useState(false);
  const location = useLocation()

  const addDleneteFavorites = async () => {
    if (!Favorites.length) {
      try {
        await axios.post("http://localhost:3001/user/favorites", {
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
        await axios.put("http://localhost:3001/user/favorites", {
          idUser: user.sub,
          idVideogame: id,
        });
        refreshHandler();
        console.log("Updated Game Data (Remove Favorite):", refreshHandler);

      } catch (error) {
        window.alert(error.message);
      }
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
      const response = await axios.post("http://localhost:3001/payment/buy", requestData);
      window.alert("se realizo la compra de forma exitosa")
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
      <div className={`row ${styles.title}`}>
        <div className={`${styles.price}`}>
          <p className="mt-3 mr-3">{price}</p>
        </div>
        <div className="col-12">
          <h1>{name}</h1>
        </div>
      </div>
      <Link to={`/videogames/${id}`}>
        <div
          className={`row ${styles.image}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </Link>
      <div className="row">
        <div className={`col-6 ${styles.buy}`}>
          <button onClick={addDleneteFavorites}>
            <FontAwesomeIcon
              icon={faHeart}
              className={
                Favorites?.length ? styles.heartIconFav : styles.heartIcon
              }
            />
          </button>
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
      </div>
    </div>
  );
}

export default Card;
