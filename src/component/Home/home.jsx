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
        <div className="container">
            <p />
            <SubNavBar />
            <p />
            <div className="col-12 d-flex justify-content-center">
                <Slider image={arrSlader}/>        
            </div>
            
        </div>
        )
}

export default Home