import React from "react";
import { useState } from "react";
import styles from './slider.module.css'

const Slider = ({image}) =>{
    const [number, setNumber] = useState(1)
    
 
    return (
            <section className={styles.sliderImage} >
                {image?.map((i)=>{
                    return(
                        <div className={styles.imageSlider} style={{ backgroundImage: `url(${i.image})` }}>
                        <div>
                        <p>{i.price}</p>
                        </div>
                        <div> 
                            <h1>{i.title}</h1>
                        </div>
                        </div>
                )
                })}
            </section>
      );
    };


export default Slider