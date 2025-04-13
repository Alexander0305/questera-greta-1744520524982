import { ethers } from 'ethers';
import * as bitcoin from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
import { Buffer } from 'buffer';
import WorkerPool from './workerPool';

class VanityService {
  constructor() {
    this.workerPool = new WorkerPool();
    this.running = false;
    this.difficulty = 0;
  }

  async generateVanityAddress(options) {
    const {
      prefix,
      suffix,
      network = 'ethereum',
      caseSensitive = true,
      maxAttempts = 100000,
      difficulty = 0
    } = options;

    this.running = true;
    this.difficulty = difficulty;

    if (network === 'bitcoin') {
      return this.generateBitcoinVanity(prefix, suffix, caseSensitive, maxAttempts);
    }
    return this.generateEthereumVanity(prefix, suffix, caseSensitive, maxAttempts);
  }

  async generateBitcoinVanity(prefix, suffix, caseSensitive, maxAttempts) {
    let attempts = 0;
    const network = bitcoin.networks.bitcoin;
    
    while (this.running && attempts < maxAttempts) {
      const keyPair = bitcoin.ECPair.makeRandom({ network });
      const { address } = bitcoin.payments.p2pkh({
        pubkey: keyPair.publicKey,
        network
      });

      const matchesPrefix = caseSensitive 
        ? address.startsWith('1' + prefix)
        : address.toLowerCase().startsWith(('1' + prefix).toLowerCase());

      const matchesSuffix = suffix 
        ? (caseSensitive 
            ? address.endsWith(suffix)
            : address.toLowerCase().endsWith(suffix.toLowerCase()))
        : true;

      if (matchesPrefix && matchesSuffix) {
        return {
          address,
          privateKey: keyPair.toWIF(),
          attempts
        };
      }

      attempts++;
    }

    throw new Error('Max attempts reached');
  }

  async generateEthereumVanity(prefix, suffix, caseSensitive, maxAttempts) {
    let attempts = 0;
    
    while (this.running && attempts < maxAttempts) {
      const wallet = ethers.Wallet.createRandom();
      const address = wallet.address;

      const matchesPrefix = caseSensitive 
        ? address.slice(2).startsWith(prefix)
        : address.slice(2).toLowerCase().startsWith(prefix.toLowerCase());

      const matchesSuffix = suffix 
        ? (caseSensitive 
            ? address.endsWith(suffix)
            : address.toLowerCase().endsWith(suffix.toLowerCase()))
        : true;

      if (matchesPrefix && matchesSuffix) {
        return {
          address,
          privateKey: wallet.privateKey,
          attempts
        };
      }

      attempts++;
    }

    throw new Error('Max attempts reached');
  }

  stop() {
    this.running = false;
  }
}

export default new VanityService();