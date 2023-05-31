// import React, { useState } from "react";
// import CheckoutForm from "./CheckoutForm";

// function CoinBuyer() {
//   const [input, setInput] = useState(0);
//   const [inputError, setInputError] = useState(true);

//   const handleChange = (e) => {
//     const inputValue = e.target.value;
//     setInput(inputValue);
//     setInputError(inputValue <= 9);
//   };

//   return (
//     <div>
//       <CheckoutForm coins={input} />
//     </div>
//   );
// }

// export default CoinBuyer;


// import React, { useState } from "react";
// import CheckoutForm from "./CheckoutForm";

// function CoinBuyer() {
//   const [input, setInput] = useState(0);
//   const [inputError, setInputError] = useState(true);

//   const handleChange = (e) => {
//     const inputValue = e.target.value;
//     setInput(inputValue);
//     setInputError(inputValue <= 9);
//   };

//   return (
//     <div>
//       <CheckoutForm coins={input} />
//     </div>
//   );
// }

// export default CoinBuyer;

 // CoinBuyer.jsx
// CoinBuyer.jsx
import React, { useState } from "react";
import CheckoutForm from "./CheckoutForm";

function CoinBuyer() {
  const [input, setInput] = useState(0);
  const [inputError, setInputError] = useState(true);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setInput(inputValue);
    setInputError(inputValue <= 9);
  };

  return (
    <div>
      <CheckoutForm coins={input} />
    </div>
  );
}

export default CoinBuyer;
