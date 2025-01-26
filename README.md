# PRODUCT SHIPPING Dapp

The Product Tracking Dapp is a decentralized application (DApp) built on the Ethereum blockchain to track product shipments. The system allows users to create, start, complete, and view shipments with transparency, immutability, and reliability, leveraging the power of smart contracts.

## Features

- Connect Wallet: Seamlessly connect your Ethereum wallet (e.g., MetaMask) to interact with the DApp.
- Create Shipments: Add shipment details such as receiver address, pickup time, distance, and price.
- Track Shipments: Retrieve all shipment details, including sender, receiver, delivery status, and payment information.
- Complete Shipments: Mark shipments as completed when delivery is successful.
- Start Shipments: Trigger the process of initiating a shipment.
- Shipment Count: View the total number of shipments created by the connected wallet.

# Tech Stack

## Frontend

- React.js: A modern JavaScript library for building user interfaces.
- Next.js: A React framework for server-side rendering and routing.
- Web3Modal: A library for wallet connection management.
- TailwindCSS: A utility-first CSS framework for responsive and modern UI.

## Backend

- Ethereum: A blockchain platform for smart contracts.
- Ethers.js: A library for interacting with Ethereum smart contracts.
- Hardhat: A development environment to deploy and test smart contracts.

## Prerequisites

Before starting, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- MetaMask (or any other Ethereum wallet)
- A local blockchain network or testnet such as Hardhat, Ganache, or Goerli.

# Installation

## 1. Clone the repository:

```
git clone https://github.com/Ramprakash852/Shipping-with-Web3.0.git

cd Shipping-with-Web3.0
```

## 2. Start the local development server:

```
npm run dev
```

## 3. Run the Hardhat local blockchain:

```
npx hardhat node
```

# Usage

## 1. Connect Wallet:

- Open the DApp in your browser at http://localhost:3000.
- Click the Connect Wallet button to connect your MetaMask wallet.

## 2. Create Shipment:

- Fill in the required shipment details:
  - Receiver address
  - Pickup time
  - Distance
  - Price (in ETH)
- Click Create Shipment.

## 3. Track Shipments:

- View all created shipments in the DApp dashboard.

## 4. Complete Shipment:

- Select a shipment and mark it as completed when delivered.

## 5. Start Shipment:

- Trigger the shipment process for an active order.
