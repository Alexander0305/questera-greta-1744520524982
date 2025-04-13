import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00f7ff',
      light: '#5cffff',
      dark: '#00c4cc',
    },
    secondary: {
      main: '#ff4081',
      light: '#ff79b0',
      dark: '#c60055',
    },
    background: {
      default: '#0a192f',
      paper: '#112240',
    },
    text: {
      primary: '#e6f1ff',
      secondary: '#8892b0',
    },
  },
  typography: {
    fontFamily: '"Rajdhani", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      letterSpacing: '0.1em',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#0a192f',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#00f7ff',
            borderRadius: '3px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          padding: '10px 20px',
          fontSize: '1rem',
          fontWeight: 500,
          boxShadow: '0 0 10px rgba(0, 247, 255, 0.3)',
          '&:hover': {
            boxShadow: '0 0 20px rgba(0, 247, 255, 0.5)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(17, 34, 64, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 247, 255, 0.1)',
          borderRadius: '16px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(0, 247, 255, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 247, 255, 0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00f7ff',
            },
          },
        },
      },
    },
  },
});