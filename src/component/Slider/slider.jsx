import React from "react";
import { useState } from "react";


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
    return(
        <div style={{
            backgroundImage: `url(${image[number]?.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '400px',
            height: '300px',
          }}>
            lala
            <button name='last' onClick={handlerButtons}> {'<'} </button>
           <button name='next' onClick={handlerButtons}> {'>'} </button> 
        </div>
    )
}

export default Slider