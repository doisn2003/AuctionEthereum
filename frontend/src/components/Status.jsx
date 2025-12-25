import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Status = ({ account, contract, provider, connectWallet }) => {
  const [balance, setBalance] = useState("0");
  const [pendingReturn, setPendingReturn] = useState("0");

  useEffect(() => {
    const fetchArgs = async () => {
      if (account && provider && contract) {
        try {
          const bal = await provider.getBalance(account);
          setBalance(ethers.formatEther(bal));

          const pending = await contract.pendingReturns(account);
          setPendingReturn(ethers.formatEther(pending));
        } catch (e) {
          console.error("Error fetching status:", e);
        }
      }
    };
    fetchArgs();
    const interval = setInterval(fetchArgs, 5000);
    return () => clearInterval(interval);
  }, [account, provider, contract]);

  const handleWithdraw = async () => {
    if (!contract) return;
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      alert("Rút tiền thành công!");
      const pending = await contract.pendingReturns(account);
      setPendingReturn(ethers.formatEther(pending));
    } catch (e) {
      console.error(e);
      alert("Rút tiền thất bại. Xem console để biết chi tiết.");
    }
  };

  if (!account) {
    return (
      <div className="container deal-section">
        <div className="deal-card" style={{ alignItems: 'center', justifyContent: 'center', minHeight: '150px' }}>
          <h3 className="deal-label" style={{ marginBottom: '1rem' }}>Trạng thái ví</h3>
          <h2 className="deal-title" style={{ marginBottom: '1rem' }}>Bạn chưa kết nối ví</h2>
          <button className="btn-primary" onClick={connectWallet}>Kết nối ngay</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container deal-section">
      <div className="deal-card" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: '120px', padding: '2rem' }}>
        <div className="deal-info">
          <h3 className="deal-label">Ví của bạn</h3>
          <h2 className="deal-title" style={{ fontSize: '1.25rem' }}>
            {account.slice(0, 6)}...{account.slice(-4)}
          </h2>
          <p className="deal-subtitle" style={{ color: '#2563eb', fontWeight: 'bold' }}>
            Số dư: {parseFloat(balance).toFixed(4)} ETH
          </p>
        </div>

        <div className="guide" style={{ flex: 1, textAlign: 'center', padding: '0 2rem', marginLeft: '1rem', marginRight: '4rem', borderLeft: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb' }}>
          <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: '#6b7280', marginBottom: '0.5rem', fontWeight: 700 }}>Quy trình đấu giá</h4>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#374151', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: '600' }}>1. Kết nối ví</span>
            <span className="material-symbols-outlined" style={{ fontSize: '14px', paddingTop: '2px' }}>arrow_right_alt</span>
            <span style={{ fontWeight: '600' }}>2. Chọn vật phẩm</span>
            <span className="material-symbols-outlined" style={{ fontSize: '14px', paddingTop: '2px' }}>arrow_right_alt</span>
            <span style={{ fontWeight: '600' }}>3. Đặt giá (Bid)</span>
            <span className="material-symbols-outlined" style={{ fontSize: '14px', paddingTop: '2px' }}>arrow_right_alt</span>
            <span style={{ fontWeight: '600' }}>4. Chiến thắng / Rút tiền</span>
            <br></br>
            <p style={{ fontSize: '0.8rem', color: '#374151', flexWrap: 'wrap' }}>Nếu có người khác trả giá cao hơn bạn, số tiền bạn đã đấu giá sẽ được cất giữ tạm thời trong hợp đồng của chúng tôi. Bạn có thể rút về bất cứ lúc nào.</p>
          </div>
        </div>

        <div className="deal-timer-container">
          <div className="timer-group">
            <div className="timer-block">
              <div className="timer-box" style={{ width: 'auto', minWidth: '120px', padding: '0 1rem' }}>
                <span className="timer-value">{parseFloat(pendingReturn).toFixed(4)}</span>
              </div>
              <span className="timer-label">ETH Có thể rút</span>
            </div>
          </div>

          {parseFloat(pendingReturn) > 0 && (
            <div className="deal-price-block">
              <button className="btn-hero-primary" onClick={handleWithdraw} style={{ height: '40px' }}>
                Rút về ví
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Status;