import React from "react";
import axios from "axios"
import { useEffect, useState } from "react";


const Home = () =>{
    const [allVideogames, setAllVideogames] = useState([])


    useEffect(()=>{    
        const videogames = async () => {
            const {data} = await get.axios("http://localhost:3001/videogames")
            console.log(data)
        }

    },[])

    return(
        <div>

        </div>
        )
}