/* eslint-disable react/jsx-props-no-spreading */
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack, IconButton, Typography, TextField, Box } from '@mui/material';
import { PickersCalendarHeaderProps } from '@mui/x-date-pickers';
import { styled } from '@mui/material/styles';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { useCallback, useState } from 'react';

const CustomCalendarHeaderRoot = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '4px 5px 13px 3px',
  alignItems: 'center',
});

function CustomCalendarHeader(
  props: PickersCalendarHeaderProps<Dayjs> & {
    onOpenYearSelector: () => void;
    openYear: boolean;
  },
) {
  const { currentMonth, onMonthChange, onOpenYearSelector, openYear } = props;

  const selectNextMonth = () => onMonthChange(currentMonth.add(1, 'month'), 'left');
  const selectPreviousMonth = () => onMonthChange(currentMonth.subtract(1, 'month'), 'right');
  const selectNextYear = () => onMonthChange(currentMonth.add(1, 'year'), 'left');
  const selectPreviousYear = () => onMonthChange(currentMonth.subtract(1, 'year'), 'right');

  return (
    <CustomCalendarHeaderRoot>
      <Stack spacing={1} direction='row'>
        <IconButton
          onClick={openYear ? selectPreviousYear : selectPreviousMonth}
          title='Previous month/year'
        >
          <ChevronLeft />
        </IconButton>
      </Stack>
      <Typography
        variant='body2'
        onClick={onOpenYearSelector}
        style={{ cursor: 'pointer', paddingTop: '6px' }}
      >
        {openYear ? currentMonth.format('YYYY') : currentMonth.format('MMMM YYYY')}
      </Typography>
      <Stack spacing={1} direction='row'>
        <IconButton onClick={openYear ? selectNextYear : selectNextMonth} title='Next month/year'>
          <ChevronRight />
        </IconButton>
      </Stack>
    </CustomCalendarHeaderRoot>
  );
}

export default function DatePicker() {
  const [currentDate, setCurrentDate] = useState<Dayjs | null>(null);
  const [openYear, setOpenYear] = useState(false);
  const [inputDate, setInputDate] = useState(currentDate && currentDate.format('MM/DD/YYYY'));
  const [pickerOpen, setPickerOpen] = useState(false);

  const [tempDate, setTempDate] = useState<Dayjs | null>(null);

  const handleOpenYearSelector = useCallback(() => {
    setOpenYear(true);
  }, [setOpenYear]);

  const handleYearChange = () => {
    setOpenYear(false);
  };
  const CustomCalenderHeaderComponent = useCallback(
    (headerProps: PickersCalendarHeaderProps<dayjs.Dayjs>) => (
      <CustomCalendarHeader
        {...headerProps}
        onOpenYearSelector={handleOpenYearSelector}
        openYear={openYear}
      />
    ),
    [handleOpenYearSelector, openYear],
  );

  const handleDayClick = (newValue: Dayjs | null) => {
    setTempDate(newValue);
  };
  const handleAccept = () => {
    if (tempDate) {
      setCurrentDate(tempDate);
      setInputDate(tempDate.format('MM/DD/YYYY'));
    }
    setPickerOpen(false);
  };

  const handleCancel = () => {
    setTempDate(currentDate);
    setPickerOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDate(e.target.value);
  };

  const handleInputFocus = () => {
    setPickerOpen(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TextField
        label='Birthday'
        value={inputDate}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder='mm/dd/yyyy'
        slotProps={{ inputLabel: { shrink: true } }}
        sx={{
          width: 335,
          height: 58,
          boxSizing: 'border-box',
          '.MuiOutlinedInput-root': { borderRadius: '8px' },
          '.MuiInputLabel-root': { color: 'white', paddingX: '2px' },
          '.MuiOutlinedInput-notchedOutline': { borderWidth: '3px' },
          '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '3px solid white',
          },
        }}
      />
      {pickerOpen ? (
        <StaticDatePicker
          value={tempDate}
          onChange={handleDayClick}
          slots={{
            calendarHeader: CustomCalenderHeaderComponent,
          }}
          view={openYear ? 'year' : 'day'}
          onViewChange={(newView) => {
            if (newView !== 'year') {
              setOpenYear(false);
            }
          }}
          dayOfWeekFormatter={(weekday) => `${weekday.format('dd')}`}
          onYearChange={handleYearChange}
          displayStaticWrapperAs='desktop'
          showDaysOutsideCurrentMonth
          slotProps={{
            toolbar: { hidden: false, toolbarFormat: 'MMM, YYYY', toolbarPlaceholder: '__' },
            yearButton: {
              sx: {
                borderRadius: '2px',
                '&:hover': { backgroundColor: 'white', color: '#181818', borderRadius: 0 },
              },
            },
            actionBar: {
              actions: ['cancel', 'accept'],
              onAccept: handleAccept,
              onCancel: handleCancel,
            },
          }}
          sx={{
            bgcolor: '#181818',
            width: '320px',
            height: '469px',
            borderRadius: '10px',
            marginTop: '14px',
            '.MuiBox-root': {
              alignItems: 'flex-start',
            },
            '.MuiYearCalendar-root': {
              marginTop: '-1px',
              gap: '24px 9px',
              padding: '0 25px 0 24px',
            },
            '.MuiDayCalendar-monthContainer': {
              top: '11px',
            },
            '.MuiPickersDay-dayOutsideMonth': {
              color: 'grey',
            },
            '.MuiPickersLayout-actionBar': {
              gap: '32px',
              padding: '0px 22px 18px 0',
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
            '.Mui-selected': {
              backgroundColor: '#00A3FF',
              color: 'white',
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
            '.MuiPickersYear-yearButton': {
              height: '24px',
              lineHeight: '24px',
            },
          }}
        />
      ) : (
        <Box sx={{ width: '320px', height: '469px', marginTop: '14px' }} />
      )}
    </LocalizationProvider>
  );
}
