import React from 'react';
import { Box, Card, CardContent, Typography, Switch, FormGroup, FormControlLabel } from '@mui/material';
import { motion } from 'framer-motion';

const Settings = () => {
  const settings = [
    { label: 'Enable AI Mode', default: true },
    { label: 'Auto-withdraw Found Funds', default: false },
    { label: 'Real-time Balance Updates', default: true },
    { label: 'Export Results Automatically', default: false },
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            background: 'linear-gradient(45deg, #00f7ff, #ff4081)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            mb: 4
          }}
        >
          Settings
        </Typography>

        <Card sx={{
          background: 'rgba(17, 34, 64, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 247, 255, 0.1)',
        }}>
          <CardContent>
            <FormGroup>
              {settings.map((setting, index) => (
                <motion.div
                  key={setting.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <FormControlLabel
                    control={<Switch defaultChecked={setting.default} />}
                    label={setting.label}
                    sx={{ my: 1 }}
                  />
                </motion.div>
              ))}
            </FormGroup>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Settings;