// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract AuctionHouse {
    // Structure to hold auction details
    struct AuctionItem {
        address payable beneficiary;
        uint auctionEndTime;
        address highestBidder;
        uint highestBid;
        bool ended;
        bool exists;
    }

    address public owner;
    mapping(string => AuctionItem) public auctions;
    mapping(address => uint) public pendingReturns;
    string[] public itemIds; // To keep track of all items for the frontend

    event HighestBidIncreased(string itemId, address bidder, uint amount);
    event AuctionEnded(string itemId, address winner, uint amount);
    event AuctionCreated(string itemId, uint endTime);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this.");
        _;
    }

    // 1. Create Auction
    function createAuction(string memory _itemId, uint _biddingTime, address payable _beneficiary) public {
        // allowing public for demo purposes as requested, but usually onlyOwner
        require(!auctions[_itemId].exists, "Auction for this item already exists.");

        auctions[_itemId] = AuctionItem({
            beneficiary: _beneficiary,
            auctionEndTime: block.timestamp + _biddingTime,
            highestBidder: address(0),
            highestBid: 0,
            ended: false,
            exists: true
        });
        
        itemIds.push(_itemId);
        emit AuctionCreated(_itemId, block.timestamp + _biddingTime);
    }

    // 2. Bid
    function bid(string memory _itemId) public payable {
        AuctionItem storage item = auctions[_itemId];
        require(item.exists, "Auction does not exist.");
        require(block.timestamp <= item.auctionEndTime, "Auction already ended.");
        require(msg.value > item.highestBid, "There is already a higher or equal bid.");

        if (item.highestBid != 0) {
            // "Withdraw Pattern": Push funds to pendingReturns of the previous bidder
            pendingReturns[item.highestBidder] += item.highestBid;
        }

        item.highestBidder = msg.sender;
        item.highestBid = msg.value;
        emit HighestBidIncreased(_itemId, msg.sender, msg.value);
    }

    // 3. Withdraw (Pull over Push)
    function withdraw() public returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
            pendingReturns[msg.sender] = 0;

            if (!payable(msg.sender).send(amount)) {
                // If send fails, restore the amount
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

    // 4. End Auction
    function auctionEnd(string memory _itemId) public {
        AuctionItem storage item = auctions[_itemId];
        require(item.exists, "Auction does not exist.");
        require(block.timestamp >= item.auctionEndTime, "Auction not yet ended.");
        require(!item.ended, "auctionEnd has already been called.");

        item.ended = true;
        emit AuctionEnded(_itemId, item.highestBidder, item.highestBid);

        if (item.highestBid > 0) {
            item.beneficiary.transfer(item.highestBid);
        }
    }

    // Helper to get all items for frontend display
    function getAllItems() public view returns (string[] memory) {
        return itemIds;
    }

    // Helper to get item details
    function getItemDetails(string memory _itemId) public view returns (
        address beneficiary,
        uint auctionEndTime,
        address highestBidder,
        uint highestBid,
        bool ended
    ) {
        AuctionItem storage item = auctions[_itemId];
        require(item.exists, "Auction does not exist");
        return (
            item.beneficiary,
            item.auctionEndTime,
            item.highestBidder,
            item.highestBid,
            item.ended
        );
    }
}
