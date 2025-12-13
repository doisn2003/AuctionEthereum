import React, { useState, useEffect } from 'react';

const DealDay = () => {
  const [time, setTime] = useState({
    hours: 3,
    mins: 36,
    secs: 36
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => {
        let { hours, mins, secs } = prevTime;

        // Giảm giây
        if (secs > 0) {
          secs--;
        } else if (mins > 0) {
          // Khi hết giây, giảm phút
          mins--;
          secs = 59;
        } else if (hours > 0) {
          // Khi hết phút, giảm giờ
          hours--;
          mins = 59;
          secs = 59;
        } else {
          // Khi hết tất cả, đếm lại từ đầu
          hours = 3;
          mins = 36;
          secs = 36;
        }

        return { hours, mins, secs };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format số thành 2 chữ số
  const formatTime = (num) => String(num).padStart(2, '0');

  return (
    <div className="container deal-section">
      <div className="deal-card">
        <div className="deal-info">
          <h3 className="deal-label">Deal of the Day</h3>
          <h2 className="deal-title">1969 Speedmaster Professional</h2>
          <p className="deal-subtitle">Rare "Moonwatch" variant with original box and papers.</p>
        </div>

        <div className="deal-timer-container">
          <div className="timer-group">
            <div className="timer-block">
              <div className="timer-box">
                <span className="timer-value">{formatTime(time.hours)}</span>
              </div>
              <span className="timer-label">Hours</span>
            </div>
            <div className="timer-block">
              <div className="timer-box">
                <span className="timer-value">{formatTime(time.mins)}</span>
              </div>
              <span className="timer-label">Mins</span>
            </div>
            <div className="timer-block">
              <div className="timer-box">
                <span className="timer-value">{formatTime(time.secs)}</span>
              </div>
              <span className="timer-label">Secs</span>
            </div>
          </div>
          
          <div className="deal-divider"></div>

          <div className="deal-price-block">
            <p className="price-label">Current Bid</p>
            <p className="price-value">$12,450</p>
            <a href="#" className="bid-link">Place Bid →</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealDay;