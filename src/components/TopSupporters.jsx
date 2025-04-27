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

const TopSupporters = () => {
  const [supporters, setSupporters] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false); // <--- NEW state

  const getImageForIndex = (index) => {
    if (index >= 0 && index < images.length) {
      return images[index];
    }
    return image0;
  };

  useEffect(() => {
    // Fetch supporters from the backend
    const fetchSupporters = async () => {
      try {
        const response = await fetch('http://localhost:5000/top-supporters'); // <-- fixed port here
        const data = await response.json();
        setSupporters(data);
      } catch (error) {
        console.error('Error fetching supporters:', error);
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
      }, 5000);
    }
  }, []);

  return (
    <div className="top-supporters">
      {showConfetti && <Confetti />} {/* Show confetti */}
      
      <h3 className="heading">Top Supporters 🎉</h3>
      <ul>
        {supporters.map((supporter, index) => (
          <li key={index} className="supporter-item">
            <img src={getImageForIndex(supporter.imageIndex)} alt="dp" className="supporter-dp" />
            <span>
              {supporter.name} donated ₹{supporter.amount} with a message "{supporter.message}"
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSupporters;
