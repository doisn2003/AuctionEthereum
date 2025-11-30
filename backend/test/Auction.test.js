const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Auction", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployAuctionFixture() {
        const ONE_HOUR_IN_SECS = 60 * 60;
        const biddingTime = ONE_HOUR_IN_SECS;

        // Contracts are deployed using the first signer/account by default
        const [beneficiary, otherAccount, bidder1, bidder2] = await ethers.getSigners();

        const Auction = await ethers.getContractFactory("Auction");
        const auction = await Auction.deploy(biddingTime, beneficiary.address);

        return { auction, biddingTime, beneficiary, otherAccount, bidder1, bidder2 };
    }

    describe("Deployment", function () {
        it("Should set the right beneficiary", async function () {
            const { auction, beneficiary } = await loadFixture(deployAuctionFixture);

            expect(await auction.beneficiary()).to.equal(beneficiary.address);
        });

        it("Should set the right auction end time", async function () {
            const { auction, biddingTime } = await loadFixture(deployAuctionFixture);

            // We can't check exact timestamp because block time varies slightly, 
            // but we can check if it's close to now + biddingTime
            const endTime = await auction.auctionEndTime();
            const blockTimestamp = await time.latest();

            expect(endTime).to.be.closeTo(blockTimestamp + biddingTime, 10);
        });
    });

    describe("Bidding", function () {
        it("Should accept a higher bid", async function () {
            const { auction, bidder1 } = await loadFixture(deployAuctionFixture);

            await auction.connect(bidder1).bid({ value: ethers.parseEther("1.0") });

            expect(await auction.highestBid()).to.equal(ethers.parseEther("1.0"));
            expect(await auction.highestBidder()).to.equal(bidder1.address);
        });

        it("Should fail if the bid is not high enough", async function () {
            const { auction, bidder1, bidder2 } = await loadFixture(deployAuctionFixture);

            await auction.connect(bidder1).bid({ value: ethers.parseEther("1.0") });

            await expect(
                auction.connect(bidder2).bid({ value: ethers.parseEther("0.5") })
            ).to.be.revertedWithCustomError(auction, "BidNotHighEnough");
        });

        it("Should fail if the auction has already ended", async function () {
            const { auction, biddingTime, bidder1 } = await loadFixture(deployAuctionFixture);

            await time.increase(biddingTime + 1);

            await expect(
                auction.connect(bidder1).bid({ value: ethers.parseEther("1.0") })
            ).to.be.revertedWithCustomError(auction, "AuctionAlreadyEnded");
        });

        it("Should emit HighestBidIncreased event", async function () {
            const { auction, bidder1 } = await loadFixture(deployAuctionFixture);

            await expect(auction.connect(bidder1).bid({ value: ethers.parseEther("1.0") }))
                .to.emit(auction, "HighestBidIncreased")
                .withArgs(bidder1.address, ethers.parseEther("1.0"));
        });
    });

    describe("Withdrawals", function () {
        it("Should allow previous highest bidder to withdraw", async function () {
            const { auction, bidder1, bidder2 } = await loadFixture(deployAuctionFixture);

            // Bidder 1 bids 1 ETH
            await auction.connect(bidder1).bid({ value: ethers.parseEther("1.0") });

            // Bidder 2 bids 2 ETH (overbidding Bidder 1)
            await auction.connect(bidder2).bid({ value: ethers.parseEther("2.0") });

            // Bidder 1 should now have a pending return of 1 ETH
            // We check the balance change of Bidder 1 after withdrawal
            await expect(auction.connect(bidder1).withdraw())
                .to.changeEtherBalance(bidder1, ethers.parseEther("1.0"));
        });
    });

    describe("Ending the Auction", function () {
        it("Should transfer the highest bid to the beneficiary", async function () {
            const { auction, biddingTime, beneficiary, bidder1 } = await loadFixture(deployAuctionFixture);

            await auction.connect(bidder1).bid({ value: ethers.parseEther("1.0") });

            await time.increase(biddingTime + 1);

            await expect(auction.auctionEnd())
                .to.changeEtherBalance(beneficiary, ethers.parseEther("1.0"));
        });

        it("Should fail if called too early", async function () {
            const { auction } = await loadFixture(deployAuctionFixture);

            await expect(auction.auctionEnd()).to.be.revertedWithCustomError(
                auction,
                "AuctionNotYetEnded"
            );
        });

        it("Should fail if called more than once", async function () {
            const { auction, biddingTime } = await loadFixture(deployAuctionFixture);

            await time.increase(biddingTime + 1);
            await auction.auctionEnd();

            await expect(auction.auctionEnd()).to.be.revertedWithCustomError(
                auction,
                "AuctionEndAlreadyCalled"
            );
        });

        it("Should emit AuctionEnded event", async function () {
            const { auction, biddingTime, bidder1 } = await loadFixture(deployAuctionFixture);

            await auction.connect(bidder1).bid({ value: ethers.parseEther("1.0") });
            await time.increase(biddingTime + 1);

            await expect(auction.auctionEnd())
                .to.emit(auction, "AuctionEnded")
                .withArgs(bidder1.address, ethers.parseEther("1.0"));
        });
    });
});
