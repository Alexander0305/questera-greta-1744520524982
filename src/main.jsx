import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Buffer } from 'buffer';
import App from './App';
import './index.css';

// Polyfill Buffer for crypto libraries
window.Buffer = Buffer;

// Create root element
const container = document.getElementById('root');
const root = createRoot(container);

// Render app
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);