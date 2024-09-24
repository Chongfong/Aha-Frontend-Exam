import React, { useState } from 'react';
import { TextField, Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface ValidationStatus {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  specialChar: boolean;
}
function Password() {
  const [showErrors, setShowErrors] = useState(false);
  const [password, setPassword] = useState('');
  const checkValidation = (inputPassword: string): ValidationStatus => ({
    length: inputPassword.length >= 8,
    uppercase: /[A-Z]/.test(inputPassword),
    lowercase: /[a-z]/.test(inputPassword),
    number: /[0-9]/.test(inputPassword),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(inputPassword),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setShowErrors(true);
  };

  const validationStatus = checkValidation(password);

  const validationCriteria = [
    { key: 'uppercase', text: 'Have at least one uppercase letter' },
    { key: 'lowercase', text: 'Have at least one lowercase letter' },
    { key: 'number', text: 'Have at least one number' },
    { key: 'specialChar', text: 'Have at least one special character (!@#$...etc)' },
    { key: 'length', text: 'Longer than 8 characters' },
  ];

  return (
    <Box display='flex' gap='20px' flexDirection='column' width={335}>
      <TextField
        sx={{ width: 355, height: 58 }}
        name='password'
        type='password'
        label='Password'
        variant='outlined'
        placeholder='password'
        slotProps={{ inputLabel: { shrink: true } }}
        onChange={handleChange}
        onFocus={() => setShowErrors(true)}
        onBlur={() => setShowErrors(false)}
        value={password}
      />
      {showErrors ? (
        <Box
          display='flex'
          flexDirection='column'
          width={335}
          bgcolor='#242424'
          p='8px 12px'
          borderRadius='8px'
        >
          {validationCriteria.map((criteria) => (
            <Box
              display='flex'
              gap='10px'
              height={40}
              alignItems='center'
              key={criteria.key}
              textAlign='left'
            >
              {validationStatus[criteria.key as keyof ValidationStatus] ? (
                <CheckCircleIcon fontSize='medium' sx={{ color: '#00D1FF' }} />
              ) : (
                <CheckCircleOutlineIcon fontSize='medium' color='disabled' />
              )}
              <Typography variant='body2' color='white'>
                {criteria.text}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Box width={335} height={216} />
      )}
    </Box>
  );
}

export default Password;
