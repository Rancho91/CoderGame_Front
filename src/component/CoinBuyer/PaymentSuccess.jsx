import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const status = urlParams.get('status');
    if (isAuthenticated && status === 'approved') {
      const userInput = localStorage.getItem("userInput"); // Recupera el valor desde localStorage

      const userId = user && user.sub;

      if (!userId) {
        console.error('User ID not found');
        return;
      }

      fetch('http://localhost:3001/payment/cargacoins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: { sub: userId },
          input: userInput, // Utiliza userInput en lugar de input
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
          }
          navigate('/profile'); // Utilizar el método navigate para redirigir
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [navigate, location, isAuthenticated, user]);

  return (
    <div>Payment confirmed. Redirecting...</div>
  );
}

export default PaymentSuccess;
