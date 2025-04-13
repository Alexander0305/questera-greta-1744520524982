import React, { useState, useCallback, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import NetworkSelector from '../components/NetworkSelector';
import DiscoveryControls from '../components/DiscoveryControls';
import WalletList from '../components/WalletList';
import StatsDisplay from '../components/StatsDisplay';
import DiscoveryService from '../services/discoveryService';

const WalletFinder = () => {
  const [mode, setMode] = useState('ai');
  const [wordCount, setWordCount] = useState(12);
  const [batchSize, setBatchSize] = useState(100);
  const [selectedNetworks, setSelectedNetworks] = useState(['bitcoin', 'ethereum']);
  const [foundWallets, setFoundWallets] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({
    totalScanned: 0,
    totalFound: 0,
    totalValue: 0
  });

  const handleStart = useCallback(async (options) => {
    if (selectedNetworks.length === 0) return;
    
    setIsRunning(true);
    const discovery = DiscoveryService.startDiscovery({
      ...options,
      networks: selectedNetworks
    });

    discovery.on('wallet', (wallet) => {
      setFoundWallets(prev => [...prev, wallet]);
      setStats(prev => ({
        totalScanned: prev.totalScanned + 1,
        totalFound: prev.totalFound + 1,
        totalValue: prev.totalValue + wallet.totalValueUSD
      }));
    });

    discovery.on('batch', (count) => {
      setStats(prev => ({
        ...prev,
        totalScanned: prev.totalScanned + count
      }));
    });
  }, [selectedNetworks]);

  const handleStop = useCallback(() => {
    DiscoveryService.stop();
    setIsRunning(false);
  }, []);

  const handleExport = useCallback((format) => {
    const content = DiscoveryService.exportWallets(format);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wallets-${Date.now()}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom sx={{
          background: 'linear-gradient(45deg, #00f7ff, #ff4081)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          mb: 4
        }}>
          Automated Wallet Discovery
        </Typography>

        <NetworkSelector
          selectedNetworks={selectedNetworks}
          onNetworkToggle={(network) => 
            setSelectedNetworks(prev => 
              prev.includes(network)
                ? prev.filter(n => n !== network)
                : [...prev, network]
            )
          }
        />

        <DiscoveryControls
          onStart={handleStart}
          onStop={handleStop}
          isRunning={isRunning}
          mode={mode}
          setMode={setMode}
          wordCount={wordCount}
          setWordCount={setWordCount}
          batchSize={batchSize}
          setBatchSize={setBatchSize}
        />

        <StatsDisplay stats={stats} />

        <WalletList
          wallets={foundWallets}
          onExport={handleExport}
        />
      </motion.div>
    </Box>
  );
};

export default WalletFinder;