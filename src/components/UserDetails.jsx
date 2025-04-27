import React, { useState, useEffect } from 'react';
import dp from '../assets/dp.jpg';

const UserDetails = () => {
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch the total amount from the backend
  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await fetch('http://localhost:5000/total-amount'); // Ensure this is correct
        const data = await response.json();
        if (data.totalAmount !== undefined) {
          setTotalAmount(data.totalAmount); // Assuming response contains the total amount
        }
      } catch (error) {
        console.error('Error fetching total amount:', error);
      }
    };

    fetchTotalAmount();
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="user-details">
      <img src={dp} alt="Profile" />
      <h2>@avdhesh_kumar</h2>
      <p>Let's help avdhesh_kumar get a chai! ☕</p>
      <p>{/* Example: 10 Payments - ₹0 raised */}</p>
      <p>{/* You can also display how many donations received dynamically */}</p>
      {/* <p>{`Total Raised: ₹${totalAmount}`}</p> */}
    </div>
  );
};

export default UserDetails;
