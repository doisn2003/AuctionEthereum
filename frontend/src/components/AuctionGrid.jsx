import React, { useEffect, useState } from 'react';
import AuctionCard from './AuctionCard';
import { ethers } from 'ethers';

const AuctionGrid = ({ contract, onBid }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      if (!contract) return;
      setLoading(true);
      try {
        const itemIds = await contract.getAllItems();

        // Limit to 20 recent items if too many? For now just fetch all.
        const fetchedItems = await Promise.all(itemIds.map(async (id) => {
          const details = await contract.getItemDetails(id);
          // details: [beneficiary, auctionEndTime, highestBidder, highestBid, ended]

          const now = BigInt(Math.floor(Date.now() / 1000));
          const endTime = details[1]; // uint
          const timeLeft = endTime > now ? endTime - now : 0n;

          let timeString = "Đã kết thúc";
          let isHot = false;
          let isEnded = details[4] || (timeLeft === 0n);

          if (!isEnded) {
            if (timeLeft < 3600n) { // < 1 hour
              timeString = `${Number(timeLeft) / 60 | 0} phút`;
              isHot = true;
            } else if (timeLeft < 86400n) { // < 1 day
              timeString = `${Number(timeLeft) / 3600 | 0} giờ`;
            } else {
              timeString = `${Number(timeLeft) / 86400 | 0} ngày`;
            }
          }

          // Determine image/type based on ID formatting
          let imageUrl = "https://via.placeholder.com/400x300?text=Item";
          let description = "Vật phẩm đấu giá";

          // Logic heuristic:
          // Phone number: usually starts with 0 and has 10 digits
          // License plate: 29A-123.45 format
          if (id.includes("-") || id.includes(".")) {
            description = "Biển số xe cực đẹp, mang lại tài lộc, bình an cho chủ sở hữu.";
            imageUrl = "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=400";
          } else if (/^\d+$/.test(id) && id.length > 8) {
            description = "Sim số đẹp, khẳng định đẳng cấp, dễ nhớ, may mắn.";
            imageUrl = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400";
          }

          return {
            id: id,
            lotNumber: id,
            title: id.includes("-") ? `Biển số: ${id}` : `Sim: ${id}`,
            description: description,
            imageUrl: imageUrl,
            currentBid: ethers.formatEther(details[3]),
            highestBid: ethers.formatEther(details[3]),
            highestBidder: details[2],
            endTime: timeString,
            rawEndTime: endTime,
            isHot: isHot,
            isEnded: isEnded
          };
        }));

        setItems(fetchedItems);
      } catch (error) {
        console.error("Failed to fetch items", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();

    // Poll updates
    const interval = setInterval(fetchItems, 5000);
    return () => clearInterval(interval);
  }, [contract]);

  if (!contract) {
    return (
      <div className="container grid-wrapper" style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
        <h3>Vui lòng kết nối ví để xem danh sách đấu giá</h3>
      </div>
    );
  }

  return (
    <div className="container grid-wrapper">
      <div className="auction-grid">
        {items.map(item => (
          <AuctionCard key={item.id} item={item} onBid={() => onBid(item)} />
        ))}
        {items.length === 0 && !loading && (
          <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>Chưa có vật phẩm đấu giá nào.</p>
        )}
      </div>
    </div>
  );
};

export default AuctionGrid;