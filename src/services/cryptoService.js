import { ethers } from 'ethers';
import * as bitcoin from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
import axios from 'axios';

const BLOCKCHAIN_INFO_API = 'https://blockchain.info/balance';
const ETHERSCAN_API = 'https://api.etherscan.io/api';
const ETHERSCAN_API_KEY = 'YOUR_ETHERSCAN_API_KEY';

export class CryptoService {
  static async generateMnemonic(wordCount = 12) {
    const strength = wordCount === 24 ? 256 : 128;
    return bip39.generateMnemonic(strength);
  }

  static async mnemonicToSeed(mnemonic) {
    return bip39.mnemonicToSeedSync(mnemonic);
  }

  static async generateWalletFromMnemonic(mnemonic, index = 0) {
    const seed = await this.mnemonicToSeed(mnemonic);
    const hdNode = ethers.HDNodeWallet.fromSeed(seed);
    const wallet = hdNode.derivePath(`m/44'/60'/0'/0/${index}`);

    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
    };
  }

  static async generateBitcoinWallet(mnemonic, index = 0) {
    const seed = await this.mnemonicToSeed(mnemonic);
    const network = bitcoin.networks.bitcoin;
    const root = bitcoin.bip32.fromSeed(seed, network);
    const child = root.derivePath(`m/44'/0'/0'/0/${index}`);
    const { address } = bitcoin.payments.p2pkh({ 
      pubkey: child.publicKey,
      network 
    });

    return {
      address,
      privateKey: child.privateKey.toString('hex'),
    };
  }

  static async checkBitcoinBalance(address) {
    try {
      const response = await axios.get(`${BLOCKCHAIN_INFO_API}?active=${address}`);
      return response.data[address].final_balance / 100000000; // Convert satoshis to BTC
    } catch (error) {
      console.error('Error checking Bitcoin balance:', error);
      return 0;
    }
  }

  static async checkEthereumBalance(address) {
    try {
      const response = await axios.get(ETHERSCAN_API, {
        params: {
          module: 'account',
          action: 'balance',
          address,
          tag: 'latest',
          apikey: ETHERSCAN_API_KEY,
        },
      });
      return ethers.formatEther(response.data.result);
    } catch (error) {
      console.error('Error checking Ethereum balance:', error);
      return 0;
    }
  }
}

export default CryptoService;