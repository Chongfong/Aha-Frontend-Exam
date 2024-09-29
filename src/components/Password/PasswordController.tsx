import { usePasswordModel, ValidationStatus } from './PasswordModel';

export default function PasswordController() {
  const {
    password,
    debouncedPassword,
    showValidations,
    setPassword,
    setDebouncedPassword,
    setShowValidations,
  } = usePasswordModel();

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
    setShowValidations(true);
    debouncedHandleChange(newPassword);
  };

  const validationStatus = checkValidation(debouncedPassword);

  return {
    password,
    debouncedPassword,
    showValidations,
    setShowValidations,
    handleChange,
    validationStatus,
  };
}
