const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Auction Simulation Full Flow", function () {
    
    async function deployAuctionFixture() {
        const ONE_HOUR_IN_SECS = 60 * 60;
        const signers = await ethers.getSigners();
        const owner = signers[0];
        const user1 = signers[1];
        const user2 = signers[2];

        const Auction = await ethers.getContractFactory("Auction");
        const auction = await Auction.deploy(ONE_HOUR_IN_SECS, owner.address);

        return { auction, owner, user1, user2, biddingTime: ONE_HOUR_IN_SECS };
    }

    // Hàm helper để in số dư cho gọn code
    async function printBalances(user1, user2, message) {
        const bal1 = await ethers.provider.getBalance(user1.address);
        const bal2 = await ethers.provider.getBalance(user2.address);
        console.log(`\n--- ${message} ---`);
        console.log(`💰 User 1: ${ethers.formatEther(bal1)} ETH`);
        console.log(`💰 User 2: ${ethers.formatEther(bal2)} ETH`);
        console.log("----------------------------------");
    }

    it("Should simulate bidding war, time hack, and withdrawal correctly", async function () {
        const { auction, owner, user1, user2, biddingTime } = await loadFixture(deployAuctionFixture);

        // 1. IN SỐ DƯ BAN ĐẦU
        await printBalances(user1, user2, "BAN ĐẦU (Init)");

        // --- BƯỚC 1: USER 1 BID ---
        console.log("👉 User 1 bids 1.0 ETH...");
        await auction.connect(user1).bid({ value: ethers.parseEther("1.0") });
        
        await printBalances(user1, user2, "SAU KHI USER 1 BID");

        // --- BƯỚC 2: USER 2 BID ---
        console.log("👉 User 2 outbids with 2.0 ETH...");
        await auction.connect(user2).bid({ value: ethers.parseEther("2.0") });

        await printBalances(user1, user2, "SAU KHI USER 2 BID");
        // Lưu ý: User 1 lúc này vẫn mất 1.0 ETH (đang nằm trong smart contract)

        // --- BƯỚC 3: HACK TIME & END ---
        console.log("⏳ Hacking time & Ending auction...");
        await time.increase(biddingTime + 10);
        await auction.connect(user2).auctionEnd();

        // --- BƯỚC 4: USER 1 RÚT TIỀN ---
        console.log("💸 User 1 withdrawing refund...");
        await auction.connect(user1).withdraw();

        await printBalances(user1, user2, "SAU KHI USER 1 RÚT TIỀN (Final)");

        // Kiểm tra cuối cùng
        const user1FinalBalance = await ethers.provider.getBalance(user1.address);
        
        // Số dư User 1 phải xấp xỉ 10,000 ETH (chỉ mất phí gas, được hoàn 1.0 ETH bid)
        // 9999.99... ETH
        expect(user1FinalBalance).to.be.closeTo(ethers.parseEther("10000"), ethers.parseEther("0.01"));
    });
});