import React from "react";
import styles from './Popup.module.css';

const Popup = ({ isOpen, handleClose, imgSrc }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.popupBackground}>
      <div className={styles.popupContent}>
        <img src={"https://res.cloudinary.com/dnkaxvkr9/image/upload/v1685121914/bnkj1unuv5s7t0hoot0l.jpg"} alt="" />
        <button className={styles.popupCloseButton} onClick={handleClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default Popup;
