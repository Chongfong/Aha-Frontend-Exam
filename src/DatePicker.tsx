import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack, IconButton, Typography } from '@mui/material';
import { PickersCalendarHeaderProps } from '@mui/x-date-pickers';
import { styled } from '@mui/material/styles';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';

const CustomCalendarHeaderRoot = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 16px',
  alignItems: 'center',
});
function CustomCalendarHeader(props: PickersCalendarHeaderProps<Dayjs>) {
  const { currentMonth, onMonthChange } = props;

  const selectNextMonth = () => onMonthChange(currentMonth.add(1, 'month'), 'left');
  const selectPreviousMonth = () => onMonthChange(currentMonth.subtract(1, 'month'), 'right');

  return (
    <CustomCalendarHeaderRoot>
      <Stack spacing={1} direction='row'>
        <IconButton onClick={selectPreviousMonth} title='Previous month'>
          <ChevronLeft />
        </IconButton>
      </Stack>
      <Typography variant='body2'>{currentMonth.format('MMMM YYYY')}</Typography>
      <Stack spacing={1} direction='row'>
        <IconButton onClick={selectNextMonth} title='Next month'>
          <ChevronRight />
        </IconButton>
      </Stack>
    </CustomCalendarHeaderRoot>
  );
}

export default function DatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        defaultValue={dayjs('2022-04-17')}
        slots={{ calendarHeader: CustomCalendarHeader }}
      />
    </LocalizationProvider>
  );
}
