// components/Background.js
import React, { useState, useEffect } from 'react';

const Background = () => {
  const [index, setIndex] = useState(0);
  const images = [
    'https://images4.alphacoders.com/104/1049330.jpg',
    'https://images6.alphacoders.com/121/1216721.jpg',
    'https://images2.alphacoders.com/100/1007550.jpg',
    'https://images.alphacoders.com/101/1011679.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => (index + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${images[index]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw', // Cambia a 100vw para ocupar todo el ancho de la ventana
        height: '100vh', // Cambia a 100vh para ocupar todo el alto de la ventana
        position: 'fixed',
        zIndex: '-1',
      }}
    />
  );
};

export default Background;

