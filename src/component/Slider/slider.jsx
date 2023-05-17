import React from "react";
import { useState } from "react";
import styles from './slider.module.css'

const Slider = ({image}) =>{
    const [number, setNumber] = useState(1)
    const handlerButtons =(event)=>{
        if(event.target.name==='next'){
            if(number===image.length-1){
                setNumber(0)
            } else setNumber(number+1)
        }
        if(event.target.name==='last'){
            if(number===0){
                setNumber(4)
            }else setNumber(number-1)
        }
    }
 
    return (
            <section className={styles.sliderImage} >
                {image?.map((i)=>{
                    return(
                        <img src={i.image} alt="" />
                )
                })}
            </section>

        //   <div
        //     style={{ backgroundImage: `url(${image[number]?.image})` }}
        //     className={`${styles.sliderImage}`}
        //   >
        //     <button name='last' onClick={handlerButtons}> {'<'} </button>
        //     <button name='next' onClick={handlerButtons}> {'>'} </button>
        //   </div>
      );
    };


export default Slider