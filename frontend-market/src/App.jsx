// src/App.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './theme/theme';
import Navbar from './components/Navbar';
import MarketLists from './pages/MarketList';
import CreateMarket from './pages/CreateMarket';
import MarketDetail from './pages/MarketDetail';
import Dashboard from './pages/Dashboard';
import Trending from './pages/Trending';
import { MarketProvider } from './contexts/MarketContext';
import { Web3Provider } from './contexts/Web3Context';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Web3Provider>
        <MarketProvider>
          <Router>
            <div className="app">
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<MarketLists />} />
                  <Route path="/create" element={<CreateMarket />} />
                  <Route path="/market/:id" element={<MarketDetail />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/trending" element={<Trending />} />
                </Routes>
              </main>
            </div>
          </Router>
        </MarketProvider>
      </Web3Provider>
    </ThemeProvider>
  );
}

export default App;
