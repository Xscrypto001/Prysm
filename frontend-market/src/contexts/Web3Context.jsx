// src/contexts/Web3Context.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Web3Context = createContext();

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Mock contract interaction functions
  const createMarket = async (marketData) => {
    console.log('Creating market:', marketData);
    // Implement actual contract call here
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 2000));
  };

  const trade = async (marketId, outcome, amount, isBuy) => {
    console.log('Trading:', { marketId, outcome, amount, isBuy });
    // Implement actual contract call here
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000));
  };

  const value = {
    account,
    chainId,
    provider,
    signer,
    isConnected,
    createMarket,
    trade,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};