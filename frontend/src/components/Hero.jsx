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
            <span className="live-text">Đang hot</span>
          </div>
          
          <div>
            <h1 className="hero-title">
              Cục Đăng Kiểm <br /> Việt Nam
            </h1>
            <p className="hero-desc">
              Biển số xe quận Hoàn Kiếm: 29A-999.99 <br/>
              Ngũ Cửu mang ý nghĩa may mắn, tài lộc, phát đạt và thịnh vượng
            </p>
          </div>
          
          <div className="hero-actions">
            <button className="btn-hero-primary">Đấu Giá</button>
            <button className="btn-hero-secondary">Xem Chi Tiết</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;