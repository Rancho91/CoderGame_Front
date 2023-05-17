import React from "react";
import styles from "./card.module.css"
function Card ({game}){
 const {name, image, description, price, released} = game

    return(
        <div className="row">
        <div className="col-md-4 d-flex align-items-center">
            <h1 className={styles.tittle}>{name}</h1>
            <img
            className="rounded"
            src={image}
            alt={name}
            width="150px"
            height="85px"
          />
          <p>{released}</p>
        </div>
           
          <div className="col-md-8 d-flex align-items-center">
            <p>Description:</p>
            {description.length > 100
            ? description.slice(0, 100) + " ...For more press!"
            : description}
            </div>
        </div>
        )
}

export default Card