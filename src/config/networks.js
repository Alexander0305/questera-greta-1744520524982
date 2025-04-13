import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { SiLitecoin, SiDogecoin, SiBinance, SiCardano } from 'react-icons/si';

export const networks = {
  bitcoin: {
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: FaBitcoin,
    theme: {
      primary: '#F7931A',
      secondary: '#4D3B21',
      gradient: 'linear-gradient(45deg, #F7931A, #FFAD33)',
      background: 'rgba(247, 147, 26, 0.1)'
    },
    derivationPath: "m/44'/0'/0'/0/0"
  },
  ethereum: {
    name: 'Ethereum',
    symbol: 'ETH',
    icon: FaEthereum,
    theme: {
      primary: '#627EEA',
      secondary: '#343434',
      gradient: 'linear-gradient(45deg, #627EEA, #8CA3F2)',
      background: 'rgba(98, 126, 234, 0.1)'
    },
    derivationPath: "m/44'/60'/0'/0/0"
  },
  binance: {
    name: 'Binance Smart Chain',
    symbol: 'BNB',
    icon: SiBinance,
    theme: {
      primary: '#F3BA2F',
      secondary: '#2A2A2A',
      gradient: 'linear-gradient(45deg, #F3BA2F, #FCD05C)',
      background: 'rgba(243, 186, 47, 0.1)'
    },
    derivationPath: "m/44'/714'/0'/0/0"
  },
  cardano: {
    name: 'Cardano',
    symbol: 'ADA',
    icon: SiCardano,
    theme: {
      primary: '#0033AD',
      secondary: '#1A1A1A',
      gradient: 'linear-gradient(45deg, #0033AD, #0055FF)',
      background: 'rgba(0, 51, 173, 0.1)'
    },
    derivationPath: "m/1852'/1815'/0'/0/0"
  },
  litecoin: {
    name: 'Litecoin',
    symbol: 'LTC',
    icon: SiLitecoin,
    theme: {
      primary: '#345D9D',
      secondary: '#1A1A1A',
      gradient: 'linear-gradient(45deg, #345D9D, #4F8AE7)',
      background: 'rgba(52, 93, 157, 0.1)'
    },
    derivationPath: "m/44'/2'/0'/0/0"
  },
  dogecoin: {
    name: 'Dogecoin',
    symbol: 'DOGE',
    icon: SiDogecoin,
    theme: {
      primary: '#C2A633',
      secondary: '#1A1A1A',
      gradient: 'linear-gradient(45deg, #C2A633, #E1C567)',
      background: 'rgba(194, 166, 51, 0.1)'
    },
    derivationPath: "m/44'/3'/0'/0/0"
  }
};