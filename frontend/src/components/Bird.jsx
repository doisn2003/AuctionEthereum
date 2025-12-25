import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Bird = ({ isOpen, onClose, item, contract }) => {
    const [bidAmount, setBidAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState("");
    const [isEnded, setIsEnded] = useState(false);

    useEffect(() => {
        if (!isOpen || !item || !item.rawEndTime) return;

        const calculateTimeLeft = () => {
            const now = BigInt(Math.floor(Date.now() / 1000));
            // rawEndTime from contract is BigInt
            const totalSeconds = BigInt(item.rawEndTime) - now;

            if (totalSeconds <= 0n) {
                setTimeLeft("Đã kết thúc");
                setIsEnded(true);
                return;
            }

            const days = Number(totalSeconds / 86400n);
            const hours = Number((totalSeconds % 86400n) / 3600n);
            const minutes = Number((totalSeconds % 3600n) / 60n);
            const seconds = Number(totalSeconds % 60n);

            let timeString = "";
            if (days > 0) timeString += `${days}d `;
            if (hours > 0 || days > 0) timeString += `${hours}h `;
            timeString += `${minutes}m ${seconds}s`;

            setTimeLeft(timeString);
            setIsEnded(false);
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [isOpen, item]);

    if (!isOpen || !item) return null;

    const handleBid = async () => {
        if (!contract) return alert("Vui lòng kết nối ví trước!");
        if (!bidAmount) return alert("Vui lòng nhập số tiền!");
        if (isEnded) return alert("Phiên đấu giá đã kết thúc!");

        try {
            setLoading(true);
            const tx = await contract.bid(item.id, { value: ethers.parseEther(bidAmount) });
            await tx.wait();
            alert("Đấu giá thành công!");
            onClose();
            setBidAmount("");
        } catch (error) {
            console.error(error);
            // Try to extract reason
            let msg = error.reason || error.message;
            if (msg.includes("BidNotHighEnough")) msg = "Giá đặt phải cao hơn giá hiện tại!";
            if (msg.includes("AuctionAlreadyEnded")) msg = "Phiên đấu giá đã kết thúc!";
            alert("Đấu giá thất bại: " + msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
            backdropFilter: 'blur(4px)'
        }} onClick={onClose}>
            <div
                className="auction-card"
                style={{ width: '400px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'white', transform: 'none' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6', paddingBottom: '1rem' }}>
                    <h2 className="card-title" style={{ fontSize: '1.25rem', margin: 0 }}>Đấu giá vật phẩm</h2>
                    <button onClick={onClose} style={{ fontSize: '1.5rem', lineHeight: 1, color: '#9ca3af', padding: '0.5rem' }}>&times;</button>
                </div>

                <div>
                    <div className="lot-number" style={{ marginBottom: '0.5rem' }}>{item.id.includes('-') ? 'BIỂN SỐ XE' : 'SỐ ĐIỆN THOẠI'}</div>
                    <h3 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.id}</h3>

                    {/* Countdown Timer Display */}
                    <div style={{
                        background: isEnded ? '#fee2e2' : '#dbeafe',
                        color: isEnded ? '#dc2626' : '#2563eb',
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        marginBottom: '1rem',
                        border: `1px solid ${isEnded ? '#fca5a5' : '#93c5fd'}`
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px', verticalAlign: 'text-bottom', marginRight: '4px' }}>timer</span>
                        {timeLeft || "Đang tải..."}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: '#f9fafb', padding: '1rem', borderRadius: '0.5rem' }}>
                        <div>
                            <div className="current-bid-label">Giá hiện tại</div>
                            <div className="current-bid-value" style={{ color: '#dc2626' }}>{item.highestBid} ETH</div>
                        </div>
                        <div>
                            <div className="current-bid-label">Người giữ giá</div>
                            <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                                {item.highestBidder === ethers.ZeroAddress ? 'Chưa có' : `${item.highestBidder.slice(0, 4)}...${item.highestBidder.slice(-4)}`}
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#374151' }}>Giá đấu của bạn (ETH)</label>
                    <input
                        type="number"
                        step="0.0001"
                        className="search-input"
                        style={{ border: '2px solid #e5e7eb', height: '48px', fontSize: '1rem' }}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        placeholder="Nhập số tiền..."
                        autoFocus
                        disabled={isEnded}
                    />
                    <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>* Phải lớn hơn giá hiện tại</p>
                </div>

                <button
                    className="btn-hero-primary"
                    onClick={handleBid}
                    disabled={loading || isEnded}
                    style={{ width: '100%', marginTop: '0.5rem', opacity: (loading || isEnded) ? 0.7 : 1, cursor: (loading || isEnded) ? 'not-allowed' : 'pointer' }}
                >
                    {isEnded ? "Đã kết thúc" : (loading ? "Đang xử lý..." : "Xác nhận đặt giá")}
                </button>
            </div>
        </div>
    );
};

export default Bird;
