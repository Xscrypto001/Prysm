Prysm Documentation
📋 Overview

Prysm is a decentralized prediction market platform with a modern React frontend and EVM-based smart contracts.
🚀 Quick Start
Prerequisites

    Node.js 18+

    npm or yarn

    Git

    Wallet (MetaMask, Rabobowkit, etc.)

1. Clone Repository
bash

git clone <repository-url>
cd Prysm

🖥️ Frontend Setup (Vite + React)
Install Dependencies
bash

cd frontend-market
npm install

Environment Variables

Create .env file in frontend-market/:
env

VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
VITE_INFURA_ID=your_infura_id
VITE_CONTRACT_ADDRESS=your_contract_address

Get WalletConnect Project ID

    Visit WalletConnect Cloud

    Create new project

    Copy Project ID to .env

Run Development Server
bash

npm run dev

App runs at: http://localhost:3000
Build for Production
bash

npm run build
npm run preview

📜 Smart Contracts Setup
Install Dependencies
bash

cd smart_contracts
npm install

Environment Variables

Create .env file in smart_contracts/:
env

PRIVATE_KEY=your_wallet_private_key
INFURA_API_KEY=your_infura_key
ETHERSCAN_API_KEY=your_etherscan_key

Compile Contracts
bash

npx hardhat compile

Run Tests
bash

npx hardhat test

Deploy to Networks
Local Network
bash

npx hardhat node
npx hardhat run scripts/deploy.js --network localhost

Test Network (Sepolia)
bash

npx hardhat run scripts/deploy.js --network sepolia

Mainnet
bash

npx hardhat run scripts/deploy.js --network mainnet

🏗️ Project Structure
text

Prysm/
├── frontend-market/          # React Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── config/         # Configuration files
│   │   └── theme/          # MUI theme
│   ├── public/             # Static assets
│   └── vite.config.js      # Vite configuration
│
└── smart_contracts/         # Hardhat project
    ├── contracts/          # Solidity contracts
    ├── scripts/           # Deployment scripts
    ├── test/              # Contract tests
    └── hardhat.config.js  # Hardhat configuration

🔧 Available Scripts
Frontend
bash

npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

Contracts
bash

npx hardhat compile  # Compile contracts
npx hardhat test     # Run tests
npx hardhat node     # Start local node
npx hardhat clean    # Clean artifacts

🔗 Contract Addresses

Update frontend-market/src/config/wagmi.jsx with deployed addresses:
javascript

export const CONTRACT_ADDRESSES = {
  1: "0x...",          // Mainnet
  11155111: "0x...",   // Sepolia
  8453: "0x...",       // Base
};

🎨 UI Components
Built With

    React 18 - UI library

    Vite - Build tool (fast!)

    Material-UI - Component library

    RainbowKit - Wallet connection

    Wagmi - Web3 React hooks

    Recharts - Data visualization

    Framer Motion - Animations

Pages

    Market List (/) - Browse prediction markets

    Create Market (/create) - Create new markets

    Market Detail (/market/:id) - Trade on specific market

    Dashboard (/dashboard) - User portfolio & positions

    Trending (/trending) - Hot markets & top traders

📱 Features
Trading Features

    Buy/Sell prediction shares

    Real-time odds display

    Portfolio tracking

    Market liquidity pools

    Fee structures

Market Types

    Binary (Yes/No) markets

    Multiple outcome markets

    Scalar markets

    Time-based resolutions

Privacy Features (Coming Soon)

    Private transaction execution

    ZK-proof verification

    Sender-recipient link breaking

🔐 Security
Frontend Security

    Environment variables for sensitive data

    HTTPS in production

    CSP headers

    Wallet connection security

Contract Security

    OpenZeppelin contracts

    Comprehensive testing

    Audit-ready structure

    Role-based access control

🔄 Deployment
Frontend Deployment (Vercel)
bash

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

Contract Verification
bash

npx hardhat verify --network sepolia <CONTRACT_ADDRESS>

🧪 Testing
Frontend Tests
bash

# Add testing framework as needed
npm install vitest @testing-library/react --save-dev

Contract Tests
bash

npx hardhat test
npx hardhat coverage

📈 Monitoring
Frontend Analytics

    Add Google Analytics

    Error tracking (Sentry)

    Performance monitoring

Contract Events

    Market creation events

    Trade events

    Resolution events

    Liquidity events

🤝 Contributing

    Fork the repository

    Create feature branch

    Commit changes

    Push to branch

    Create Pull Request

Code Standards

    ESLint for JavaScript/React

    Solhint for Solidity

    Prettier for formatting

    Conventional commits

📚 Additional Resources
Frontend Libraries

    Vite Documentation

    Material-UI

    RainbowKit

    Wagmi

Smart Contracts

    Hardhat

    OpenZeppelin

    Ethers.js

Prediction Market Theory

    Augur Whitepaper

    Polymarket

    Manifold Markets

🆘 Troubleshooting
Common Issues

    Wallet Connection Issues

        Check WalletConnect project ID

        Ensure wallet is on correct network

        Clear browser cache

    Contract Interaction Errors

        Verify contract address

        Check network compatibility

        Ensure sufficient gas

    Build Errors

        Clear node_modules: rm -rf node_modules && npm install

        Check Node.js version: node --version

        Update dependencies: npm update

Getting Help

    Check existing GitHub issues

    Review contract test coverage

    Use Hardhat console for debugging

📄 License

MIT License - See LICENSE file for details.

Happy Predicting! 🎯
