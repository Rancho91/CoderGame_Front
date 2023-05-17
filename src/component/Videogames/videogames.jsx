import React from "react";
import { useEffect, useState } from "react";
import fetchData from "../Home/helper/fetchData";


function Videogames (){
    const [allVideogames, setAllVideogames]= useState([])


    useEffect(() => {
        const data = async () => {
          const response = await fetchData('http://localhost:3001/videogames', 'get');
          setAllVideogames(response);
        };
    
        data();
      }, []);
    
    return(
        <div>
            {allVideogames?(allVideogames.map((game)=>{
                return(
                    <h1>{game.name}</h1>
            )
            })):'Loading'}
        </div>
    )
}

export default Videogames