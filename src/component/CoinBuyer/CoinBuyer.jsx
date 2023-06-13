import React, { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import styles from "./CoinBuyer.module.css"
function CoinBuyer() {
  const [input, setInput] = useState(0);
  const [inputError, setInputError] = useState(true);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setInput(inputValue);
    setInputError(inputValue <= 9);
  };

  return (
    <div className={styles.container}>
      <CheckoutForm coins={input} />
    </div>
  );
}

export default CoinBuyer;
