import React from 'react';

const Hero = () => {
  return (
    <div className="container hero-wrapper">
      <div className="hero-card">
        {/* Background Overlay is handled in CSS via gradient */}
        
        <div className="hero-content">
          <div className="live-badge">
            <span className="pulse-dot">
              <span className="pulse-ping"></span>
              <span className="pulse-solid"></span>
            </span>
            <span className="live-text">Live Auction</span>
          </div>
          
          <div>
            <h1 className="hero-title">
              Summer Luxury <br /> Watch Collection
            </h1>
            <p className="hero-desc">
              Discover rare vintage timepieces and modern classics. Bidding closes soon on exclusive lots from Patek Philippe, Rolex, and Omega.
            </p>
          </div>
          
          <div className="hero-actions">
            <button className="btn-hero-primary">Start Bidding</button>
            <button className="btn-hero-secondary">View Catalog</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;