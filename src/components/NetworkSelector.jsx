import React from 'react';
import { Grid, Card, CardContent, Typography, Checkbox, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { networks } from '../config/networks';

const NetworkSelector = ({ selectedNetworks, onNetworkToggle }) => {
  return (
    <Grid container spacing={2}>
      {Object.entries(networks).map(([key, network], index) => {
        const Icon = network.icon;
        return (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  background: selectedNetworks.includes(key) ? network.theme.background : 'rgba(17, 34, 64, 0.8)',
                  border: `1px solid ${selectedNetworks.includes(key) ? network.theme.primary : 'rgba(0, 247, 255, 0.1)'}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 8px 24px ${network.theme.background}`,
                  }
                }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                      sx={{
                        color: network.theme.primary,
                        mr: 2
                      }}
                    >
                      <Icon size={24} />
                    </IconButton>
                    <div>
                      <Typography variant="h6" sx={{ color: network.theme.primary }}>
                        {network.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {network.symbol}
                      </Typography>
                    </div>
                  </div>
                  <Checkbox
                    checked={selectedNetworks.includes(key)}
                    onChange={() => onNetworkToggle(key)}
                    sx={{
                      color: network.theme.primary,
                      '&.Mui-checked': {
                        color: network.theme.primary,
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        )
      })}
    </Grid>
  );
};

export default NetworkSelector;