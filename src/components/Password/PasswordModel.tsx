import { useState } from 'react';

export interface ValidationStatus {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  specialChar: boolean;
}

export const validationCriteria: { key: keyof ValidationStatus; text: string }[] = [
  { key: 'uppercase', text: 'Have at least one uppercase letter' },
  { key: 'lowercase', text: 'Have at least one lowercase letter' },
  { key: 'number', text: 'Have at least one number' },
  { key: 'specialChar', text: 'Have at least one special character (!@#$...etc)' },
  { key: 'length', text: 'Longer than 8 characters' },
];

export function usePasswordModel() {
  const [password, setPassword] = useState('');
  const [debouncedPassword, setDebouncedPassword] = useState(password);
  const [showValidations, setShowValidations] = useState(false);

  return {
    password,
    debouncedPassword,
    showValidations,
    setPassword,
    setDebouncedPassword,
    setShowValidations,
  };
}
