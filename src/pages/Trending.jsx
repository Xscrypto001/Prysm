// src/pages/Trending.jsx
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
  Tabs,
  Tab,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
} from '@mui/material';
import {
  TrendingUp,
  Whatshot,
  ArrowUpward,
  ArrowDownward,
  AccessTime,
  People,
  AttachMoney,
  FilterList,
  MoreVert,
  Star,
  TrendingFlat,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Trending = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('24h');

  // Mock trending markets
  const trendingMarkets = [
    {
      id: 1,
      rank: 1,
      title: 'ETH $5,000 by Q2 2024',
      category: 'Crypto',
      volume: '1.8M',
      change: '+45%',
      participants: 2450,
      liquidity: '2.5M',
      yesOdds: 0.65,
      hot: true,
      trending: true,
    },
    {
      id: 2,
      rank: 2,
      title: 'Bitcoin Halving Prediction',
      category: 'Crypto',
      volume: '2.1M',
      change: '+32%',
      participants: 3120,
      liquidity: '3.2M',
      yesOdds: 0.72,
      hot: true,
      trending: true,
    },
    {
      id: 3,
      rank: 3,
      title: 'Tesla Q4 Earnings Beat',
      category: 'Stocks',
      volume: '950K',
      change: '+28%',
      participants: 1870,
      liquidity: '1.8M',
      yesOdds: 0.48,
      hot: false,
      trending: true,
    },
    {
      id: 4,
      rank: 4,
      title: 'Fed Rate Decision',
      category: 'Economy',
      volume: '3.2M',
      change: '+25%',
      participants: 4250,
      liquidity: '4.1M',
      yesOdds: 0.55,
      hot: true,
      trending: false,
    },
    {
      id: 5,
      rank: 5,
      title: 'World Cup 2026 Winner',
      category: 'Sports',
      volume: '680K',
      change: '+18%',
      participants: 1320,
      liquidity: '1.2M',
      yesOdds: 0.40,
      hot: false,
      trending: false,
    },
  ];

  // Mock top traders
  const topTraders = [
    { rank: 1, address: '0xabc...123', profit: '+$42,500', winRate: '89%', trades: 142 },
    { rank: 2, address: '0xdef...456', profit: '+$38,200', winRate: '82%', trades: 118 },
    { rank: 3, address: '0xghi...789', profit: '+$31,800', winRate: '76%', trades: 95 },
    { rank: 4, address: '0xjkl...012', profit: '+$28,500', winRate: '84%', trades: 127 },
    { rank: 5, address: '0xmno...345', profit: '+$25,900', winRate: '79%', trades: 103 },
  ];

  const MarketRow = ({ market, index }) => (
    <TableRow
      sx={{
        '&:hover': {
          background: 'rgba(124, 58, 237, 0.05)',
        }
      }}
    >
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: index < 3 
                ? 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'
                : 'rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: index < 3 ? 'white' : 'rgba(255, 255, 255, 0.7)',
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {market.rank}
          </Box>
          <Box>
            <Typography 
              variant="body2" 
              fontWeight={600}
              sx={{ cursor: 'pointer', '&:hover': { color: '#7c3aed' } }}
              onClick={() => navigate(`/market/${market.id}`)}
            >
              {market.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Chip
                label={market.category}
                size="small"
                sx={{
                  background: 'rgba(124, 58, 237, 0.1)',
                  color: '#7c3aed',
                  fontSize: 11,
                  height: 20,
                }}
              />
              {market.hot && (
                <Chip
                  icon={<Whatshot sx={{ fontSize: 14 }} />}
                  label="Hot"
                  size="small"
                  sx={{
                    background: 'rgba(245, 158, 11, 0.15)',
                    color: '#f59e0b',
                    fontSize: 11,
                    height: 20,
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Typography variant="body2" fontWeight={600}>
          ${market.volume}
        </Typography>
      </TableCell>
      <TableCell>
        <Chip
          icon={market.change.startsWith('+') ? <ArrowUpward /> : <ArrowDownward />}
          label={market.change}
          size="small"
          sx={{
            background: market.change.startsWith('+') 
              ? 'rgba(16, 185, 129, 0.15)' 
              : 'rgba(239, 68, 68, 0.15)',
            color: market.change.startsWith('+') ? '#10b981' : '#ef4444',
            fontWeight: 600,
            fontSize: 12,
          }}
        />
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <People sx={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.5)' }} />
          <Typography variant="body2">
            {market.participants.toLocaleString()}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ minWidth: 120 }}>
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
          <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 0.5 }}>
            {(market.yesOdds * 100).toFixed(1)}%
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Button
          size="small"
          variant="contained"
          onClick={() => navigate(`/market/${market.id}`)}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontSize: 12,
            px: 2,
            py: 0.5,
            '&:hover': {
              background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
            }
          }}
        >
          Trade
        </Button>
      </TableCell>
    </TableRow>
  );

  const TraderRow = ({ trader, index }) => (
    <TableRow
      sx={{
        '&:hover': {
          background: 'rgba(124, 58, 237, 0.05)',
        }
      }}
    >
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: index < 3 
                ? 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
                : 'rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: index < 3 ? 'white' : 'rgba(255, 255, 255, 0.7)',
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {trader.rank}
          </Box>
          <Box>
            <Typography variant="body2" fontWeight={600} sx={{ fontFamily: 'monospace' }}>
              {trader.address}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {trader.trades} trades
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Typography variant="body2" fontWeight={600} color="#10b981">
          {trader.profit}
        </Typography>
      </TableCell>
      <TableCell>
        <Chip
          label={trader.winRate}
          size="small"
          sx={{
            background: 'rgba(16, 185, 129, 0.15)',
            color: '#10b981',
            fontWeight: 600,
            fontSize: 12,
          }}
        />
      </TableCell>
      <TableCell>
        <Button
          size="small"
          variant="outlined"
          sx={{
            borderColor: 'rgba(124, 58, 237, 0.3)',
            color: '#7c3aed',
            fontSize: 12,
          }}
        >
          Follow
        </Button>
      </TableCell>
    </TableRow>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
            }}
          >
            Trending Now
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Discover the most active markets and top traders
          </Typography>
        </Box>

        {/* Time Filter Tabs */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <Paper
            sx={{
              display: 'inline-flex',
              background: 'rgba(30, 30, 46, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 3,
              p: 0.5,
            }}
          >
            {['1h', '24h', '7d', '30d'].map((period) => (
              <Button
                key={period}
                onClick={() => setTimeFilter(period)}
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  background: timeFilter === period 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'transparent',
                  color: timeFilter === period ? 'white' : 'rgba(255, 255, 255, 0.7)',
                  fontWeight: 600,
                  textTransform: 'none',
                  minWidth: 60,
                  '&:hover': {
                    background: timeFilter === period 
                      ? 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
                      : 'rgba(255, 255, 255, 0.05)',
                  }
                }}
              >
                {period}
              </Button>
            ))}
          </Paper>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, #f59e0b20 0%, rgba(30, 30, 46, 0.5) 100%)',
                border: '1px solid #f59e0b30',
                borderRadius: 3,
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      background: '#f59e0b20',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Whatshot sx={{ fontSize: 24, color: '#f59e0b' }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight={800}>
                      42
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Hot Markets
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, #ef444420 0%, rgba(30, 30, 46, 0.5) 100%)',
                border: '1px solid #ef444430',
                borderRadius: 3,
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      background: '#ef444420',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TrendingUp sx={{ fontSize: 24, color: '#ef4444' }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight={800}>
                      $42.5M
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      24h Volume
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, #10b98120 0%, rgba(30, 30, 46, 0.5) 100%)',
                border: '1px solid #10b98130',
                borderRadius: 3,
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      background: '#10b98120',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <People sx={{ fontSize: 24, color: '#10b981' }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight={800}>
                      15,240
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Traders
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, #7c3aed20 0%, rgba(30, 30, 46, 0.5) 100%)',
                border: '1px solid #7c3aed30',
                borderRadius: 3,
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      background: '#7c3aed20',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Star sx={{ fontSize: 24, color: '#7c3aed' }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight={800}>
                      89.2%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Accuracy Rate
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Two Column Layout */}
        <Grid container spacing={4}>
          {/* Trending Markets Table */}
          <Grid item xs={12} lg={8}>
            <Card
              sx={{
                background: 'linear-gradient(145deg, #1E1E2E 0%, #2D2B42 100%)',
                border: '1px solid rgba(124, 58, 237, 0.1)',
                borderRadius: 3,
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TrendingUp sx={{ fontSize: 32, color: '#f59e0b' }} />
                    <Box>
                      <Typography variant="h5" fontWeight={700}>
                        Trending Markets
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Most active markets by volume
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton>
                    <FilterList />
                  </IconButton>
                </Box>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Market</TableCell>
                        <TableCell>Volume</TableCell>
                        <TableCell>Change</TableCell>
                        <TableCell>Traders</TableCell>
                        <TableCell>Odds</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {trendingMarkets.map((market, index) => (
                        <MarketRow key={market.id} market={market} index={index} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Top Traders */}
          <Grid item xs={12} lg={4}>
            <Card
              sx={{
                background: 'linear-gradient(145deg, #1E1E2E 0%, #2D2B42 100%)',
                border: '1px solid rgba(124, 58, 237, 0.1)',
                borderRadius: 3,
                height: '100%',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Star sx={{ fontSize: 32, color: '#10b981' }} />
                  <Box>
                    <Typography variant="h5" fontWeight={700}>
                      Top Traders
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Highest profit this month
                    </Typography>
                  </Box>
                </Box>

                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Trader</TableCell>
                        <TableCell>Profit</TableCell>
                        <TableCell>Win Rate</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {topTraders.map((trader, index) => (
                        <TraderRow key={trader.rank} trader={trader} index={index} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Category Breakdown */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
            Trending by Category
          </Typography>
          
          <Grid container spacing={3}>
            {[
              { name: 'Crypto', volume: '$18.2M', markets: 42, color: '#7c3aed' },
              { name: 'Stocks', volume: '$9.8M', markets: 28, color: '#10b981' },
              { name: 'Politics', volume: '$6.5M', markets: 19, color: '#3b82f6' },
              { name: 'Sports', volume: '$4.2M', markets: 15, color: '#f59e0b' },
              { name: 'Technology', volume: '$3.8M', markets: 12, color: '#ef4444' },
              { name: 'Entertainment', volume: '$2.1M', markets: 8, color: '#8b5cf6' },
            ].map((category, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                <motion.div whileHover={{ y: -5 }}>
                  <Card
                    sx={{
                      background: `linear-gradient(135deg, ${category.color}20 0%, rgba(30, 30, 46, 0.5) 100%)`,
                      border: `1px solid ${category.color}30`,
                      borderRadius: 3,
                      height: '100%',
                      cursor: 'pointer',
                    }}
                    onClick={() => navigate(`/?category=${category.name.toLowerCase()}`)}
                  >
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: `${category.color}20`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 16px',
                        }}
                      >
                        <Typography
                          variant="h4"
                          fontWeight={800}
                          sx={{ color: category.color }}
                        >
                          {category.name.charAt(0)}
                        </Typography>
                      </Box>
                      <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                        {category.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {category.volume} Volume
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {category.markets} Markets
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
              Ready to join the action?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
              Start trading on trending markets or create your own prediction market
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/')}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                  }
                }}
              >
                Browse Markets
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/create')}
                sx={{
                  borderColor: 'rgba(124, 58, 237, 0.5)',
                  color: '#7c3aed',
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  '&:hover': {
                    borderColor: '#7c3aed',
                    background: 'rgba(124, 58, 237, 0.1)',
                  }
                }}
              >
                Create Market
              </Button>
            </Box>
          </motion.div>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Trending;