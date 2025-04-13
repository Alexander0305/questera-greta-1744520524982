import axios from 'axios';
import { ethers } from 'ethers';

class NetworkService {
  constructor() {
    this.providers = {
      ethereum: {
        rpc: new ethers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/demo'),
        explorer: 'https://etherscan.io'
      },
      binance: {
        rpc: new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org'),
        explorer: 'https://bscscan.com'
      }
    };
    
    this.priceCache = new Map();
    this.lastPriceUpdate = 0;
  }

  async getBalance(network, address) {
    let balance = '0';

    try {
      switch (network) {
        case 'ethereum': {
          const ethBalance = await this.providers.ethereum.rpc.getBalance(address);
          balance = ethers.formatEther(ethBalance);
          break;
        }
        case 'binance': {
          const bnbBalance = await this.providers.binance.rpc.getBalance(address);
          balance = ethers.formatEther(bnbBalance);
          break;
        }
        case 'bitcoin': {
          const btcResponse = await axios.get(
            `https://blockchain.info/balance?active=${address}`,
            { timeout: 5000 }
          );
          balance = (btcResponse.data[address].final_balance / 100000000).toString();
          break;
        }
      }
      return balance;
    } catch (error) {
      console.error(`Error getting ${network} balance:`, error);
      return '0';
    }
  }

  async getPrices() {
    const now = Date.now();
    const cacheExpiry = 60000; // 1 minute

    if (this.lastPriceUpdate > now - cacheExpiry) {
      return Object.fromEntries(this.priceCache);
    }

    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price',
        {
          params: {
            ids: 'bitcoin,ethereum,binancecoin',
            vs_currencies: 'usd'
          },
          timeout: 5000
        }
      );

      Object.entries(response.data).forEach(([coin, data]) => {
        this.priceCache.set(coin, data.usd);
      });

      this.lastPriceUpdate = now;
      return response.data;
    } catch (error) {
      console.error('Error fetching prices:', error);
      return Object.fromEntries(this.priceCache) || {};
    }
  }

  getExplorerUrl(network, address) {
    const explorer = this.providers[network]?.explorer;
    return explorer ? `${explorer}/address/${address}` : null;
  }

  async getGasPrice(network) {
    let gasPrice = null;

    try {
      switch (network) {
        case 'ethereum':
          gasPrice = await this.providers.ethereum.rpc.getFeeData();
          break;
        case 'binance':
          gasPrice = await this.providers.binance.rpc.getFeeData();
          break;
      }
      return gasPrice;
    } catch (error) {
      console.error(`Error getting ${network} gas price:`, error);
      return null;
    }
  }
}

export default new NetworkService();