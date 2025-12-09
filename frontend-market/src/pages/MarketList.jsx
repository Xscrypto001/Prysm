// src/pages/MarketList.jsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Avatar,
  LinearProgress,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  IconButton,
  Badge,
  Tooltip,
  Fade,
} from '@mui/material';
import {
  Search,
  FilterList,
  TrendingUp,
  Whatshot,
  Schedule,
  AttachMoney,
  People,
  ShowChart,
  ArrowUpward,
  ArrowDownward,
  Favorite,
  Share,
  Visibility,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MarketList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  // Mock data for markets
  const markets = [
    {
      id: 1,
      title: 'Will ETH reach $5,000 by Q2 2024?',
      category: 'Crypto',
      liquidity: '2.5M',
      volume: '1.8M',
      participants: 2450,
      yesOdds: 0.65,
      noOdds: 0.35,
      trending: true,
      hot: true,
      timeLeft: '3 days',
      creator: '0xabc...123',
      outcomes: ['Yes', 'No'],
      tags: ['Ethereum', 'Price', 'Bullish'],
    },
    {
      id: 2,
      title: 'Bitcoin halving price prediction',
      category: 'Crypto',
      liquidity: '3.2M',
      volume: '2.1M',
      participants: 3120,
      yesOdds: 0.72,
      noOdds: 0.28,
      trending: true,
      hot: false,
      timeLeft: '15 days',
      creator: '0xdef...456',
      outcomes: ['Above $100K', 'Below $100K'],
      tags: ['Bitcoin', 'Halving', 'Bull Run'],
    },
    {
      id: 3,
      title: 'Tesla Q4 2023 earnings beat',
      category: 'Stocks',
      liquidity: '1.8M',
      volume: '950K',
      participants: 1870,
      yesOdds: 0.48,
      noOdds: 0.52,
      trending: false,
      hot: true,
      timeLeft: '2 days',
      creator: '0xghi...789',
      outcomes: ['Yes', 'No'],
      tags: ['Tesla', 'Earnings', 'Elon Musk'],
    },
    {
      id: 4,
      title: 'US Fed interest rate decision',
      category: 'Economy',
      liquidity: '4.1M',
      volume: '3.2M',
      participants: 4250,
      yesOdds: 0.55,
      noOdds: 0.45,
      trending: true,
      hot: true,
      timeLeft: '1 day',
      creator: '0xjkl...012',
      outcomes: ['25 bps', '50 bps', 'No Change'],
      tags: ['Fed', 'Interest', 'Economy'],
    },
    {
      id: 5,
      title: 'World Cup 2026 winner prediction',
      category: 'Sports',
      liquidity: '1.2M',
      volume: '680K',
      participants: 1320,
      yesOdds: 0.40,
      noOdds: 0.60,
      trending: false,
      hot: false,
      timeLeft: '90 days',
      creator: '0xmno...345',
      outcomes: ['Argentina', 'Brazil', 'France', 'Others'],
      tags: ['Football', 'World Cup', 'Sports'],
    },
    {
      id: 6,
      title: 'AI breakthrough in 2024',
      category: 'Technology',
      liquidity: '950K',
      volume: '420K',
      participants: 980,
      yesOdds: 0.78,
      noOdds: 0.22,
      trending: true,
      hot: true,
      timeLeft: '45 days',
      creator: '0xpqr...678',
      outcomes: ['Yes', 'No'],
      tags: ['AI', 'Technology', 'Innovation'],
    },
  ];

  const categories = ['All', 'Crypto', 'Stocks', 'Sports', 'Politics', 'Technology', 'Entertainment'];

  const MarketCard = ({ market }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card 
        sx={{ 
          height: '100%',
          background: 'linear-gradient(145deg, #1E1E2E 0%, #2D2B42 100%)',
          border: '1px solid rgba(124, 58, 237, 0.1)',
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
          '&:hover': {
            borderColor: 'rgba(124, 58, 237, 0.3)',
            boxShadow: '0 8px 32px rgba(124, 58, 237, 0.2)',
          }
        }}
      >
        {/* Market Status Badges */}
        <Box sx={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 1 }}>
          {market.trending && (
            <Chip
              icon={<TrendingUp sx={{ fontSize: 16 }} />}
              label="Trending"
              size="small"
              sx={{
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                fontWeight: 600,
              }}
            />
          )}
          {market.hot && (
            <Chip
              icon={<Whatshot sx={{ fontSize: 16 }} />}
              label="Hot"
              size="small"
              sx={{
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#f59e0b',
                fontWeight: 600,
              }}
            />
          )}
        </Box>

        <CardContent sx={{ pt: 3 }}>
          {/* Market Category */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Chip
              label={market.category}
              size="small"
              sx={{
                background: 'rgba(124, 58, 237, 0.1)',
                color: '#7c3aed',
                fontWeight: 600,
              }}
            />
            <Box sx={{ flexGrow: 1 }} />
            <Tooltip title="Time left">
              <Chip
                icon={<Schedule sx={{ fontSize: 16 }} />}
                label={market.timeLeft}
                size="small"
                variant="outlined"
                sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
              />
            </Tooltip>
          </Box>

          {/* Market Title */}
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2,
              fontWeight: 600,
              lineHeight: 1.4,
              cursor: 'pointer',
              '&:hover': { color: '#8b5cf6' }
            }}
            onClick={() => navigate(`/market/${market.id}`)}
          >
            {market.title}
          </Typography>

          {/* Odds Bar */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="primary" fontWeight={600}>
                YES {market.outcomes[0]}
              </Typography>
              <Typography variant="body2" color="error.light" fontWeight={600}>
                NO {market.outcomes[1] || 'Other'}
              </Typography>
            </Box>
            <Box sx={{ position: 'relative' }}>
              <LinearProgress
                variant="determinate"
                value={market.yesOdds * 100}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
                    borderRadius: 4,
                  }
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  top: -24,
                  left: `${market.yesOdds * 100}%`,
                  transform: 'translateX(-50%)',
                  background: 'rgba(16, 185, 129, 0.9)',
                  color: 'white',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontWeight: 600,
                  fontSize: 12,
                }}
              >
                {(market.yesOdds * 100).toFixed(1)}%
              </Typography>
            </Box>
          </Box>

          {/* Market Stats */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AttachMoney sx={{ fontSize: 16, color: '#10b981' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Liquidity
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    ${market.liquidity}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ShowChart sx={{ fontSize: 16, color: '#8b5cf6' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Volume
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    ${market.volume}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <People sx={{ fontSize: 16, color: '#f59e0b' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Traders
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {market.participants.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar
                  sx={{ width: 20, height: 20, fontSize: 12, bgcolor: 'rgba(124, 58, 237, 0.2)' }}
                >
                  {market.creator.slice(2, 4)}
                </Avatar>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Creator
                  </Typography>
                  <Typography variant="body2" fontWeight={600} sx={{ fontFamily: 'monospace' }}>
                    {market.creator}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Tags */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {market.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: 11,
                }}
              />
            ))}
          </Box>
        </CardContent>

        <CardActions sx={{ px: 3, pb: 3, pt: 0 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate(`/market/${market.id}`)}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: 2,
              py: 1.2,
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
              }
            }}
          >
            Trade Now
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
            }}
          >
            Predict the Future
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Trade on real-world events with decentralized prediction markets
          </Typography>
        </Box>
      </motion.div>

      {/* Search and Filter Section */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search markets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                  </InputAdornment>
                ),
                sx: {
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(124, 58, 237, 0.3)',
                  }
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterList />}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    borderColor: '#7c3aed',
                    color: '#7c3aed',
                  }
                }}
              >
                Filters
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate('/create')}
                sx={{
                  background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                  }
                }}
              >
                Create Market
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Category Tabs */}
      <Box sx={{ mb: 4, borderBottom: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <Tabs
          value={filter}
          onChange={(e, newValue) => setFilter(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {categories.map((cat) => (
            <Tab
              key={cat}
              label={cat}
              value={cat.toLowerCase()}
              sx={{
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: filter === cat.toLowerCase() ? 600 : 400,
                color: filter === cat.toLowerCase() ? '#7c3aed' : 'rgba(255, 255, 255, 0.7)',
                '&:hover': { color: '#8b5cf6' }
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Stats Bar */}
      <Box sx={{ mb: 4, p: 3, background: 'rgba(30, 30, 46, 0.5)', borderRadius: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" fontWeight={800} color="primary">
                $42.5M
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Volume
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" fontWeight={800} color="secondary">
                15,240
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Traders
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" fontWeight={800} color="warning.main">
                89.2%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Accuracy Rate
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" fontWeight={800} color="info.main">
                324
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Markets
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Markets Grid */}
      <Grid container spacing={3}>
        {markets.map((market) => (
          <Grid item key={market.id} xs={12} sm={6} lg={4}>
            <MarketCard market={market} />
          </Grid>
        ))}
      </Grid>

      {/* Call to Action */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Typography variant="h4" sx={{ mb: 3 }}>
            Ready to start predicting?
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/create')}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontSize: '1.2rem',
              px: 6,
              py: 2,
              borderRadius: 3,
              '&:hover': {
                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                transform: 'scale(1.05)',
              },
              transition: 'transform 0.2s',
            }}
          >
            Create Your First Market
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
};

export default MarketList;