import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import DatePicker from './DatePicker';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <div className='App'>
      <ThemeProvider theme={darkTheme}>
        <header className='App-header'>
          <DatePicker />
        </header>
      </ThemeProvider>
    </div>
  );
}

export default App;
