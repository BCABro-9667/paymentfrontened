import React, { useState } from "react";

const PaymentForm = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false); // <-- added

  const handlePayment = async () => {
    if (!name || !amount) {
      alert("Please fill Name and Amount fields.");
      return;
    }

    const transactionId = "TID" + Date.now();
    const MUID = "MUID" + Date.now();

    try {
      setLoading(true); // Start spinner

      const response = await fetch("https://paymentint.onrender.com/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionId,
          MUID,
          name,
          amount,
          message,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.success && data.data.instrumentResponse.redirectInfo.url) {
        window.location.href = data.data.instrumentResponse.redirectInfo.url;
      } else {
        alert("Payment Initialization Failed");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="payment-form">
      {loading ? (
        <div className="payment-loading">
          <div className="spinner"></div>
          <p>We are securely redirecting you to the payment gateway...</p>
        </div>
      ) : (
        <>
          <h3 className="heading">Donate Now 💳</h3>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={handlePayment}>Pay ₹ {amount}</button>

          <div className="quick-pay-buttons">
            {[1, 10, 20, 30].map((amt, index) => (
              <button
                key={amt}
                onClick={() => setAmount(amt)}
                className={amt === 10 ? "pay-10-button" : ""} // Apply class for ₹10 button
              >
                {index === 0 && "🙂"}
                {index === 1 && "😊"}
                {index === 2 && "😄"}
                {index === 3 && "😍"}
                Pay ₹{amt} 
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentForm;
