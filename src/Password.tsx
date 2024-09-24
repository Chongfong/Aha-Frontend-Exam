import React, { useState } from 'react';
import { TextField, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

function Password() {
  const [showErrors, setShowErrors] = useState(false);
  const [password, setPassword] = useState('');
  const checkValidation = (inputPassword: string) => ({
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
        onBlur={() => setShowErrors(false)}
        value={password}
      />
      {showErrors && (
        <Box display='flex' flexDirection='column' mt={2}>
          <List>
            <ListItem>
              <ListItemIcon>
                {validationStatus.uppercase ? (
                  <CheckCircleIcon color='primary' />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </ListItemIcon>
              <ListItemText primary='Have at least one uppercase letter' />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                {validationStatus.lowercase ? (
                  <CheckCircleIcon color='primary' />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </ListItemIcon>
              <ListItemText primary='Have at least one lowercase letter' />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                {validationStatus.number ? (
                  <CheckCircleIcon color='primary' />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </ListItemIcon>
              <ListItemText primary='Have at least one number' />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                {validationStatus.specialChar ? (
                  <CheckCircleIcon color='primary' />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </ListItemIcon>
              <ListItemText primary='Have at least one special character (!@#$...etc)' />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                {validationStatus.length ? (
                  <CheckCircleIcon color='primary' />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </ListItemIcon>
              <ListItemText primary='Longer than 8 characters' />
            </ListItem>
          </List>
        </Box>
      )}
    </Box>
  );
}

export default Password;
