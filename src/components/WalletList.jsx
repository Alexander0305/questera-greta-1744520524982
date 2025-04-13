import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Button,
  Tooltip
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCopy, FaFileExport, FaKey } from 'react-icons/fa';
import { networks } from '../config/networks';

const WalletList = ({ wallets, onExport }) => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Box>
      {wallets.length > 0 && (
        <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<FaFileExport />}
            onClick={() => onExport('json')}
            sx={{
              background: 'linear-gradient(45deg, #00f7ff, #2196f3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #00f7ff, #2196f3)',
                opacity: 0.9
              }
            }}
          >
            Export JSON
          </Button>
          <Button
            variant="contained"
            startIcon={<FaFileExport />}
            onClick={() => onExport('csv')}
            sx={{
              background: 'linear-gradient(45deg, #ff4081, #f50057)',
              '&:hover': {
                background: 'linear-gradient(45deg, #ff4081, #f50057)',
                opacity: 0.9
              }
            }}
          >
            Export CSV
          </Button>
        </Box>
      )}

      <AnimatePresence>
        {wallets.map((wallet, index) => (
          <motion.div
            key={wallet.mnemonic || wallet.privateKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card sx={{
              mb: 2,
              background: 'rgba(17, 34, 64, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 247, 255, 0.1)',
            }}>
              <CardContent>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FaKey size={20} color="#00f7ff" />
                  <Typography
                    variant="body2"
                    sx={{
                      flex: 1,
                      fontFamily: 'monospace',
                      color: '#00f7ff'
                    }}
                  >
                    {wallet.mnemonic || wallet.privateKey}
                  </Typography>
                  <Tooltip title="Copy">
                    <IconButton
                      size="small"
                      onClick={() => handleCopy(wallet.mnemonic || wallet.privateKey)}
                      sx={{ color: '#00f7ff' }}
                    >
                      <FaCopy />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Grid container spacing={2}>
                  {Object.entries(wallet.networks).map(([network, data]) => {
                    const networkConfig = networks[network];
                    const Icon = networkConfig.icon;
                    return (
                      <Grid item xs={12} md={6} key={network}>
                        <Box sx={{
                          p: 2,
                          borderRadius: 1,
                          background: networkConfig.theme.background,
                          border: `1px solid ${networkConfig.theme.primary}`
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Icon size={20} color={networkConfig.theme.primary} />
                            <Typography sx={{ ml: 1, color: networkConfig.theme.primary }}>
                              {networkConfig.name}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                              variant="body2"
                              sx={{
                                fontFamily: 'monospace',
                                flex: 1,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              {data.address}
                            </Typography>
                            <Tooltip title="Copy Address">
                              <IconButton
                                size="small"
                                onClick={() => handleCopy(data.address)}
                                sx={{ color: networkConfig.theme.primary }}
                              >
                                <FaCopy />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          <Typography variant="body2">
                            Balance: {data.balance} {networkConfig.symbol}
                          </Typography>
                          <Typography variant="body2">
                            Value: ${data.valueUSD.toFixed(2)}
                          </Typography>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>

                <Typography variant="h6" sx={{
                  mt: 2,
                  textAlign: 'right',
                  color: '#50fa7b'
                }}>
                  Total Value: ${wallet.totalValueUSD.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
};

export default WalletList;