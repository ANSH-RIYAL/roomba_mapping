
import React from 'react';
import '../styles/hero.css';

const Hero = ({ title, subtitle, onChatClick, onStoreClick }) => {
  return (
    <section className="hero">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <button className="cta-btn" onClick={onChatClick}>
        <i className="fas fa-comments"></i>
        Try Smart Shopping Assistant
      </button>
      <br />
      <button className="cta-btn" onClick={onStoreClick}>
        <i className="fas fa-map-marker-alt"></i>
        Find all the stores
      </button>
    </section>
  );
};

export default Hero;
