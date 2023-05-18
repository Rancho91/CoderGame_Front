import React from "react";
import styles from "./card.module.css"
function Card ({game}){
 const {name, image, description, price, released} = game

    return(
      <div className={`col-md-3 text-center ${styles.container}`}>
      <div className={`row ${styles.title}`}>
        <div className="col-12">
          <h1>{name}</h1>
        </div>
      </div>
    
      <div  className={`row ${styles.image}`} style={{ backgroundImage: `url(${image})` }} >
      </div>
    
      <div className="row">
        <div className="col-12 d-flex align-items-center flex-column">
          <p className={styles.description}>{released}</p>
        </div>
      </div>
    
      <div className="row">
        <div className="col-12 d-flex align-items-center">
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    
      <div className="row">
        <div className={`col-6 ${styles.price}`}>
          <p>{price}</p>
        </div>
        <div className="col-6">
          <button>Buy</button>
        </div>
      </div>
    </div>
    
        )
}

export default Card