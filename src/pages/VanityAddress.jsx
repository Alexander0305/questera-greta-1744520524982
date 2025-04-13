import React, { useState, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
  LinearProgress,
  Alert
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import VanityService from '../services/vanityService';
import { networks } from '../config/networks';

const VanityAddress = () => {
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [network, setNetwork] = useState('ethereum');
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = useCallback(async () => {
    if (!prefix && !suffix) {
      setError('Please enter a prefix or suffix');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      const vanityAddress = await VanityService.generateVanityAddress({
        prefix,
        suffix,
        network,
        caseSensitive,
        maxAttempts: 100000
      });
      setResult(vanityAddress);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  }, [prefix, suffix, network, caseSensitive]);

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
          Vanity Address Generator
        </Typography>

        <Card sx={{
          mb: 4,
          background: 'rgba(17, 34, 64, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 247, 255, 0.1)'
        }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Address Prefix"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  disabled={isGenerating}
                  placeholder="e.g., 1ABC or 0x123"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Address Suffix"
                  value={suffix}
                  onChange={(e) => setSuffix(e.target.value)}
                  disabled={isGenerating}
                  placeholder="e.g., DEAD or FF"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Network</InputLabel>
                  <Select
                    value={network}
                    onChange={(e) => setNetwork(e.target.value)}
                    disabled={isGenerating}
                  >
                    <MenuItem value="bitcoin">Bitcoin</MenuItem>
                    <MenuItem value="ethereum">Ethereum</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={caseSensitive}
                      onChange={(e) => setCaseSensitive(e.target.checked)}
                      disabled={isGenerating}
                    />
                  }
                  label="Case Sensitive"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  sx={{
                    py: 1.5,
                    background: 'linear-gradient(45deg, #00f7ff, #2196f3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #00f7ff, #2196f3)',
                      opacity: 0.9
                    }
                  }}
                >
                  {isGenerating ? 'Generating...' : 'Generate Vanity Address'}
                </Button>
              </Grid>
            </Grid>

            {isGenerating && (
              <Box sx={{ mt: 2 }}>
                <LinearProgress
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(45deg, #00f7ff, #ff4081)',
                    }
                  }}
                />
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

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card sx={{ mt: 3, background: 'rgba(0, 247, 255, 0.1)' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Generated Address
                      </Typography>
                      <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>
                        Address: {result.address}
                      </Typography>
                      <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>
                        Private Key: {result.privateKey}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Generated in {result.attempts} attempts
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default VanityAddress;