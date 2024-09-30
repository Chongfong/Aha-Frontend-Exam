import { useState, useCallback } from 'react';
import { Dayjs } from 'dayjs';

export default function useDatePickerModel() {
  const [currentDate, setCurrentDate] = useState<Dayjs | null>(null);
  const [tempDate, setTempDate] = useState<Dayjs | null>(null);
  const [openYear, setOpenYear] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [inputDate, setInputDate] = useState(currentDate && currentDate.format('MM/DD/YYYY'));

  const handleDayClick = (newValue: Dayjs | null) => {
    setTempDate(newValue);
  };

  const handleOpenYearSelector = useCallback(() => {
    setOpenYear(true);
  }, [setOpenYear]);

  const handleYearChange = () => {
    setOpenYear(false);
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

  return {
    setTempDate,
    currentDate,
    tempDate,
    openYear,
    pickerOpen,
    setPickerOpen,
    handleDayClick,
    handleOpenYearSelector,
    handleYearChange,
    handleAccept,
    handleCancel,
    inputDate,
    setInputDate,
  };
}
