import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
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

  const getImageForIndex = (index) => {
    // Ensure the index is within the bounds of the images array
    if (index >= 0 && index < images.length) {
      return images[index];
    }
    // Return the first image (image0) if there are more than 10 donors
    return image0;
  };

  useEffect(() => {
    // Fetch supporters from the backend
    const fetchSupporters = async () => {
      try {
        const response = await fetch('http://localhost:5000/top-supporters');
        const data = await response.json();
        setSupporters(data);
      } catch (error) {
        console.error('Error fetching supporters:', error);
      }
    };

    fetchSupporters();
  }, []);

  return (
    <div className="top-supporters">
      <h3>Top Supporters 🎉</h3>
      <ul>
        {supporters.map((supporter, index) => (
          <li key={index} className="supporter-item">
            <img src={getImageForIndex(index)} alt="dp" className="supporter-dp" />
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
