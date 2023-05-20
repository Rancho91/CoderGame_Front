import React, { useEffect, useState } from "react";
import fetchData from "../helper/fetchData";
import { useParams } from "react-router";


function Detial (){
    const [game, setGame] = useState({})
    const { id } = useParams();
    useEffect(()=>{
        const detail = async () => {
            try {
              const gameData = await fetchData(`http://localhost:3001/videogames/${id}`, 'get');
              setGame(gameData);
            } catch (error) {
              console.error(error);
            }
          };
      
          detail();
          return ()=>{setGame({})}
    },[id])
    console.log(game)
    return(
        <div className="container">
            <h1>{game.price}</h1>
            <div className="row">

                        <div className="row">
                            {game.Genregames?.map((genre)=>(<div className="col-2">
                            <p>{genre.name}</p></div>))}
                        </div>
            </div>

            <h1 className="col-12">{game.name}</h1>
            <img src={game.image} alt="" className="img-fluid" />
            <div className="row">
                    
                    {game.Platforms?.map((platform)=>(<div className="col-2">
                    <p>{platform.name}</p>  </div>))}
                     </div>
            <h3>{game.released}</h3>
            <p className="col-12">{game.description}</p>
        </div>
    )
}

export default  Detial