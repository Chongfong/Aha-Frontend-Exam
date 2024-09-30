import useDatePickerModel from './DatePickerModel';

export default function useDatePickerController() {
  const {
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
  } = useDatePickerModel();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setDate: (date: string) => void,
  ) => {
    setDate(e.target.value);
  };

  const handleInputFocus = () => {
    setPickerOpen(true);
  };

  return {
    currentDate,
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
    inputDate,
    setInputDate,
  };
}
