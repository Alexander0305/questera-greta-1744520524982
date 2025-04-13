import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import { WalletProvider } from './context/WalletContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import WalletFinder from './pages/WalletFinder';
import VanityAddress from './pages/VanityAddress';
import PuzzleScanner from './pages/PuzzleScanner';
import Settings from './pages/Settings';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WalletProvider>
          <Router>
            <Layout>
              <div className="content-container">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/finder" element={<WalletFinder />} />
                  <Route path="/vanity" element={<VanityAddress />} />
                  <Route path="/puzzle" element={<PuzzleScanner />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </div>
            </Layout>
          </Router>
        </WalletProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;