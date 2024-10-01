import React from 'react';
import { Box, Stack, IconButton, Typography } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { PickersCalendarHeaderProps } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { calendarHeaderStyles } from './DatePickerStyles';

export default function CustomCalendarHeader(
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
    <Box sx={calendarHeaderStyles.headerContainer}>
      <Stack spacing={1} direction='row'>
        <IconButton
          onClick={openYear ? selectPreviousYear : selectPreviousMonth}
          title='Previous month/year'
        >
          <ChevronLeft />
        </IconButton>
      </Stack>
      <Typography variant='body2' onClick={onOpenYearSelector} sx={calendarHeaderStyles.headerText}>
        {openYear ? currentMonth.format('YYYY') : currentMonth.format('MMMM YYYY')}
      </Typography>
      <Stack spacing={1} direction='row'>
        <IconButton onClick={openYear ? selectNextYear : selectNextMonth} title='Next month/year'>
          <ChevronRight />
        </IconButton>
      </Stack>
    </Box>
  );
}
