import React from "react";
import axios from "axios"
import Slider from "../Slider/slider"
import { useEffect, useState } from "react";
import imagenSlader from "./helper/imagenSlader";
import SubNavBar from "../SubNavBar/SubNavBar";
import Card from "../card/card"
import styles from './home.module.css'

const Home = () =>{
    const [arrSlader, setArrSlader] = useState([])
    const [arrGamesFooter, setArrGameFooter] = useState([])

    useEffect(()=>{    
        const videogames = async () => {
            const response = await axios.get("http://localhost:3001/videogames")
            return response.data
        }
        videogames().then((response)=>{
            console.log(response)
            const sliderImage= imagenSlader(response.Videogames,5)
            setArrSlader(sliderImage)
            const imageFooter = imagenSlader(response.Videogames,2)
            setArrGameFooter(imageFooter)
        })
    },[])

    
    return(
        <div className={`container ${styles.home}`}>
            {/* <p />
            <SubNavBar />
            <p /> */}
            <div className="col-12 d-flex justify-content-center">
                <Slider image={arrSlader}/>        
            </div>
            <div className={`row d-flex justify-content-center ${styles.cardFooter}`}>
                    {arrGamesFooter?.map((game) => (
                    <div className={`col-md-5 col-sm-6${styles.card}`}>
                        <Card game={game} />
                    </div>  ))}
    </div>
</div>
 
        )
}

export default Home