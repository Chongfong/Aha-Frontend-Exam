export const datePickerStyles = {
  dateInput: {
    width: 335,
    height: 58,
    boxSizing: 'border-box',
    '.MuiOutlinedInput-root': { borderRadius: '8px' },
    '.MuiInputLabel-root': { color: 'white', paddingX: '2px' },
    '.MuiOutlinedInput-notchedOutline': { borderWidth: '3px' },
    '.MuiInputLabel-root.Mui-focused': {
      color: 'white',
    },
    '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '3px solid white',
    },
  },
  spareBox: {
    width: '320px',
    height: '469px',
    marginTop: '14px',
  },
  yearButton: {
    borderRadius: '2px',
    height: '24px',
    lineHeight: '24px',
    '&:hover': { backgroundColor: 'white', color: '#181818', borderRadius: 0 },
  },
  datePicker: {
    bgcolor: '#181818',
    width: '320px',
    height: '469px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    marginTop: '14px',
    h4: {
      margin: 0,
    },
    '.MuiBox-root': {
      alignItems: 'flex-start',
    },
    '.MuiYearCalendar-root': {
      marginTop: '-1px',
      gap: '24px 9px',
      padding: '0 25px 0 24px',
    },
    '.MuiDayCalendar-monthContainer': {
      position: 'relative',
      top: '11px',
    },
    '.MuiPickersDay-dayOutsideMonth': {
      color: 'grey',
    },
    '.MuiPickersLayout-actionBar': {
      gap: '32px',
      padding: '11px 22px 18px 0',
    },
    '.MuiPickersLayout-actionBar .MuiButton-root': {
      fontSize: '14px',
      fontWeight: '600',
      lineHeight: '24px',
      textAlign: 'left',
      color: 'white',
      textTransform: 'none',
    },
    '.MuiTypography-root': {
      color: 'white',
      textTransform: 'none',
      fontSize: '16px',
      letterSpacing: '1px',
      lineHeight: '24px',
    },
    '.MuiDayCalendar-header': {
      gap: '6px',
    },
    '.MuiDayCalendar-weekContainer': {
      margin: 0,
      gap: '6px',
    },
    '.MuiDayCalendar-weekDayLabel': {
      color: '#929292',
      fontSize: '11px',
      fontWeight: '400',
      lineHeight: '13px',
      textAlign: 'center',
      height: '13px',
      margin: 0,
    },
    '.MuiDateCalendar-root': {
      maxHeight: '300px',
    },
    '.MuiPickersLayout-toolbar .MuiDatePickerToolbar-title': {
      fontWeight: 'bold',
      fontSize: '32px',
      lineHeight: '44px',
    },
    '.MuiDatePickerToolbar-root': {
      padding: '17px 24px 14px',
      gap: '5px',
    },
    '.MuiDateCalendar-root .MuiPickersDay-today': {
      border: '1px solid #00A3FF',
    },
    '.MuiPickersDay-root.Mui-selected.Mui-selected': {
      backgroundColor: '#00A3FF',
      color: 'white',
      fontWeight: '400',
    },
    '.MuiPickersDay-root': {
      fontSize: '14px',
      lineHeight: '20.02px',
      margin: 0,
      '&:hover': { backgroundColor: 'white', color: '#181818' },
      '&:focus': { backgroundColor: '#00A3FF', color: 'white' },
    },
    '.MuiPickersYear-root': {
      width: '61px',
      height: '24px',
      padding: 0,
      flex: 0,
    },
    '.MuiPickersYear-yearButton.Mui-selected': {
      backgroundColor: '#00A3FF',
      color: 'white',
      fontWeight: '400',
    },
  },
};

export const calendarHeaderStyles = {
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 5px 13px 3px',
    alignItems: 'center',
  },
  headerText: {
    cursor: 'pointer',
    paddingTop: '6px',
  },
};
