import React, { useState, useEffect } from 'react';
import './Home.css';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: 'images/carousel1.jpg',
      title: 'Stylish Furniture',
      description: 'Discover the best selection of stylish furniture for your home.',
    },
    {
      image: 'images/carousel2.jpg',
      title: 'Comfortable Seating',
      description: 'Experience unmatched comfort with our seating options.',
    },
    {
      image: 'images/carousel3.jpg',
      title: 'Elegant Designs',
      description: 'Transform your space with our elegant designs.',
    },
  ];

  // Automatically change slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="mb-5 relative overflow-hidden">
      {/* Welcome Section */}
      <div className="welcome-content">
        <h1>Welcome to Comfy Living!</h1>
        <p>Your one-stop destination for stylish and comfortable furniture.</p>
      </div>

      {/* Carousel Section */}
      <div className="carousel">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="carousel-caption">
              <h5>{slide.title}</h5>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
