import React from "react";
import axios from "axios"
import Slider from "../Slider/slider"
import { useEffect, useState } from "react";
import imagenSlader from "./helper/imagenSlader";


const Home = () =>{
    const [arrSlader, setArrSlader] = useState([])

    useEffect(()=>{    
        const videogames = async () => {
            const response = await axios.get("http://localhost:3001/videogames")
            return response.data
        }
        videogames().then((response)=>{
            const sliderImage= imagenSlader(response)
            setArrSlader(sliderImage)
        })
    },[])

    return(
        <div>
            <Slider image={arrSlader}/>
        </div>
        )
}

export default Home