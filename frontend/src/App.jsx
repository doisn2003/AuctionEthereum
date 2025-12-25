import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Status from './components/Status';
import FilterBar from './components/FilterBar';
import AuctionGrid from './components/AuctionGrid';
import Bird from './components/Bird';
import WinnerModal from './components/WinnerModal';
import { CONTRACT_ADDRESS, ABI } from './utils/ethereum';

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [winnerItems, setWinnerItems] = useState([]); // Changed to array

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const _provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await _provider.getSigner();
        const _contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

        setProvider(_provider);
        setContract(_contract);
        setAccount(await signer.getAddress());
        return true;
      } catch (error) {
        console.error("Connection failed", error);
        return false;
      }
    } else {
      alert("Please install MetaMask!");
      return false;
    }
  };

  const openBidModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Kiểm tra các cuộc đấu giá đã kết thúc định kỳ
  useEffect(() => {
    if (!contract || !account) return;

    const checkWinner = async () => {
      try {
        const itemIds = await contract.getAllItems();
        const now = BigInt(Math.floor(Date.now() / 1000));

        let newWinners = [];

        for (const id of itemIds) {
          const details = await contract.getItemDetails(id);
          // chi tiết: [beneficiary, auctionEndTime, highestBidder, highestBid, ended]
          const endTime = details[1];
          const highestBidder = details[2];

          // nếu hết thời gian VÀ tôi là người chiến thắng
          if (endTime <= now && highestBidder.toLowerCase() === account.toLowerCase()) {
            newWinners.push({ id: id });
          }
        }

        if (newWinners.length > 0) {
          setWinnerItems(prev => {
            const prevIds = prev.map(w => w.id).sort().join(',');
            const newIds = newWinners.map(w => w.id).sort().join(',');
            return prevIds !== newIds ? newWinners : prev;
          });
        }

      } catch (e) { console.error(e); }
    };

    const interval = setInterval(checkWinner, 5000);
    return () => clearInterval(interval);
  }, [contract, account]);

  return (
    <>
      <Navbar account={account} connectWallet={connectWallet} />
      <Hero contract={contract} onBid={openBidModal} />
      <Status account={account} contract={contract} provider={provider} connectWallet={connectWallet} />
      <FilterBar />
      <AuctionGrid contract={contract} onBid={openBidModal} />
      <Bird
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
        contract={contract}
      />
      <WinnerModal
        items={winnerItems}
        onClose={() => setWinnerItems([])}
      />
      <Footer />
    </>
  );
}

export default App;