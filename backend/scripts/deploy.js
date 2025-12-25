const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const AuctionHouse = await hre.ethers.getContractFactory("AuctionHouse");
    const auctionHouse = await AuctionHouse.deploy();

    await auctionHouse.waitForDeployment();
    const auctionHouseAddress = await auctionHouse.getAddress();

    console.log("AuctionHouse deployed to:", auctionHouseAddress);

    const phoneNumbers = [
        "0909090909", "0345678910", "0900000001", "0989999999"
    ];
    const licensePlates = [
        "23A-123.45", "29A-567.89", "30A-888.88", "29A-999.99"
    ];

    const allItems = [...phoneNumbers, ...licensePlates];
    const duration = 3600; // 1 hour

    console.log("Creating auctions for 8 items...");

    for (const item of allItems) {
        const tx = await auctionHouse.createAuction(item, duration, deployer.address);
        await tx.wait();
        console.log(`Created auction for item: ${item}`);
    }

    console.log("All 8 auctions created successfully.");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });