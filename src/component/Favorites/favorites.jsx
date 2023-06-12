import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../card/card";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "../NavBar/login/login";
import styles from "./favorites.module.css"
import { api } from '../../App'
function Favorites() {
  const [listFavorites, setListFavorites] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [refresh, setRefresh] = useState(true);

  const refreshHandler = () => {
   setRefresh(!refresh);
  };

  useEffect(() => {
    const getFavorites = async () => {
      if (isAuthenticated) {
        try {
          const response = await api.get(
            `user/favorites/${user?.sub}`
          );
          setListFavorites(response.data.listFavorites);
        } catch (error) {
          window.alert(error.message);
        }
      }
    };
     getFavorites();
  }, [refresh ]);

console.log(selectedGames)
  function handleAddList(id, condition) {
    if(!condition){
      setSelectedGames([...selectedGames, id]);
    } else{
      setSelectedGames(selectedGames.filter(g => g !== id));

    }
  }


  async function handlePurchase() {
    try {
      const requestData = {
        idVideogame: selectedGames,
        idUser: user?.sub
      };
  
      const response = await api.post("payment/buy", requestData);
      console.log("Buy request response:", response.data);
      setSelectedGames([]);
      setRefresh(!refresh)
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <div className={`container ${styles.favorites}`}>
      <div className="row">
        {listFavorites?.map((game) => {
          game = { ...game, Favorites: [{ buy: false }] };
          return (
            <div className="col-sm-12 col-md-3">
              <Card
                game={game}
                 refreshHandler={refreshHandler}
                handleAddList={handleAddList}
                 selectedGames={selectedGames}
              />
            </div>
          );
        })}
        <button onClick={handlePurchase}>Comprar</button>
        <div>{isAuthenticated ? null : <Login rute="http://localhost:3000/favorites" />}</div>
      </div>
    </div>
  );
}

export default Favorites;
