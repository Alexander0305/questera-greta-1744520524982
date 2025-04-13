import React, { useState, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  LinearProgress,
  Alert
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PuzzleService from '../services/puzzleService';

const PuzzleScanner = () => {
  const [puzzleNumber, setPuzzleNumber] = useState('');
  const [rangeStart, setRangeStart] = useState('');
  const [rangeEnd, setRangeEnd] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleScan = useCallback(async () => {
    if (!puzzleNumber || !rangeStart || !rangeEnd) {
      setError('Please fill in all fields');
      return;
    }

    setIsScanning(true);
    setError(null);
    setResults([]);
    setProgress(0);

    try {
      const scanResults = await PuzzleService.startPuzzleScan({
        puzzleNumber: parseInt(puzzleNumber),
        rangeStart,
        rangeEnd,
        batchSize: 1000
      });

      setResults(scanResults);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsScanning(false);
    }
  }, [puzzleNumber, rangeStart, rangeEnd]);

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
          Bitcoin Puzzle Scanner
        </Typography>

        <Card sx={{
          mb: 4,
          background: 'rgba(17, 34, 64, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 247, 255, 0.1)'
        }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Puzzle Number"
                  type="number"
                  value={puzzleNumber}
                  onChange={(e) => setPuzzleNumber(e.target.value)}
                  disabled={isScanning}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Range Start"
                  value={rangeStart}
                  onChange={(e) => setRangeStart(e.target.value)}
                  disabled={isScanning}
                  placeholder="Hex or Decimal"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Range End"
                  value={rangeEnd}
                  onChange={(e) => setRangeEnd(e.target.value)}
                  disabled={isScanning}
                  placeholder="Hex or Decimal"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleScan}
                  disabled={isScanning}
                  sx={{
                    py: 1.5,
                    background: 'linear-gradient(45deg, #00f7ff, #2196f3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #00f7ff, #2196f3)',
                      opacity: 0.9
                    }
                  }}
                >
                  {isScanning ? 'Scanning...' : 'Start Scan'}
                </Button>
              </Grid>
            </Grid>

            {isScanning && (
              <Box sx={{ mt: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(45deg, #00f7ff, #ff4081)',
                    }
                  }}
                />
                <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                  Progress: {progress.toFixed(1)}%
                </Typography>
              </Box>
            )}

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
                </motion.div>
              )}

              {results.map((result, index) => (
                <motion.div
                  key={result.privateKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card sx={{ mt: 2, background: 'rgba(0, 247, 255, 0.1)' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Found Solution for Puzzle {result.puzzleNumber}
                      </Typography>
                      <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>
                        Address: {result.address}
                      </Typography>
                      <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>
                        Private Key: {result.privateKey}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default PuzzleScanner;