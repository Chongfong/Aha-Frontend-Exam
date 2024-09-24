import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';

function Password() {
  const [password, setPassword] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  return (
    <Box>
      <TextField
        name='password'
        type='password'
        label='Password'
        variant='outlined'
        placeholder='password'
        slotProps={{ inputLabel: { shrink: true } }}
        onChange={handleChange}
        value={password}
      />
    </Box>
  );
}

export default Password;
