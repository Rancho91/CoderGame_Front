import React from "react";
import styles from "./card.module.css"
function Card ({game}){
 const {name, image, description, price, released} = game

    return(
        <div className="row">
        <div className="col-md-4 d-flex align-items-center flex-column">
            <h1 className={styles.title}>{name}</h1>
            <img
            className=" img-fluid rounded"
            src={image}
            alt={name}
          />
          <p>{released}</p>
        </div>
           
          <div className="col-md-8 d-flex align-items-center">
            <p className={styles.description}>{description}</p>
            {/* {description.length > 100
            ? description.slice(0, 100) + " ...For more press!"
            : description} */}
            </div>
        </div>
        )
}

export default Card