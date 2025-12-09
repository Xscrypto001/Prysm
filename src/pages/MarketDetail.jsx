// src/pages/MarketDetail.jsx
import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Avatar,
  LinearProgress,
  Tabs,
  Tab,
  TextField,
  Slider,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  ArrowUpward,
  ArrowDownward,
  AttachMoney,
  People,
  Schedule,
  TrendingUp,
  Share,
  Favorite,
  Bookmark,
  ChatBubble,
  History,
  BarChart,
  Sell,
  ShoppingCart,
  AccountBalanceWallet,
  Verified,
  Warning,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

const MarketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [buyAmount, setBuyAmount] = useState(100);
  const [sellAmount, setSellAmount] = useState(50);
  const [selectedOutcome, setSelectedOutcome] = useState(0);

  // Mock market data
  const market = {
    id: 1,
    title: 'Will ETH reach $5,000 by Q2 2024?',
    description: 'Prediction market for Ethereum price target by end of Q2 2024. Based on current market trends, adoption rates, and macroeconomic factors.',
    category: 'Crypto',
    liquidity: '2.5M',
    volume: '1.8M',
    participants: 2450,
    yesOdds: 0.65,
    noOdds: 0.35,
    trending: true,
    hot: true,
    timeLeft: '3 days 14 hours',
    creator: '0xabc123...def456',
    outcomes: ['Yes', 'No'],
    tags: ['Ethereum', 'Price', 'Bullish', 'Crypto'],
    resolutionDate: '2024-06-30T23:59:59Z',
    currentYesPrice: 0.65,
    currentNoPrice: 0.35,
    marketCap: '1.6M',
    openInterest: '850K',
    creatorVerified: true,
  };

  const trades = [
    { user: '0xuser1', action: 'Buy', outcome: 'Yes', amount: '500', price: 0.62, time: '2 min ago' },
    { user: '0xuser2', action: 'Sell', outcome: 'No', amount: '250', price: 0.38, time: '5 min ago' },
    { user: '0xuser3', action: 'Buy', outcome: 'Yes', amount: '1000', price: 0.61, time: '15 min ago' },
    { user: '0xuser4', action: 'Buy', outcome: 'Yes', amount: '750', price: 0.63, time: '30 min ago' },
    { user: '0xuser5', action: 'Sell', outcome: 'No', amount: '400', price: 0.37, time: '1 hour ago' },
  ];

  const userPositions = [
    { outcome: 'Yes', shares: 1500, avgPrice: 0.60, currentValue: 975, profit: 75 },
    { outcome: 'No', shares: 500, avgPrice: 0.40, currentValue: 175, profit: -25 },
  ];

  const TradingPanel = () => (
    <Card
      sx={{
        background: 'linear-gradient(145deg, #1E1E2E 0%, #2D2B42 100%)',
        border: '1px solid rgba(124, 58, 237, 0.1)',
        borderRadius: 3,
        height: '100%',
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Trade
        </Typography>

        <Tabs
          value={selectedOutcome}
          onChange={(e, newValue) => setSelectedOutcome(newValue)}
          sx={{ mb: 3 }}
        >
          {market.outcomes.map((outcome, index) => (
            <Tab
              key={index}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {outcome}
                  <Chip
                    label={`${(index === 0 ? market.yesOdds : market.noOdds) * 100}%`}
                    size="small"
                    sx={{
                      background: index === 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: index === 0 ? '#10b981' : '#ef4444',
                      fontSize: 12,
                      height: 20,
                    }}
                  />
                </Box>
              }
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                minWidth: 0,
                flex: 1,
              }}
            />
          ))}
        </Tabs>

        {/* Buy Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, color: '#10b981', fontWeight: 600 }}>
            <ShoppingCart sx={{ mr: 1, fontSize: 20 }} />
            Buy {market.outcomes[selectedOutcome]}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Amount (USD)
            </Typography>
            <TextField
              fullWidth
              type="number"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              InputProps={{
                startAdornment: <AttachMoney sx={{ color: 'rgba(255, 255, 255, 0.5)', mr: 1 }} />,
                sx: {
                  background: 'rgba(16, 185, 129, 0.05)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: 2,
                }
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Shares to receive: {Math.round(buyAmount / (selectedOutcome === 0 ? market.currentYesPrice : market.currentNoPrice))}
            </Typography>
            <Slider
              value={buyAmount}
              onChange={(e, value) => setBuyAmount(value)}
              min={10}
              max={1000}
              step={10}
              sx={{
                color: '#10b981',
                '& .MuiSlider-thumb': {
                  background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                }
              }}
            />
          </Box>

          <Button
            fullWidth
            variant="contained"
            startIcon={<ShoppingCart />}
            sx={{
              background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              }
            }}
          >
            Buy for ${buyAmount}
          </Button>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 3 }} />

        {/* Sell Section */}
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 2, color: '#ef4444', fontWeight: 600 }}>
            <Sell sx={{ mr: 1, fontSize: 20 }} />
            Sell {market.outcomes[selectedOutcome]}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Shares to sell
            </Typography>
            <TextField
              fullWidth
              type="number"
              value={sellAmount}
              onChange={(e) => setSellAmount(e.target.value)}
              InputProps={{
                sx: {
                  background: 'rgba(239, 68, 68, 0.05)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: 2,
                }
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Expected proceeds: ${(sellAmount * (selectedOutcome === 0 ? market.currentYesPrice : market.currentNoPrice)).toFixed(2)}
            </Typography>
            <Slider
              value={sellAmount}
              onChange={(e, value) => setSellAmount(value)}
              min={1}
              max={100}
              step={1}
              sx={{
                color: '#ef4444',
                '& .MuiSlider-thumb': {
                  background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
                }
              }}
            />
          </Box>

          <Button
            fullWidth
            variant="contained"
            startIcon={<Sell />}
            sx={{
              background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
              }
            }}
          >
            Sell {sellAmount} Shares
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  const MarketStats = () => (
    <Card
      sx={{
        background: 'linear-gradient(145deg, #1E1E2E 0%, #2D2B42 100%)',
        border: '1px solid rgba(124, 58, 237, 0.1)',
        borderRadius: 3,
        mb: 3,
      }}
    >
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={800} color="primary">
                ${market.liquidity}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Liquidity
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={800} color="secondary">
                ${market.volume}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                24h Volume
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={800} color="warning.main">
                {market.participants}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Traders
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={800} color="info.main">
                {market.timeLeft}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Time Left
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Market Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Box>
              <Chip
                label={market.category}
                sx={{
                  background: 'rgba(124, 58, 237, 0.1)',
                  color: '#7c3aed',
                  fontWeight: 600,
                  mb: 2,
                }}
              />
              <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
                {market.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(124, 58, 237, 0.2)' }}>
                    {market.creator.slice(2, 4)}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Created by
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body1" fontWeight={600} sx={{ fontFamily: 'monospace' }}>
                        {market.creator}
                      </Typography>
                      {market.creatorVerified && (
                        <Verified sx={{ fontSize: 16, color: '#3b82f6' }} />
                      )}
                    </Box>
                  </Box>
                </Box>
                <Chip
                  icon={<Schedule />}
                  label={`Resolves: ${new Date(market.resolutionDate).toLocaleDateString()}`}
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton>
                <Favorite />
              </IconButton>
              <IconButton>
                <Bookmark />
              </IconButton>
              <IconButton>
                <Share />
              </IconButton>
            </Box>
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
            {market.description}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {market.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
              />
            ))}
          </Box>
        </Box>

        <MarketStats />

        {/* Odds Display */}
        <Card
          sx={{
            background: 'linear-gradient(145deg, #1E1E2E 0%, #2D2B42 100%)',
            border: '1px solid rgba(124, 58, 237, 0.1)',
            borderRadius: 3,
            mb: 4,
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Current Odds
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1" color="primary" fontWeight={600}>
                  {market.outcomes[0]} - ${market.currentYesPrice}
                </Typography>
                <Typography variant="body1" color="error.light" fontWeight={600}>
                  {market.outcomes[1]} - ${market.currentNoPrice}
                </Typography>
              </Box>
              <Box sx={{ position: 'relative' }}>
                <LinearProgress
                  variant="determinate"
                  value={market.yesOdds * 100}
                  sx={{
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
                      borderRadius: 8,
                    }
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: -30,
                    left: `${market.yesOdds * 100}%`,
                    transform: 'translateX(-50%)',
                    textAlign: 'center',
                  }}
                >
                  <Box
                    sx={{
                      background: 'rgba(16, 185, 129, 0.9)',
                      color: 'white',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      fontWeight: 600,
                    }}
                  >
                    {(market.yesOdds * 100).toFixed(1)}%
                  </Box>
                  <Box
                    sx={{
                      width: 0,
                      height: 0,
                      borderLeft: '8px solid transparent',
                      borderRight: '8px solid transparent',
                      borderTop: '8px solid rgba(16, 185, 129, 0.9)',
                      margin: '0 auto',
                    }}
                  />
                </Box>
              </Box>
            </Box>

            <Alert severity="info" sx={{ background: 'rgba(59, 130, 246, 0.1)' }}>
              <Typography variant="body2">
                💡 Price represents probability. Buy YES if you think the event will happen, NO if you think it won't.
              </Typography>
            </Alert>
          </CardContent>
        </Card>

        <Grid container spacing={4}>
          {/* Left Column - Trading & Positions */}
          <Grid item xs={12} lg={8}>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              sx={{ mb: 3 }}
            >
              <Tab label="Trade" icon={<ShoppingCart />} iconPosition="start" />
              <Tab label="My Positions" icon={<AccountBalanceWallet />} iconPosition="start" />
              <Tab label="Market Depth" icon={<BarChart />} iconPosition="start" />
              <Tab label="History" icon={<History />} iconPosition="start" />
            </Tabs>

            {tabValue === 0 && <TradingPanel />}
            
            {tabValue === 1 && (
              <Card
                sx={{
                  background: 'linear-gradient(145deg, #1E1E2E 0%, #2D2B42 100%)',
                  border: '1px solid rgba(124, 58, 237, 0.1)',
                  borderRadius: 3,
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Your Positions
                  </Typography>
                  
                  <Grid container spacing={3}>
                    {userPositions.map((position, index) => (
                      <Grid item xs={12} md={6} key={index}>
                        <Card
                          sx={{
                            background: index === 0 
                              ? 'rgba(16, 185, 129, 0.1)' 
                              : 'rgba(239, 68, 68, 0.1)',
                            border: index === 0 
                              ? '1px solid rgba(16, 185, 129, 0.3)' 
                              : '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: 2,
                          }}
                        >
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant="h6" fontWeight={600}>
                                {market.outcomes[index]}
                              </Typography>
                              <Chip
                                label={index === 0 ? 'LONG' : 'SHORT'}
                                size="small"
                                sx={{
                                  background: index === 0 
                                    ? 'rgba(16, 185, 129, 0.2)' 
                                    : 'rgba(239, 68, 68, 0.2)',
                                  color: index === 0 ? '#10b981' : '#ef4444',
                                  fontWeight: 600,
                                }}
                              />
                            </Box>
                            
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="body2" color="text.secondary">
                                Shares
                              </Typography>
                              <Typography variant="h5" fontWeight={700}>
                                {position.shares.toLocaleString()}
                              </Typography>
                            </Box>
                            
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">
                                  Avg Price
                                </Typography>
                                <Typography variant="body1" fontWeight={600}>
                                  ${position.avgPrice}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">
                                  Current Value
                                </Typography>
                                <Typography variant="body1" fontWeight={600}>
                                  ${position.currentValue}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Typography variant="body2" color="text.secondary">
                                    P&L:
                                  </Typography>
                                  <Typography 
                                    variant="body1" 
                                    fontWeight={600}
                                    color={position.profit >= 0 ? '#10b981' : '#ef4444'}
                                  >
                                    {position.profit >= 0 ? '+' : ''}${position.profit} ({((position.profit / (position.currentValue - position.profit)) * 100).toFixed(1)}%)
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            )}

            {tabValue === 2 && (
              <Card
                sx={{
                  background: 'linear-gradient(145deg, #1E1E2E 0%, #2D2B42 100%)',
                  border: '1px solid rgba(124, 58, 237, 0.1)',
                  borderRadius: 3,
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Market Depth
                  </Typography>
                  <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography color="text.secondary">
                      Market depth chart will be displayed here
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            )}

            {tabValue === 3 && (
              <Card
                sx={{
                  background: 'linear-gradient(145deg, #1E1E2E 0%, #2D2B42 100%)',
                  border: '1px solid rgba(124, 58, 237, 0.1)',
                  borderRadius: 3,
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Recent Trades
                  </Typography>
                  <List>
                    {trades.map((trade, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          background: index % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                          borderRadius: 1,
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              bgcolor: trade.action === 'Buy' 
                                ? 'rgba(16, 185, 129, 0.2)' 
                                : 'rgba(239, 68, 68, 0.2)',
                              color: trade.action === 'Buy' ? '#10b981' : '#ef4444',
                              width: 32,
                              height: 32,
                              fontSize: 14,
                              fontWeight: 600,
                            }}
                          >
                            {trade.user.slice(2, 4)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body1" fontWeight={600}>
                                {trade.action} {trade.outcome}
                              </Typography>
                              <Typography variant="body1" fontWeight={600}>
                                {trade.amount} shares
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2" color="text.secondary">
                                @ ${trade.price}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {trade.time}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            )}
          </Grid>

          {/* Right Column - Info & Activity */}
          <Grid item xs={12} lg={4}>
            <Card
              sx={{
                background: 'linear-gradient(145deg, #1E1E2E 0%, #2D2B42 100%)',
                border: '1px solid rgba(124, 58, 237, 0.1)',
                borderRadius: 3,
                mb: 3,
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Market Info
                </Typography>
                
                <List disablePadding>
                  <ListItem sx={{ py: 1.5 }}>
                    <ListItemText
                      primary="Market Cap"
                      secondary={market.marketCap}
                    />
                  </ListItem>
                  <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <ListItem sx={{ py: 1.5 }}>
                    <ListItemText
                      primary="Open Interest"
                      secondary={market.openInterest}
                    />
                  </ListItem>
                  <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <ListItem sx={{ py: 1.5 }}>
                    <ListItemText
                      primary="Resolution Time"
                      secondary={new Date(market.resolutionDate).toLocaleString()}
                    />
                  </ListItem>
                  <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <ListItem sx={{ py: 1.5 }}>
                    <ListItemText
                      primary="Trading Fee"
                      secondary="1.0%"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            <Card
              sx={{
                background: 'linear-gradient(145deg, #1E1E2E 0%, #2D2B42 100%)',
                border: '1px solid rgba(124, 58, 237, 0.1)',
                borderRadius: 3,
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Quick Actions
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<ShoppingCart />}
                      sx={{
                        background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                        py: 1.5,
                        mb: 1,
                      }}
                    >
                      Quick Buy YES
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<Sell />}
                      sx={{
                        background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
                        py: 1.5,
                        mb: 1,
                      }}
                    >
                      Quick Sell NO
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Share />}
                      sx={{
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'rgba(255, 255, 255, 0.7)',
                        py: 1.5,
                      }}
                    >
                      Share Market
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default MarketDetail;