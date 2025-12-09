// src/components/Wallet/CustomConnectButton.jsx
import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Box, Button, Avatar, Typography, Chip } from '@mui/material';
import { AccountBalanceWallet, PowerSettingsNew } from '@mui/icons-material';
import { useAccount, useDisconnect } from 'wagmi';

const CustomConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const formatAddress = (addr) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    variant="contained"
                    startIcon={<AccountBalanceWallet />}
                    onClick={openConnectModal}
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                      }
                    }}
                  >
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={openChainModal}
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      fontWeight: 600,
                      textTransform: 'none',
                    }}
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  {/* Chain Selector */}
                  <Button
                    onClick={openChainModal}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: 'white',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: 2,
                      px: 2,
                      py: 0.5,
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: 'rgba(124, 58, 237, 0.5)',
                        backgroundColor: 'rgba(124, 58, 237, 0.1)',
                      }
                    }}
                  >
                    {chain.hasIcon && (
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          overflow: 'hidden',
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name || 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 20, height: 20 }}
                          />
                        )}
                      </Box>
                    )}
                    <Typography variant="body2">
                      {chain.name}
                    </Typography>
                  </Button>

                  {/* Account Button */}
                  <Button
                    onClick={openAccountModal}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      color: 'white',
                      background: 'rgba(30, 30, 46, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 2,
                      px: 3,
                      py: 1.5,
                      textTransform: 'none',
                      '&:hover': {
                        background: 'rgba(40, 40, 56, 0.8)',
                        borderColor: 'rgba(124, 58, 237, 0.5)',
                      }
                    }}
                  >
                    {/* Balance */}
                    {account.displayBalance && (
                      <Chip
                        label={account.displayBalance}
                        size="small"
                        sx={{
                          background: 'rgba(124, 58, 237, 0.2)',
                          color: '#7c3aed',
                          fontWeight: 600,
                        }}
                      />
                    )}
                    
                    {/* Address */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        }}
                      >
                        {account.ensAvatar ? (
                          <img
                            src={account.ensAvatar}
                            alt="ENS Avatar"
                            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                          />
                        ) : (
                          account.displayName.charAt(0).toUpperCase()
                        )}
                      </Avatar>
                      <Typography variant="body1" fontWeight={500}>
                        {account.ensName || formatAddress(account.address)}
                      </Typography>
                    </Box>
                  </Button>

                  {/* Disconnect Button */}
                  <Button
                    onClick={() => disconnect()}
                    sx={{
                      minWidth: 'auto',
                      p: 1,
                      color: 'rgba(255, 255, 255, 0.5)',
                      '&:hover': {
                        color: '#ff4444',
                        backgroundColor: 'rgba(255, 68, 68, 0.1)',
                      }
                    }}
                  >
                    <PowerSettingsNew />
                  </Button>
                </Box>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;