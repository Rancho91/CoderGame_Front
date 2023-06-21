import React from 'react';
import styles from "./imageaccgame.module.css"

const ImageAccGame = () => {
  const images = [
    'https://res.cloudinary.com/dnkaxvkr9/image/upload/v1687377284/xjm07s1m6o27it9pgniu.jpg',
    'https://res.cloudinary.com/dnkaxvkr9/image/upload/v1687377798/blb7upc0egyni6se88c6.jpg',
    'https://res.cloudinary.com/dnkaxvkr9/image/upload/v1687378341/xwtccvn1ybcbylmt7fnc.jpg',
    'https://res.cloudinary.com/dnkaxvkr9/image/upload/v1687378666/ugny7ehkfrnjawzi7dyu.jpg',
  ];

  return (
    <div className={styles.grid}>
      {images.map((image, index) => (
        <div key={index} className={styles.gridItem}>
          <img src={image} alt={`Imagen ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default ImageAccGame;
