import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Confetti from 'react-confetti'; // <-- import confetti
import 'react-toastify/dist/ReactToastify.css';

import image1 from '../assets/Illustration_iocns/1.png';
import image2 from '../assets/Illustration_iocns/2.png';
import image3 from '../assets/Illustration_iocns/3.png';
import image4 from '../assets/Illustration_iocns/4.png';
import image5 from '../assets/Illustration_iocns/5.png';
import image6 from '../assets/Illustration_iocns/6.png';
import image7 from '../assets/Illustration_iocns/7.png';
import image8 from '../assets/Illustration_iocns/8.png';
import image9 from '../assets/Illustration_iocns/9.png';
import image0 from '../assets/Illustration_iocns/0.png';

const images = [image0, image1, image2, image3, image4, image5, image6, image7, image8, image9];

// Function to generate random color
const getRandomColor = () => {
  const colors = ['#FF6347', '#3CB371', '#FFD700', '#8A2BE2', '#00CED1', '#FF1493', '#00BFFF', '#F4A300', '#32CD32'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const TopSupporters = () => {
  const [supporters, setSupporters] = useState([]);
  const [loading, setLoading] = useState(true); // New state for loading
  const [showConfetti, setShowConfetti] = useState(false); // <--- NEW state

  const getRandomImage = () => {
    // Get a random index from the images array
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  useEffect(() => {
    // Fetch supporters from the backend
    const fetchSupporters = async () => {
      try {
        const response = await fetch('https://paymentint.onrender.com/top-supporters'); // <-- fixed port here
        const data = await response.json();
        setSupporters(data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching supporters:', error);
        setLoading(false); // Ensure loading is set to false in case of error
      }
    };

    fetchSupporters();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');

    if (name) {
      toast.success('Payment Successful! 🎉');
      setShowConfetti(true);

      // Automatically stop confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 4000);
    }
  }, []);

  return (
    <div className="top-supporters">
      {showConfetti && (
        <Confetti 
          gravity={0.5} 
          wind={0.01} 
          numberOfPieces={400} 
        />
      )}

      <h3 className="heading">Top Supporters 🎉</h3>
      
      {/* Spinner while loading */}
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <ul>
          {supporters.map((supporter, index) => (
            <li key={index} className="supporter-item">
              <img src={getRandomImage()} alt="Supporter's DP" className="supporter-dp" />
              <span>
                <span style={{ color: getRandomColor() }}>{supporter.name}</span> donated ₹
                <span>{supporter.amount}</span> with a message: "
                <span >{supporter.message}</span>"
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopSupporters;
