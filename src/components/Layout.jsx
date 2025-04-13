import React from 'react';
import { Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Dashboard as DashboardIcon,
  Search as SearchIcon,
  Tag as VanityIcon,
  Extension as PuzzleIcon,
  Settings as SettingsIcon 
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const drawerWidth = 240;

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'AI Finder', icon: <SearchIcon />, path: '/finder' },
    { text: 'Vanity Address', icon: <VanityIcon />, path: '/vanity' },
    { text: 'Puzzle Scanner', icon: <PuzzleIcon />, path: '/puzzle' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'rgba(17, 34, 64, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0, 247, 255, 0.1)',
        }}
      >
        <Toolbar>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                background: 'linear-gradient(45deg, #00f7ff, #ff4081)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                fontWeight: 'bold',
                letterSpacing: '0.1em',
              }}
            >
              ULTRA X WALLET
            </Typography>
          </motion.div>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'rgba(17, 34, 64, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRight: '1px solid rgba(0, 247, 255, 0.1)',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ListItem
                  button
                  onClick={() => navigate(item.path)}
                  sx={{
                    my: 0.5,
                    mx: 1,
                    borderRadius: 2,
                    backgroundColor: location.pathname === item.path ? 'rgba(0, 247, 255, 0.1)' : 'transparent',
                    '&:hover': {
                      background: 'rgba(0, 247, 255, 0.1)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: location.pathname === item.path ? theme.palette.primary.main : 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontWeight: location.pathname === item.path ? 600 : 500,
                        color: location.pathname === item.path ? theme.palette.primary.main : 'inherit',
                      },
                    }}
                  />
                </ListItem>
              </motion.div>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          background: theme.palette.background.default,
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;