import React, { useState } from "react";
import { api } from '../../App'
import styles from "./CoinBuyer.module.css"
function CheckoutForm({ coins }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    localStorage.setItem("userInput", inputValue); 

    try {
      const response = await fetch("http://localhost:3001/payment/loadbalance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          coins: parseFloat(inputValue),
            inputValue: parseFloat(inputValue), 

        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const result = await response.json();
      const initPoint = result.initPoint;
    //   window.open(initPoint, "_blank");
        window.location.href = initPoint;
      setIsProcessing(false);
    } catch (error) {
      console.error("Error:", error);
      setMessage("An unexpected error occurred.");
      setIsProcessing(false);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
       <p className={styles.title}>Cargar Coins:</p>
       <div className="row justify-content-center mx-3">
    <div className="col-8">
      <input className={styles.input} type="number" value={inputValue} onChange={handleChange} />
    </div>
    <div className="col-4">
        <button disabled={isProcessing} id="submit" className={styles.button}>
          <span id="button-text">
            {isProcessing ? "Processing..." : "Pay now"}
          </span>
        </button>
    </div>
      
      

 </div>
        
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

export default CheckoutForm;
