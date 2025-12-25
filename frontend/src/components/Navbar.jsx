import React from 'react';

const Navbar = ({ account, connectWallet }) => {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="logo-section">
          <a href="#" className="brand">
            <div className="brand-icon">
              <svg
                className="w-full h-full"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="brand-name">ĐẤU GIÁ SỐ ĐẸP</h2>
          </a>

          <nav className="nav-links">
            <a href="#" className="nav-link">Đấu giá</a>
            <a href="#" className="nav-link">Đăng ký vật phẩm</a>
            <a href="#" className="nav-link">Về chúng tôi</a>
            <a href="#" className="nav-link">Cộng đồng</a>
            <a href="#" className="nav-link">Hỗ trợ</a>
          </nav>
        </div>

        <div className="nav-actions">
          <div className="search-bar">
            <span className="material-symbols-outlined search-icon">
              search
            </span>
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm vật phẩm..."
            />
          </div>
          {account ? (
            <button className="btn-primary" style={{ backgroundColor: '#10b981', cursor: 'default' }}>
              {account.slice(0, 6)}...{account.slice(-4)}
            </button>
          ) : (
            <button className="btn-primary" onClick={connectWallet}>
              Đăng nhập ví Web3
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
