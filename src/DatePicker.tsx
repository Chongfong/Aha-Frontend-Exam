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
  padding: '4px 16px 8px 16px',
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
      <Typography variant='body2' onClick={onOpenYearSelector} style={{ cursor: 'pointer' }}>
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
        label='Select Date'
        value={inputDate}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder='MM/DD/YYYY'
        slotProps={{ inputLabel: { shrink: true } }}
        sx={{ width: 335, height: 58 }}
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
                '&:hover': { backgroundColor: 'white', color: '#181818' },
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
            '.MuiPickersDay-dayOutsideMonth': {
              color: 'grey',
            },
            '.MuiPickersLayout-actionBar': {
              gap: '30px',
              padding: '0px 27px 16px 0',
            },
            '.MuiPickersLayout-actionBar .MuiButton-root': {
              fontSize: '14px',
              fontWeight: '600',
              lineHeight: '24px',
              textAlign: 'left',
              color: 'white',
            },
            '.MuiTypography-root': {
              color: 'white',
              textTransform: 'none',
              fontSize: '16px',
              letterSpacing: '1px',
              lineHeight: '24px',
            },
            '.MuiDayCalendar-weekContainer': {
              margin: 0,
            },
            '.MuiDayCalendar-weekDayLabel': {
              color: '#929292',
              fontSize: '11px',
              fontWeight: '400',
              lineHeight: '13px',
              textAlign: 'center',
              height: '13px',
            },
            '.MuiDateCalendar-root': {
              maxHeight: '317px',
            },
            '.MuiPickersLayout-toolbar .MuiDatePickerToolbar-title': {
              fontWeight: 'bold',
              fontSize: '32px',
              lineHeight: '44px',
            },
            '.MuiDateCalendar-root .MuiPickersDay-today': {
              border: '1px solid #00A3FF',
            },
            '.Mui-selected': {
              backgroundColor: '#00A3FF',
              color: 'white',
            },
            '.MuiPickersDay-root': {
              '&:hover': { backgroundColor: 'white', color: '#181818' },
              '&:focus': { backgroundColor: '#00A3FF', color: 'white' },
            },
          }}
        />
      ) : (
        <Box sx={{ width: '320px', height: '469px', marginTop: '14px' }} />
      )}
    </LocalizationProvider>
  );
}
