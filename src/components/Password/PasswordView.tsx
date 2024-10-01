import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PasswordController from './PasswordController';
import { validationCriteria } from './PasswordModel';
import passwordStyles from './PasswordStyles';

export default function Password() {
  const { showValidations, setShowValidations, handleChange, validationStatus, password } =
    PasswordController();

  return (
    <Box display='flex' gap='20px' flexDirection='column' width={335}>
      <TextField
        sx={passwordStyles.passwordInput}
        name='password'
        type='password'
        label='Password'
        variant='outlined'
        placeholder='Password'
        slotProps={{ inputLabel: { shrink: true } }}
        onChange={handleChange}
        onFocus={() => setShowValidations(true)}
        onBlur={() => setShowValidations(false)}
        value={password}
      />
      {showValidations ? (
        <Box sx={passwordStyles.validationBox}>
          {validationCriteria.map((criteria) => (
            <Box
              sx={passwordStyles.validationLists}
              key={criteria.key}
              height={criteria.key === 'specialChar' ? 50 : 'auto'}
            >
              {validationStatus[criteria.key] ? (
                <CheckCircleIcon fontSize='medium' sx={{ color: '#00D1FF' }} />
              ) : (
                <CheckCircleOutlineIcon fontSize='medium' color='disabled' />
              )}
              <Box sx={passwordStyles.validationTextBox}>
                <Typography variant='body2' sx={passwordStyles.validationText}>
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
