// import React, { useEffect,useState } from "react";
// import axios from "axios";
// import Card from "../card/card";
// import { useAuth0 } from "@auth0/auth0-react";
// import Login from "../NavBar/login/login"
// function Favorites (){
//     const [listFavorites, setListFavorites]= useState([])
//     const {user, isAuthenticated, loginWithRedirect} = useAuth0()
//     const [refresh, setRefresh] = useState(true)

//     const refreshHandler = () =>{
//         setRefresh(!refresh)
//       }
//     useEffect(()=>{
//         const getFavorites = async () =>{
//             if(isAuthenticated){
//                 try {       
//                         const response = await axios.get(`http://localhost:3001/user/favorites/${user?.sub}`)
//                         setListFavorites(response.data.listFavorites)
//                                     }
  
//                  catch (error) {
//                  window.alert(error.message)   
//         }}
//         }
//          getFavorites()
//     },[refresh])
// console.log(listFavorites)
//     return(
//     <div className="container">
//         <div className="row">
//             {listFavorites?.map((game)=>{
//                 game = {...game, Favorites:[{"buy": false}]}
//                return( 
//                <div className="col-sm-12 col-md-3">
//                 <Card game={game} refreshHandler={refreshHandler}/>

//                </div>
//             )})}
//          <div>
//             {isAuthenticated?null:<Login rute="http://localhost:3000/favorites"/>}
//          </div>
//         </div>
    
    
    
    
//     </div>

//     )
// }

// export default Favorites





import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../card/card";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "../NavBar/login/login";

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
          const response = await axios.get(
            `http://localhost:3001/user/favorites/${user?.sub}`
          );
          setListFavorites(response.data.listFavorites);
        } catch (error) {
          window.alert(error.message);
        }
      }
    };
    getFavorites();
  }, [refresh]);

  function handleBuyClick(game) {
    if (selectedGames.includes(game)) {
      setSelectedGames(selectedGames.filter(g => g.id !== game.id));
    } else {
      setSelectedGames([...selectedGames, game]);
    }
    console.log("Selected Games:", selectedGames); // Verificar juegos seleccionados
  }

  async function handlePurchase() {
    try {
      const requestData = {
        idVideogame: selectedGames.map(game => game.id),
        idUser: user?.sub
      };
  
      console.log("Buy request data:", requestData); // Imprimir datos antes de enviar la solicitud
  
      const response = await axios.post("http://localhost:3001/payment/buy", requestData);
      console.log("Buy request response:", response.data);
      setSelectedGames([]);
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <div className="container">
      <div className="row">
        {listFavorites?.map((game) => {
          game = { ...game, Favorites: [{ buy: false }] };
          return (
            <div className="col-sm-12 col-md-3">
              <Card
                game={game}
                refreshHandler={refreshHandler}
                onBuyClick={() => handleBuyClick(game)}
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
