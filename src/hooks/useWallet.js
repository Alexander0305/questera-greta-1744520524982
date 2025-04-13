import { useState, useCallback, useEffect } from 'react';
import NetworkService from '../services/networkService';
import CryptoService from '../services/cryptoService';

export const useWallet = (networks = []) => {
  const [wallets, setWallets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateWallet = useCallback(async (mnemonic) => {
    try {
      const networkBalances = {};
      let totalValueUSD = 0;

      const priceData = await NetworkService.getPriceData();

      for (const network of networks) {
        const wallet = await CryptoService.generateWalletFromMnemonic(mnemonic);
        const balance = await NetworkService.getBalance(network, wallet.address);
        const valueUSD = balance * (priceData[network]?.usd || 0);

        networkBalances[network] = {
          address: wallet.address,
          privateKey: wallet.privateKey,
          balance,
          valueUSD
        };

        totalValueUSD += valueUSD;
      }

      return {
        mnemonic,
        networks: networkBalances,
        totalValueUSD,
        timestamp: Date.now()
      };
    } catch (err) {
      console.error('Error generating wallet:', err);
      throw err;
    }
  }, [networks]);

  const addWallet = useCallback((wallet) => {
    setWallets(prev => [...prev, wallet]);
  }, []);

  const removeWallet = useCallback((mnemonic) => {
    setWallets(prev => prev.filter(w => w.mnemonic !== mnemonic));
  }, []);

  const clearWallets = useCallback(() => {
    setWallets([]);
  }, []);

  return {
    wallets,
    isLoading,
    error,
    generateWallet,
    addWallet,
    removeWallet,
    clearWallets
  };
};

export default useWallet;