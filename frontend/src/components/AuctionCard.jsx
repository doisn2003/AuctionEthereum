import React from 'react';



const AuctionCard = ({ item }) => {
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
          {item.isHot ? 'Hot' : item.endTime}
        </div>
      </div>
      
      <div className="card-content">
        <div>
            <p className="lot-number">Lot #{item.lotNumber}</p>
            <h3 className="card-title">{item.title}</h3>
            <p className="card-desc">{item.description}</p>
        </div>
        
        <div className="card-divider"></div>
        
        <div className="card-footer">
          <div>
            <p className="current-bid-label">Current Bid</p>
            <p className="current-bid-value">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(item.currentBid)}
            </p>
          </div>
          <button className="btn-bid">Bid Now</button>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;