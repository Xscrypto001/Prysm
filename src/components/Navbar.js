// src/components/Navigation/Navbar.jsx
import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Container, 
  Box, 
  Button, 
  IconButton, 
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Menu as MenuIcon,
  SportsEsports as MarketIcon,
  Add as CreateIcon,
  AccountBalanceWallet as WalletIcon,
  TrendingUp as TrendingIcon,
  BarChart as DashboardIcon
} from '@mui/icons-material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Markets', path: '/', icon: <MarketIcon /> },
    { label: 'Create', path: '/create', icon: <CreateIcon /> },
    { label: 'Trending', path: '/trending', icon: <TrendingIcon /> },
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.label} 
            onClick={() => navigate(item.path)}
            sx={{
              backgroundColor: location.pathname === item.path 
                ? 'rgba(124, 58, 237, 0.1)' 
                : 'transparent',
              borderRadius: 1,
              mb: 1
            }}
          >
            <ListItemText 
              primary={item.label} 
              sx={{ 
                color: location.pathname === item.path 
                  ? theme.palette.primary.main 
                  : 'inherit'
              }} 
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          backgroundColor: 'rgba(10, 10, 20, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 1, md: 2 } }}>
            {/* Logo */}
            <Box 
              onClick={() => navigate('/')}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mr: 4, 
                cursor: 'pointer'
              }}
            >
              <motion.div
                whileHover={{ rotate: 5 }}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <MarketIcon 
                  sx={{ 
                    fontSize: 32, 
                    color: theme.palette.primary.main,
                    mr: 1 
                  }} 
                />
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Box
                    sx={{
                      fontSize: 20,
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '-0.5px'
                    }}
                  >
                    PREDICT<span style={{ color: '#7c3aed' }}>X</span>
                  </Box>
                  <Box sx={{ fontSize: 10, color: '#888', letterSpacing: '1px' }}>
                    DECENTRALIZED PREDICTIONS
                  </Box>
                </Box>
              </motion.div>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  startIcon={item.icon}
                  sx={{
                    mx: 1,
                    color: location.pathname === item.path 
                      ? theme.palette.primary.main 
                      : 'rgba(255, 255, 255, 0.7)',
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    '&:hover': {
                      backgroundColor: 'rgba(124, 58, 237, 0.1)',
                    },
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '10%',
                        right: '10%',
                        height: 2,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: 1
                      }}
                    />
                  )}
                </Button>
              ))}
            </Box>

            {/* Wallet Connect & Mobile Menu */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Network Indicator */}
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <ConnectButton 
                  showBalance={{
                    smallScreen: false,
                    largeScreen: true,
                  }}
                  chainStatus={{
                    smallScreen: 'icon',
                    largeScreen: 'full',
                  }}
                  accountStatus={{
                    smallScreen: 'avatar',
                    largeScreen: 'full',
                  }}
                />
              </Box>
              
              {/* Mobile Connect Button */}
              <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <ConnectButton 
                  chainStatus="icon"
                  accountStatus="avatar"
                />
              </Box>

              {/* Mobile Menu Button */}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            backgroundColor: '#0A0A14',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)'
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;