import React from "react";
import { useState } from "react";
import styles from './slider.module.css';

const Slider = ({ image }) => {

    console.log(image)
  return (
    <section className={styles.sliderImage}>
      {image?.map((i) => {
        return (
          <div
            className={` ${styles.imageSlider}`}
            style={{ backgroundImage: `url(${i.image})` }}
          >
              <div className='col-1'>
                <p>{i.price}</p>
              </div>
         
            <div>
              <h1>{i.name}</h1>
            </div>
          </div>
        );
      })}
    </section>
  );
};


export default Slider