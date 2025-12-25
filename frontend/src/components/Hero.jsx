import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Hero = ({ contract, onBid }) => {
  const [itemData, setItemData] = useState(null);
  const ITEM_ID = "29A-999.99";

  useEffect(() => {
    const fetchHeroItem = async () => {
      if (!contract) return;
      try {
        const details = await contract.getItemDetails(ITEM_ID);
        // details: [beneficiary, auctionEndTime, highestBidder, highestBid, ended]

        const now = BigInt(Math.floor(Date.now() / 1000));
        const endTime = details[1];
        const timeLeft = endTime > now ? endTime - now : 0n;
        const isEnded = details[4] || (timeLeft === 0n);

        setItemData({
          id: ITEM_ID,
          lotNumber: ITEM_ID,
          title: `Biển số: ${ITEM_ID}`,
          description: "Ngũ Cửu mang ý nghĩa may mắn, tài lộc, phát đạt và thịnh vượng",
          highestBid: ethers.formatEther(details[3]),
          highestBidder: details[2],
          rawEndTime: endTime,
          isHot: true,
          isEnded: isEnded
        });
      } catch (error) {
        console.error("Failed to fetch hero item", error);
      }
    };

    fetchHeroItem();
    // Refresh data every 5 seconds
    const interval = setInterval(fetchHeroItem, 5000);
    return () => clearInterval(interval);
  }, [contract]);

  const handleBidClick = () => {
    if (!contract) {
      alert("Vui lòng kết nối ví trước để tham gia đấu giá!");
      return;
    }

    // If data is fetched, use it. If not (fetching or error), fallback to basic info so modal can at least open (though formatting might look empty)
    // Better to wait for data, or pass a placeholder.
    if (itemData) {
      onBid(itemData);
    } else {
      alert("Đang tải dữ liệu phiên đấu giá, vui lòng chờ...");
    }
  };

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
              Biển số xe quận Hoàn Kiếm: {ITEM_ID} <br />
              Ngũ Cửu: May Mắn, Bình An, Tài Lộc, Phát Đạt và Thịnh Vượng
            </p>
          </div>

          <div className="hero-actions">
            <button className="btn-hero-primary" onClick={handleBidClick}>Đấu Giá</button>
            <button className="btn-hero-secondary">Xem Chi Tiết</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;