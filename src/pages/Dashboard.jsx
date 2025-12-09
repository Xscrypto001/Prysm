// src/pages/Dashboard.jsx
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
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from '@mui/material';
import {
  AccountBalanceWallet,
  TrendingUp,
  TrendingDown,
  AttachMoney,
  ShowChart,
  History,
  Star,
  Download,
  Refresh,
  FilterList,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
  Security,
  VerifiedUser,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  // Mock data
  const portfolioStats = {
    totalValue: 15420.50,
    totalProfit: 1520.25,
    profitPercentage: 10.92,
    activePositions: 8,
    resolvedMarkets: 12,
    winRate: 75.4,
    totalTrades: 42,
  };

  const positions = [
    { id: 1, market: 'ETH $5,000 Prediction', outcome: 'YES', shares: 1500, avgPrice: 0.60, currentPrice: 0.65, value: 975, profit: 75, change: 12.5 },
    { id: 2, market: 'Bitcoin Halving', outcome: 'NO', shares: 500, avgPrice: 0.40, currentPrice: 0.35, value: 175, profit: -25, change: -12.5 },
    { id: 3, market: 'Tesla Earnings', outcome: 'YES', shares: 2000, avgPrice: 0.55, currentPrice: 0.48, value: 960, profit: -140, change: -12.7 },
    { id: 4, market: 'Fed Rate Decision', outcome: 'YES', shares: 1000, avgPrice: 0.45, currentPrice: 0.55, value: 550, profit: 100, change: 22.2 },
  ];

  const recentTrades = [
    { id: 1, market: 'ETH $5,000', action: 'BUY', outcome: 'YES', shares: 500, price: 0.62, total: 310, time: '2 hours ago', status: 'Completed' },
    { id: 2, market: 'BTC Halving', action: 'SELL', outcome: 'NO', shares: 200, price: 0.38, total: 76, time: '5 hours ago', status: 'Completed' },
    { id: 3, market: 'Tesla Earnings', action: 'BUY', outcome: 'YES', shares: 1000, price: 0.48, total: 480, time: '1 day ago', status: 'Completed' },
    { id: 4, market: 'Fed Decision', action: 'SELL', outcome: 'NO', shares: 300, price: 0.42, total: 126, time: '2 days ago', status: 'Completed' },
  ];

  const performanceData = [
    { month: 'Jan', profit: 1200 },
    { month: 'Feb', profit: 1800 },
    { month: 'Mar', profit: 2200 },
    { month: 'Apr', profit: 1500 },
    { month: 'May', profit: 2500 },
    { month: 'Jun', profit: 3200 },
  ];

  const categoryData = [
    { name: 'Crypto', value: 65 },
    { name: 'Stocks', value: 20 },
    { name: 'Politics', value: 10 },
    { name: 'Sports', value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const StatCard = ({ title, value, change, icon, color }) => (
    <motion.div whileHover={{ y: -5 }}>
      <Card
        sx={{
          background: `linear-gradient(135deg, ${color}20 0%, rgba(30, 30, 46, 0.5) 100%)`,
          border: `1px solid ${color}30`,
          borderRadius: 3,
          height: '100%',
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                background: `${color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              {icon}
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {title}
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {typeof value === 'number' ? `$${value.toLocaleString()}` : value}
              </Typography>
            </Box>
          </Box>
          {change && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                icon={change >= 0 ? <ArrowUpward /> : <ArrowDownward />}
                label={`${change >= 0 ? '+' : ''}${change}%`}
                size="small"
                sx={{
                  background: change >= 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  color: change >= 0 ? '#10b981' : '#ef4444',
                  fontWeight: 600,
                }}
              />
              <Typography variant="caption" color="text.secondary">
                from last month
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h2" sx={{ mb: 1, fontWeight: 700 }}>
              Dashboard
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Manage your portfolio and track performance
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<Download />}
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<Refresh />}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              Refresh
            </Button>
          </Box>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6} lg={3}>
            <StatCard
              title="Portfolio Value"
              value={portfolioStats.totalValue}
              change={portfolioStats.profitPercentage}
              icon={<AccountBalanceWallet sx={{ fontSize: 24, color: '#7c3aed' }} />}
              color="#7c3aed"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <StatCard
              title="Total Profit"
              value={portfolioStats.totalProfit}
              change={15.2}
              icon={<TrendingUp sx={{ fontSize: 24, color: '#10b981' }} />}
              color="#10b981"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <StatCard
              title="Win Rate"
              value={`${portfolioStats.winRate}%`}
              change={2.4}
              icon={<Star sx={{ fontSize: 24, color: '#f59e0b' }} />}
              color="#f59e0b"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <StatCard
              title="Active Positions"
              value={portfolioStats.activePositions}
              change={25}
              icon={<ShowChart sx={{ fontSize: 24, color: '#3b82f6' }} />}
              color="#3b82f6"
            />
          </Grid>
        </Grid>

        {/* Tabs */}
        <Box sx={{ mb: 4, borderBottom: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
              }
            }}
          >
            <Tab label="Portfolio" icon={<AccountBalanceWallet />} iconPosition="start" />
            <Tab label="Performance" icon={<TrendingUp />} iconPosition="start" />
            <Tab label="Activity" icon={<History />} iconPosition="start" />
            <Tab label="Settings" icon={<Security />} iconPosition="start" />
          </Tabs>
        </Box>

        {tabValue === 0 && (
          <Grid container spacing={4}>
            {/* Positions Table */}
            <Grid item xs={12} lg={8}>
              <Card
                sx={{
                  background: 'linear-gradient(145deg, #1E1E2E 0%, #2D2B42 100%)',
                  border: '1px solid rgba(124, 58, 237, 0.1)',
                  borderRadius: 3,
                  height: '100%',
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" fontWeight={600}>
                      Active Positions
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small">
                        <FilterList />
                      </IconButton>
                      <IconButton size="small">
                        <MoreVert />
                      </IconButton>
                    </Box>
                  </Box>

                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Market</TableCell>
                          <TableCell>Position</TableCell>
                          <TableCell align="right">Shares</TableCell>
                          <TableCell align="right">Avg Price</TableCell>
                          <TableCell align="right">Current</TableCell>
                          <TableCell align="right">P&L</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {positions.map((position) => (
                          <TableRow
                            key={position.id}
                            sx={{
                              '&:hover': {
                                background: 'rgba(255, 255, 255, 0.02)',
                              }
                            }}
                          >
                            <TableCell>
                              <Typography variant="body2" fontWeight={600} sx={{ cursor: 'pointer' }}>
                                {position.market}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={position.outcome}
                                size="small"
                                sx={{
                                  background: position.outcome === 'YES' 
                                    ? 'rgba(16, 185, 129, 0.15)' 
                                    : 'rgba(239, 68, 68, 0.15)',
                                  color: position.outcome === 'YES' ? '#10b981' : '#ef4444',
                                  fontWeight: 600,
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" fontWeight={600}>
                                {position.shares.toLocaleString()}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2">
                                ${position.avgPrice}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" fontWeight={600}>
                                ${position.currentPrice}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                                <Typography
                                  variant="body2"
                                  fontWeight={600}
                                  color={position.profit >= 0 ? '#10b981' : '#ef4444'}
                                >
                                  ${position.profit}
                                </Typography>
                                <Chip
                                  label={`${position.change >= 0 ? '+' : ''}${position.change}%`}
                                  size="small"
                                  sx={{
                                    background: position.profit >= 0 
                                      ? 'rgba(16, 185, 129, 0.15)' 
                                      : 'rgba(239, 68, 68, 0.15)',
                                    color: position.profit >= 0 ? '#10b981' : '#ef4444',
                                    fontSize: 11,
                                    height: 20,
                                  }}
                                />
                              </Box>
                            </TableCell>
                            <TableCell align="right">
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => navigate(`/market/${position.id}`)}
                                sx={{
                                  borderColor: 'rgba(124, 58, 237, 0.3)',
                                  color: '#7c3aed',
                                  fontSize: 12,
                                }}
                              >
                                Trade
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Portfolio Allocation */}
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
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Portfolio Allocation
                  </Typography>
                  
                  <Box sx={{ height: 300, mb: 3 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Allocation']}
                          contentStyle={{
                            background: '#1E1E2E',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: 8,
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>

                  <List disablePadding>
                    {categoryData.map((item, index) => (
                      <ListItem key={index} sx={{ py: 1 }}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            background: COLORS[index],
                            mr: 2,
                          }}
                        />
                        <ListItemText
                          primary={item.name}
                          secondary={`${item.value}% of portfolio`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {tabValue === 1 && (
          <Grid container spacing={4}>
            {/* Performance Chart */}
            <Grid item xs={12} lg={8}>
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
                    Performance History
                  </Typography>
                  
                  <Box sx={{ height: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                        <XAxis dataKey="month" stroke="rgba(255, 255, 255, 0.7)" />
                        <YAxis stroke="rgba(255, 255, 255, 0.7)" />
                        <Tooltip 
                          contentStyle={{
                            background: '#1E1E2E',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: 8,
                          }}
                          formatter={(value) => [`$${value}`, 'Profit']}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="profit"
                          stroke="#7c3aed"
                          strokeWidth={3}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Performance Metrics */}
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
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Performance Metrics
                  </Typography>
                  
                  <List disablePadding>
                    <ListItem sx={{ py: 2 }}>
                      <ListItemText
                        primary="Sharpe Ratio"
                        secondary="Risk-adjusted returns"
                      />
                      <Typography variant="h6" color="#10b981" fontWeight={700}>
                        2.45
                      </Typography>
                    </ListItem>
                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    
                    <ListItem sx={{ py: 2 }}>
                      <ListItemText
                        primary="Max Drawdown"
                        secondary="Largest peak-to-trough decline"
                      />
                      <Typography variant="h6" color="#ef4444" fontWeight={700}>
                        -8.2%
                      </Typography>
                    </ListItem>
                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    
                    <ListItem sx={{ py: 2 }}>
                      <ListItemText
                        primary="Avg Holding Period"
                        secondary="Average days per position"
                      />
                      <Typography variant="h6" color="#f59e0b" fontWeight={700}>
                        14.5
                      </Typography>
                    </ListItem>
                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    
                    <ListItem sx={{ py: 2 }}>
                      <ListItemText
                        primary="Success Rate"
                        secondary="Profitable trades"
                      />
                      <Typography variant="h6" color="#3b82f6" fontWeight={700}>
                        68.4%
                      </Typography>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>
                  Recent Activity
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  View All
                </Button>
              </Box>

              <List>
                {recentTrades.map((trade) => (
                  <React.Fragment key={trade.id}>
                    <ListItem
                      sx={{
                        py: 2,
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.02)',
                          borderRadius: 1,
                        }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: trade.action === 'BUY' 
                              ? 'rgba(16, 185, 129, 0.2)' 
                              : 'rgba(239, 68, 68, 0.2)',
                            color: trade.action === 'BUY' ? '#10b981' : '#ef4444',
                          }}
                        >
                          {trade.action.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body1" fontWeight={600}>
                              {trade.action} {trade.outcome} - {trade.market}
                            </Typography>
                            <Chip
                              label={trade.status}
                              size="small"
                              sx={{
                                background: 'rgba(16, 185, 129, 0.15)',
                                color: '#10b981',
                                fontWeight: 600,
                              }}
                            />
                          </Box>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              {trade.shares} shares @ ${trade.price}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {trade.time}
                            </Typography>
                          </Box>
                        }
                      />
                      <Typography variant="body1" fontWeight={600} sx={{ minWidth: 80, textAlign: 'right' }}>
                        ${trade.total}
                      </Typography>
                    </ListItem>
                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        )}

        {tabValue === 3 && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
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
                    Account Security
                  </Typography>
                  
                  <List disablePadding>
                    <ListItem sx={{ py: 2 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
                          <VerifiedUser />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Two-Factor Authentication"
                        secondary="Add an extra layer of security"
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: '#10b981',
                          color: '#10b981',
                          '&:hover': {
                            borderColor: '#10b981',
                            background: 'rgba(16, 185, 129, 0.1)',
                          }
                        }}
                      >
                        Enable
                      </Button>
                    </ListItem>
                    
                    <ListItem sx={{ py: 2 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' }}>
                          <Security />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Wallet Connection"
                        secondary="Manage connected wallets"
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          color: 'rgba(255, 255, 255, 0.7)',
                        }}
                      >
                        Manage
                      </Button>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
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
                    Notification Settings
                  </Typography>
                  
                  <List disablePadding>
                    <ListItem sx={{ py: 1 }}>
                      <ListItemText
                        primary="Email Notifications"
                        secondary="Receive updates via email"
                      />
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                          }
                        }}
                      >
                        Configure
                      </Button>
                    </ListItem>
                    
                    <ListItem sx={{ py: 1 }}>
                      <ListItemText
                        primary="Price Alerts"
                        secondary="Get notified on price movements"
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          color: 'rgba(255, 255, 255, 0.7)',
                        }}
                      >
                        Set Up
                      </Button>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Bottom CTA */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 3, color: 'text.secondary' }}>
            Need help or have questions?
          </Typography>
          <Button
            variant="contained"
            size="large"
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
            Contact Support
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Dashboard;