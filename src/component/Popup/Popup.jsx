import React from "react";
import styles from './Popup.module.css';

const Popup = ({ isOpen, handleClose, imgSrc }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.popupBackground}>
      <div className={styles.popupContent}>
        <h2>🎉 ¡Bienvenido a CoderGame! 🎉</h2>
        <p>Originado en el Bootcamp de Henry, estamos emocionados de presentarte nuestro frontend totalmente renovado.</p>
        <p>Descubre este dinámico mercado de videojuegos y únete a nosotros en esta emocionante travesía como desarrolladores FullStack.</p>
        <p>¡Suscríbete para estar al día con nuestras innovaciones y futuros desarrollos!</p>
        <form className={styles.subscribeForm}>
          <input 
            type="email" 
            placeholder="Tu correo electrónico"
            className={styles.subscribeInput}
          />
          <button className={styles.subscribeButton}>¡Suscribirme!</button>
        </form>
        <button className={styles.popupCloseButton} onClick={handleClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default Popup;
