import React from "react";
import axios from "axios"
import Slider from "../Slider/slider"
import { useEffect, useState } from "react";
import imagenSlader from "./helper/imagenSlader";
import SubNavBar from "../SubNavBar/SubNavBar";


const Home = () =>{
    const [arrSlader, setArrSlader] = useState([])

    useEffect(()=>{    
        const videogames = async () => {
            const response = await axios.get("http://localhost:3001/videogames")
            return response.data
        }
        videogames().then((response)=>{
            const sliderImage= imagenSlader(response.Videogames)
            setArrSlader(sliderImage)
        })
    },[])

    return(
        <div>
            <p />
            <SubNavBar />
            <p />
            <Slider image={arrSlader}/>
        </div>
        )
}

export default Home