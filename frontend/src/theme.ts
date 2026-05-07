import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c3e50', // Deep Navy
      light: '#34495e',
    },
    secondary: {
      main: '#e67e22', // Bookish Orange/Carrot
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    button: {
      textTransform: 'none', // Keeps buttons looking modern, not all-caps
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8, // Softer, modern corners for Cards and Buttons
  },
});

export default theme;
