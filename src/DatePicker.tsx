/* eslint-disable react/jsx-props-no-spreading */
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack, IconButton, Typography } from '@mui/material';
import { PickersCalendarHeaderProps } from '@mui/x-date-pickers';
import { styled } from '@mui/material/styles';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { useCallback, useState } from 'react';

const CustomCalendarHeaderRoot = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 16px',
  alignItems: 'center',
});

function CustomCalendarHeader(
  props: PickersCalendarHeaderProps<Dayjs> & {
    onOpenYearSelector: () => void;
    openYear: boolean;
    currentMonth: Dayjs;
    onMonthChange: (newDate: Dayjs) => void;
  },
) {
  const { currentMonth, onMonthChange, onOpenYearSelector, openYear } = props;

  const selectNextMonth = () => onMonthChange(currentMonth.add(1, 'month'));
  const selectPreviousMonth = () => onMonthChange(currentMonth.subtract(1, 'month'));
  const selectNextYear = () => onMonthChange(currentMonth.add(1, 'year'));
  const selectPreviousYear = () => onMonthChange(currentMonth.subtract(1, 'year'));

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
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs('2022-04-17'));
  const [openYear, setOpenYear] = useState(false);

  const handleOpenYearSelector = useCallback(() => {
    setOpenYear(true);
  }, [setOpenYear]);

  const handleYearChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setCurrentDate(newValue);
    }
    setOpenYear(false);
  };

  const handleMonthChange = useCallback(
    (newMonth: Dayjs) => {
      setCurrentDate(newMonth);
    },
    [setCurrentDate],
  );

  const CustomCalenderHeaderComponent = useCallback(
    (headerProps: PickersCalendarHeaderProps<dayjs.Dayjs>) => (
      <CustomCalendarHeader
        {...headerProps}
        currentMonth={currentDate}
        onOpenYearSelector={handleOpenYearSelector}
        openYear={openYear}
        onMonthChange={handleMonthChange}
      />
    ),
    [currentDate, handleOpenYearSelector, openYear, handleMonthChange],
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        value={currentDate}
        onChange={(newValue) => newValue && setCurrentDate(newValue)}
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
        slotProps={{
          toolbar: { hidden: false, toolbarFormat: 'MMM, YYYY', toolbarPlaceholder: '__' },
          yearButton: {
            sx: {
              borderRadius: '2px',
              '&:hover': { backgroundColor: 'white', color: '#181818' },
            },
          },
          actionBar: { actions: ['cancel', 'accept'] },
        }}
        sx={{
          '.MuiPickersLayout-actionBar': {
            gap: '30px',
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
          },
          '.MuiDayCalendar-weekDayLabel': {
            color: '#929292',
            fontSize: '11px',
            fontWeight: '400',
            lineHeight: '13px',
            textAlign: 'center',
          },
          '.MuiPickersLayout-toolbar .MuiDatePickerToolbar-title': {
            fontWeight: 'bold',
            fontSize: '32px',
          },
          '.MuiPickersDay-today': {
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
    </LocalizationProvider>
  );
}
