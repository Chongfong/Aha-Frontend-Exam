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
  const [debouncedPassword, setDebouncedPassword] = useState(password);

  const checkValidation = (inputPassword: string): ValidationStatus => ({
    length: inputPassword.length >= 8,
    uppercase: /[A-Z]/.test(inputPassword),
    lowercase: /[a-z]/.test(inputPassword),
    number: /[0-9]/.test(inputPassword),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(inputPassword),
  });

  const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedHandleChange = debounce((newPassword: string) => {
    setDebouncedPassword(newPassword);
  }, 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setShowErrors(true);
    debouncedHandleChange(newPassword);
  };

  const validationStatus = checkValidation(debouncedPassword);

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
        sx={{
          width: 335,
          boxSizing: 'border-box',
          'MuiOutlinedInput-root': { borderRadius: '8px' },
          '.MuiInputLabel-root': { color: 'white', paddingX: '2px' },
          '.MuiOutlinedInput-notchedOutline': { borderWidth: '3px' },
          '.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '3px solid #00A3FF',
          },
        }}
        name='password'
        type='password'
        label='Password'
        variant='outlined'
        placeholder='Password'
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
          boxSizing='border-box'
          bgcolor='#242424'
          p='8px 12px'
          borderRadius='8px'
        >
          {validationCriteria.map((criteria) => (
            <Box
              display='flex'
              gap='10px'
              alignItems='center'
              key={criteria.key}
              textAlign='left'
              height={criteria.key === 'specialChar' ? 50 : 'auto'}
            >
              {validationStatus[criteria.key as keyof ValidationStatus] ? (
                <CheckCircleIcon fontSize='medium' sx={{ color: '#00D1FF' }} />
              ) : (
                <CheckCircleOutlineIcon fontSize='medium' color='disabled' />
              )}
              <Box display='flex' height={40} width={289} alignItems='center'>
                <Typography
                  variant='body2'
                  color='white'
                  sx={{
                    letterSpacing: '0.25px',
                    lineHeight: '21px',
                    fontFamily: 'Ubuntu',
                    fontSize: '14px',
                  }}
                >
                  {criteria.text}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Box width={335} height={226} />
      )}
    </Box>
  );
}

export default Password;
