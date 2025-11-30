# Auction Ethereum Project

This project contains a full-stack decentralized application (DApp) for an Auction system.

## Structure

- **backend/**: Contains the Smart Contracts, Tests, and Deployment scripts. Built with [Hardhat](https://hardhat.org/).
- **frontend/**: Contains the User Interface. Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/).

## Getting Started

### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies (if not already done):
   ```bash
   npm install
   ```
3. Compile contracts:
   ```bash
   npx hardhat compile
   ```
4. Run tests:
   ```bash
   npx hardhat test
   ```
5. Start local blockchain node:
   ```bash
   npx hardhat node
   ```

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (if not already done):
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
