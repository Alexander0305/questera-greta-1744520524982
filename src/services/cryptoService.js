import { ethers } from 'ethers';
import * as bitcoin from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
import axios from 'axios';
import { Buffer } from 'buffer';

class CryptoService {
  constructor() {
    this.providers = {
      ethereum: new ethers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/demo'),
      binance: new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org'),
    };
    
    this.networks = {
      bitcoin: bitcoin.networks.bitcoin,
      testnet: bitcoin.networks.testnet
    };
  }

  async generateWallet(type = 'ethereum') {
    const wallet = ethers.Wallet.createRandom();
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic?.phrase
    };
  }

  async generateWalletFromMnemonic(mnemonic, network = 'ethereum', index = 0) {
    try {
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const hdNode = ethers.HDNodeWallet.fromSeed(seed);
      let walletData;

      switch(network) {
        case 'ethereum': {
          const ethPath = `m/44'/60'/0'/0/${index}`;
          const ethWallet = hdNode.derivePath(ethPath);
          walletData = {
            address: ethWallet.address,
            privateKey: ethWallet.privateKey,
            path: ethPath
          };
          break;
        }
        case 'bitcoin': {
          const btcPath = `m/44'/0'/0'/0/${index}`;
          const root = bitcoin.bip32.fromSeed(Buffer.from(seed), this.networks.bitcoin);
          const btcNode = root.derivePath(btcPath);
          const { address } = bitcoin.payments.p2pkh({
            pubkey: btcNode.publicKey,
            network: this.networks.bitcoin
          });
          walletData = {
            address,
            privateKey: btcNode.privateKey.toString('hex'),
            path: btcPath
          };
          break;
        }
        default:
          throw new Error(`Unsupported network: ${network}`);
      }

      return walletData;
    } catch (error) {
      console.error('Error generating wallet:', error);
      throw error;
    }
  }

  async checkBalance(address, network = 'ethereum') {
    let balance = '0';

    try {
      switch(network) {
        case 'ethereum': {
          const ethBalance = await this.providers.ethereum.getBalance(address);
          balance = ethers.formatEther(ethBalance);
          break;
        }
        case 'bitcoin': {
          const response = await axios.get(
            `https://blockchain.info/balance?active=${address}`,
            { timeout: 5000 }
          );
          balance = (response.data[address].final_balance / 100000000).toString();
          break;
        }
        case 'binance': {
          const bnbBalance = await this.providers.binance.getBalance(address);
          balance = ethers.formatEther(bnbBalance);
          break;
        }
        default:
          balance = '0';
      }

      return balance;
    } catch (error) {
      console.error(`Error checking ${network} balance:`, error);
      return '0';
    }
  }

  validateAddress(address, network = 'ethereum') {
    try {
      switch(network) {
        case 'ethereum':
          return ethers.isAddress(address);
        case 'bitcoin':
          try {
            bitcoin.address.toOutputScript(address, this.networks.bitcoin);
            return true;
          } catch {
            return false;
          }
        default:
          return false;
      }
    } catch {
      return false;
    }
  }

  async estimateGas(tx, network = 'ethereum') {
    let gasEstimate;

    try {
      switch(network) {
        case 'ethereum':
          gasEstimate = await this.providers.ethereum.estimateGas(tx);
          break;
        case 'binance':
          gasEstimate = await this.providers.binance.estimateGas(tx);
          break;
        default:
          throw new Error(`Unsupported network: ${network}`);
      }
      return gasEstimate;
    } catch (error) {
      console.error('Error estimating gas:', error);
      throw error;
    }
  }
}

export default new CryptoService();