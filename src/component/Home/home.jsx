import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import imagenSlader from "./helper/imagenSlader";
import Card from "../card/card";
import styles from "./home.module.css";
import Carousel from "../Carousel/Carousel";
import { api } from "../../App";
import ImageAccGame from "../ImageAccGame/ImageAccGame"

const Home = () => {
  const [arrSlader, setArrSlader] = useState([]);
  const [arrGamesFooter, setArrGameFooter] = useState([]);

  useEffect(() => {
    const videogames = async () => {
      const response = await api.get("videogames");
      return response.data;
    };
    videogames().then((response) => {
      console.log(response);
      const sliderImage = imagenSlader(response.Videogames, 5);
      setArrSlader(sliderImage);
      const imageFooter = imagenSlader(response.Videogames, 2);
      setArrGameFooter(imageFooter);
    });
  }, []);

  return (
    <div className={`container ${styles.home}`}>
      <div> <Carousel /> </div>
        
      <div> <ImageAccGame /> </div>

      <div className={`row d-flex justify-content-center cardInner ${styles.cardInner}`}>
        {arrGamesFooter?.map((game) => (
            <div className={`col-md-5 col-6 ${styles.card}`}>
            <Card game={game} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
