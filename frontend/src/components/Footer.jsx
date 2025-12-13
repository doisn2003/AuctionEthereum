import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand">
              <div className="brand-icon">
                <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
              </div>
              <h2>ĐẤU GIÁ SỐ ĐẸP</h2>
            </div>
            <p className="footer-desc">
              Nền tảng đấu giá số đẹp hàng đầu Việt Nam. Chuyên đấu giá các sản phẩm số đẹp như sim số đẹp, biển số xe đẹp, tên miền số đẹp và nhiều hơn nữa. 
            </p>
          </div>

          <div className="footer-section">
            <h3>Khám phá</h3>
            <div className="footer-links">
              <a href="#">Phiên đấu trực tiếp</a>
              <a href="#">Phiên sắp diễn ra</a>
              <a href="#">Phiên đã kết thúc</a>
              <a href="#">Bán số đẹp</a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Hỗ trợ</h3>
            <div className="footer-links">
              <a href="#">Trung tâm trợ giúp</a>
              <a href="#">Hướng dẫn mua hàng</a>
              <a href="#">Thông tin vận chuyển</a>
              <a href="#">Liên hệ chúng tôi</a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Đăng ký</h3>
            <p className="footer-desc" style={{ marginTop: 0, marginBottom: '0.5rem' }}>
              Đăng ký nhận bản tin để cập nhật các phiên đấu giá mới nhất và ưu đãi đặc biệt.
            </p>
            <div className="newsletter-input-group">
              <input type="email" className="newsletter-input" placeholder="Nhập email của bạn..." />
              <button className="btn-newsletter">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© 2025 Đấu giá số đẹp | Power by Hardhat | Developed by Doisn2003</p>
          <div className="legal-links">
            <a href="#">hardhat.org</a>
            <a href="#">github.com/doisn2003</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;