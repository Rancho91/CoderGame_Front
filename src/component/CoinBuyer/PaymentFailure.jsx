import React from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentFailure() {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/profile');  // Redirigir a /profile en lugar de /checkout
  };

  return (
    <div>
      <h1>Payment Failed</h1>
      <p>Something went wrong with your payment. Please try again.</p>
      <button onClick={handleRetry}>Try Again</button>
    </div>
  );
}

export default PaymentFailure;
