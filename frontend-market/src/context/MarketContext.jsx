// src/contexts/MarketContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const MarketContext = createContext();

export const useMarket = () => useContext(MarketContext);

export const MarketProvider = ({ children }) => {
  const [markets, setMarkets] = useState([]);
  const [userPositions, setUserPositions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data loading
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // Mock markets data
      const mockMarkets = [
        {
          id: 1,
          title: 'Will ETH reach $5,000 by Q2 2024?',
          category: 'Crypto',
          liquidity: '2.5M',
          volume: '1.8M',
          participants: 2450,
          yesOdds: 0.65,
          noOdds: 0.35,
          timeLeft: '3 days',
        },
        // ... more mock markets
      ];
      setMarkets(mockMarkets);
      setLoading(false);
    }, 1000);
  }, []);

  const fetchMarket = async (id) => {
    // Implement market fetching
    return markets.find(m => m.id === parseInt(id)) || null;
  };

  const fetchUserPositions = async (address) => {
    // Implement positions fetching
    return [];
  };

  const value = {
    markets,
    userPositions,
    loading,
    fetchMarket,
    fetchUserPositions,
  };

  return (
    <MarketContext.Provider value={value}>
      {children}
    </MarketContext.Provider>
  );
};