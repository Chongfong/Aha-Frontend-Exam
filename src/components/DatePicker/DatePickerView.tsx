/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, Box } from '@mui/material';
import { PickersCalendarHeaderProps } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import useDatePickerController from './DatePickerController';
import CustomCalendarHeader from './CustomCalendarHeader';
import { datePickerStyles } from './DatePickerStyles';

export default function DatePickerView() {
  const {
    inputDate,
    setInputDate,
    tempDate,
    openYear,
    pickerOpen,
    handleDayClick,
    handleOpenYearSelector,
    handleYearChange,
    handleAccept,
    handleCancel,
    handleInputChange,
    handleInputFocus,
  } = useDatePickerController();

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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TextField
        label='Birthday'
        value={inputDate}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, setInputDate)}
        onFocus={handleInputFocus}
        placeholder='mm/dd/yyyy'
        slotProps={{ inputLabel: { shrink: true } }}
        sx={datePickerStyles.dateInput}
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
              handleYearChange();
            }
          }}
          dayOfWeekFormatter={(weekday) => `${weekday.format('dd')}`}
          displayStaticWrapperAs='desktop'
          showDaysOutsideCurrentMonth
          slotProps={{
            toolbar: { hidden: false, toolbarFormat: 'MMM, YYYY', toolbarPlaceholder: '__' },
            yearButton: {
              sx: {
                ...datePickerStyles.yearButton,
              },
            },
            actionBar: {
              actions: ['cancel', 'accept'],
              onAccept: handleAccept,
              onCancel: handleCancel,
            },
          }}
          sx={datePickerStyles.datePicker}
        />
      ) : (
        <Box sx={datePickerStyles.spareBox} />
      )}
    </LocalizationProvider>
  );
}
