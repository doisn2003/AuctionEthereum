import React from 'react';



const AuctionCard = ({ item, onBid }) => {
  return (
    <div className="auction-card">
      <div className="card-image-wrapper">
        <img src={item.imageUrl} alt={item.title} className="card-image" />

        <button className="card-like-btn">
          <span className="material-symbols-outlined">favorite</span>
        </button>

        <div className={`card-status-badge ${item.isHot ? 'status-hot' : 'status-timer'}`}>
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
            {item.isHot ? 'local_fire_department' : 'timer'}
          </span>
          {item.isHot ? 'Đang Hot' : item.endTime}
        </div>
      </div>

      <div className="card-content">
        <div>
          <p className="lot-number">Mã số: {item.lotNumber}</p>
          <h3 className="card-title">{item.title}</h3>
          <p className="card-desc">{item.description}</p>
        </div>

        <div className="card-divider"></div>

        <div className="card-footer">
          <div>
            <p className="current-bid-label">Giá hiện tại</p>
            <p className="current-bid-value">
              {item.currentBid} ETH
            </p>
          </div>
          <button className="btn-bid" onClick={onBid}>Đấu giá ngay</button>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;