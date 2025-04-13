import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { FaSearch, FaWallet, FaDollarSign } from 'react-icons/fa';

const StatsDisplay = ({ stats }) => {
  const displayItems = [
    {
      icon: <FaSearch size={24} />,
      title: 'Total Scanned',
      value: stats.totalScanned.toLocaleString(),
      color: '#00f7ff'
    },
    {
      icon: <FaWallet size={24} />,
      title: 'Wallets Found',
      value: stats.totalFound.toLocaleString(),
      color: '#ff4081'
    },
    {
      icon: <FaDollarSign size={24} />,
      title: 'Total Value',
      value: `$${stats.totalValue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`,
      color: '#50fa7b'
    }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {displayItems.map((item, index) => (
        <Grid item xs={12} md={4} key={item.title}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card sx={{
              background: 'rgba(17, 34, 64, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 247, 255, 0.1)',
            }}>
              <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ color: item.color, marginRight: '12px' }}>
                    {item.icon}
                  </div>
                  <Typography variant="h6" color="text.secondary">
                    {item.title}
                  </Typography>
                </div>
                <Typography variant="h4" sx={{
                  background: `linear-gradient(45deg, ${item.color}, white)`,
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                }}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsDisplay;