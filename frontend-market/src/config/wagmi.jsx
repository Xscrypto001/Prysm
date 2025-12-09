// src/config/wagmi.js
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { 
  mainnet, 
  sepolia, 
  polygon, 
  optimism, 
  arbitrum, 
  base 
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Prediction Markets',
  projectId: 'demo-project-id',
  chains: [
    mainnet,
    sepolia,
    polygon,
    optimism,
    arbitrum,
    base,
    {
      ...mainnet,
      rpcUrls: {
        default: { http: [`https://mainnet.infura.io/v3/${''}`] },
      },
    },
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
  ssr: false,
});

export const CONTRACT_ADDRESSES = {
  predictionMarket: {
    1: '0x...',
    11155111: '0x...',
    8453: '0x...',
  }
};