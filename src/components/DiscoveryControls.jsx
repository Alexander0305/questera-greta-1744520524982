import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel
} from '@mui/material';
import { motion } from 'framer-motion';
import { FaPlay, FaStop } from 'react-icons/fa';

const DiscoveryControls = ({
  onStart,
  onStop,
  isRunning,
  mode,
  setMode,
  wordCount,
  setWordCount,
  batchSize,
  setBatchSize
}) => {
  const [rangeStart, setRangeStart] = useState('');
  const [rangeEnd, setRangeEnd] = useState('');
  const [autoWithdraw, setAutoWithdraw] = useState(false);

  const handleStart = () => {
    const options = {
      mode,
      wordCount,
      batchSize,
      autoWithdraw,
      ...(mode === 'range' && {
        targetRange: {
          start: rangeStart,
          end: rangeEnd
        }
      })
    };
    onStart(options);
  };

  return (
    <Card sx={{
      mb: 4,
      background: 'rgba(17, 34, 64, 0.8)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(0, 247, 255, 0.1)'
    }}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Discovery Mode</InputLabel>
              <Select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                disabled={isRunning}
              >
                <MenuItem value="ai">AI Mode</MenuItem>
                <MenuItem value="bulk">Bulk Discovery</MenuItem>
                <MenuItem value="range">Range Search</MenuItem>
                <MenuItem value="puzzle">Bitcoin Puzzle</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Word Count</InputLabel>
              <Select
                value={wordCount}
                onChange={(e) => setWordCount(e.target.value)}
                disabled={isRunning || mode === 'range' || mode === 'puzzle'}
              >
                <MenuItem value={12}>12 Words</MenuItem>
                <MenuItem value={24}>24 Words</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {mode === 'range' && (
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Range Start"
                  value={rangeStart}
                  onChange={(e) => setRangeStart(e.target.value)}
                  disabled={isRunning}
                  placeholder="Hex or Decimal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Range End"
                  value={rangeEnd}
                  onChange={(e) => setRangeEnd(e.target.value)}
                  disabled={isRunning}
                  placeholder="Hex or Decimal"
                />
              </Grid>
            </>
          )}

          {(mode === 'ai' || mode === 'bulk') && (
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Batch Size"
                value={batchSize}
                onChange={(e) => setBatchSize(Number(e.target.value))}
                disabled={isRunning}
                InputProps={{ inputProps: { min: 1, max: 1000 } }}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={autoWithdraw}
                  onChange={(e) => setAutoWithdraw(e.target.checked)}
                  disabled={isRunning}
                />
              }
              label="Auto-withdraw found balances"
            />
          </Grid>

          <Grid item xs={12}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="contained"
                fullWidth
                onClick={isRunning ? onStop : handleStart}
                startIcon={isRunning ? <FaStop /> : <FaPlay />}
                sx={{
                  py: 1.5,
                  background: isRunning
                    ? 'linear-gradient(45deg, #ff4081, #ff0000)'
                    : 'linear-gradient(45deg, #00f7ff, #2196f3)',
                  '&:hover': {
                    background: isRunning
                      ? 'linear-gradient(45deg, #ff4081, #ff0000)'
                      : 'linear-gradient(45deg, #00f7ff, #2196f3)',
                    opacity: 0.9
                  }
                }}
              >
                {isRunning ? 'Stop Discovery' : 'Start Discovery'}
              </Button>
            </motion.div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DiscoveryControls;