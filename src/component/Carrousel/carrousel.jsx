import React from "react";
import { useState } from "react";
import imageCSS from './imagecss'


const carrousel = (images) =>{
    const [number, setNumber] = useState(1)
    const allImageNumber = images.length

    return(
        <div styles={imageCSS}>
           <button name='last'> {'<'} </button>
           <button name='next'> {'>'} </button>
        </div>
    )
}