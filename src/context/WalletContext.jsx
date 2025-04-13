import React, { createContext, useContext, useState, useCallback } from 'react';
import useWallet from '../hooks/useWallet';

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const [selectedNetworks, setSelectedNetworks] = useState(['bitcoin', 'ethereum']);
  const wallet = useWallet(selectedNetworks);
  const [settings, setSettings] = useState({
    enableAI: true,
    autoWithdraw: false,
    realTimeUpdates: true,
    autoExport: false
  });

  const updateSettings = useCallback((newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const toggleNetwork = useCallback((network) => {
    setSelectedNetworks(prev => 
      prev.includes(network)
        ? prev.filter(n => n !== network)
        : [...prev, network]
    );
  }, []);

  const value = {
    ...wallet,
    selectedNetworks,
    toggleNetwork,
    settings,
    updateSettings
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
};

export default WalletContext;