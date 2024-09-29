import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import DatePicker from './components/DatePicker';
import Password from './components/Password';

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
          <Password />
        </header>
      </ThemeProvider>
    </div>
  );
}

export default App;
