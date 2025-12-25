
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;


export const ABI = [
    "function getAllItems() public view returns (string[])",
    "function getItemDetails(string _itemId) public view returns (address beneficiary, uint auctionEndTime, address highestBidder, uint highestBid, bool ended)",
    "function bid(string _itemId) public payable",
    "function withdraw() public returns (bool)",
    "function pendingReturns(address) public view returns (uint)",
    "function auctionEnd(string _itemId) public",
    "event HighestBidIncreased(string itemId, address bidder, uint amount)",
    "event AuctionEnded(string itemId, address winner, uint amount)",
    "event AuctionCreated(string itemId, uint endTime)"
];
