import React, { useState, useEffect } from 'react';
import styles from "./carousel.module.css";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    'https://res.cloudinary.com/dnkaxvkr9/image/upload/v1686060579/lyhyzkvdovptmizpvrtm.png',
    'https://res.cloudinary.com/dnkaxvkr9/image/upload/v1686060565/zjjo0pw4we6kdnheg6g8.png',
    'https://res.cloudinary.com/dnkaxvkr9/image/upload/v1686090081/xei361pmgikgj25hnqdr.png',
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const selectSlide = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    
  <div className={styles.carousel}>
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div
            className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
            key={index}
          >
            <img src={image} className="d-block w-100" alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="carousel-footer">
        <div className="carousel-selector">
          {images.map((_, index) => (
            <div
              className={`selector-dot ${index === activeIndex ? 'active' : ''}`}
              key={index}
              onClick={() => selectSlide(index)}
            ></div>
          ))}
        </div>
      </div>
      <button className="carousel-control-prev" onClick={prevSlide}>
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" onClick={nextSlide}>
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
