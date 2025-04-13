import { ethers } from 'ethers';
import * as bitcoin from 'bitcoinjs-lib';
import WorkerPool from './workerPool';

class PuzzleService {
  constructor() {
    this.workerPool = new WorkerPool();
    this.running = false;
    this.puzzles = new Map([
      [66, '16jY7qLJnxb7CHZyqBP8qca9d51gAjyXQN'],
      [67, '16jZwB7rdX5ry6gjkDNd5HS1HKh4Uq7S1i'],
      [68, '16k4NsMvNwk5tK3YQ6XevBZtZ5pkK6YT8q'],
      // Add more puzzle addresses
    ]);
  }

  async startPuzzleScan(options) {
    const {
      puzzleNumber,
      rangeStart,
      rangeEnd,
      batchSize = 1000,
      threads = navigator.hardwareConcurrency || 4
    } = options;

    this.running = true;
    const puzzleAddress = this.puzzles.get(puzzleNumber);
    
    if (!puzzleAddress) {
      throw new Error('Invalid puzzle number');
    }

    const results = [];
    let current = BigInt(rangeStart);
    const end = BigInt(rangeEnd);
    const batchSizeBig = BigInt(batchSize);

    while (current < end && this.running) {
      const batchEnd = current + batchSizeBig;
      const batch = await this.scanBatch(current, batchEnd, puzzleAddress);
      
      if (batch.length > 0) {
        results.push(...batch);
      }
      
      current = batchEnd;
    }

    return results;
  }

  async scanBatch(start, end, targetAddress) {
    const results = [];
    let current = start;

    while (current < end && this.running) {
      const privateKey = current.toString(16).padStart(64, '0');
      
      try {
        const keyPair = bitcoin.ECPair.fromPrivateKey(
          Buffer.from(privateKey, 'hex'),
          { network: bitcoin.networks.bitcoin }
        );

        const { address } = bitcoin.payments.p2pkh({
          pubkey: keyPair.publicKey,
          network: bitcoin.networks.bitcoin
        });

        if (address === targetAddress) {
          results.push({
            address,
            privateKey,
            puzzleNumber: this.getPuzzleNumber(targetAddress)
          });
        }
      } catch (error) {
        console.error('Invalid private key:', privateKey);
      }

      current += BigInt(1);
    }

    return results;
  }

  getPuzzleNumber(address) {
    for (const [number, addr] of this.puzzles.entries()) {
      if (addr === address) return number;
    }
    return null;
  }

  stop() {
    this.running = false;
  }
}

export default new PuzzleService();