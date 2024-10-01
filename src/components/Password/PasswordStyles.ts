const passwordStyles = {
  containerBox: {
    display: 'flex',
    gap: '20px',
    flexDirection: 'column',
    width: 335,
  },
  passwordInput: {
    width: 335,
    boxSizing: 'border-box',
    '& label.Mui-focused': { color: 'white' },
    '.MuiOutlinedInput-root': { borderRadius: '8px' },
    '.MuiInputLabel-root': { color: 'white', paddingX: '2px' },
    '.MuiOutlinedInput-notchedOutline': { borderWidth: '3px' },
    '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '3px solid #00A3FF',
    },
  },
  validationBox: {
    display: 'flex',
    flexDirection: 'column',
    width: 335,
    boxSizing: 'border-box',
    bgcolor: '#242424',
    p: '8px 12px',
    borderRadius: '8px',
  },
  validationLists: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    textAlign: 'left',
  },
  validationTextBox: {
    display: 'flex',
    height: 40,
    width: 289,
    alignItems: 'center',
  },
  validationText: {
    color: 'white',
    letterSpacing: '0.25px',
    lineHeight: '21px',
    fontFamily: 'Ubuntu',
    fontSize: '14px',
  },
};

export default passwordStyles;
