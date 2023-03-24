import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

type Props = {
  sendSelectedDate: (Date: string) => void;
};

const DatePickerComponent = ({ sendSelectedDate }: Props) => {
  const [date, setDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (date) {
      const stringDate = date.toDate().toLocaleString().split(",", 1)[0];
      sendSelectedDate(stringDate);
    }
  }, [date]);

  return (
    <DatePicker
      format="DD/MM/YYYY"
      value={date}
      onChange={(newValue) => setDate(newValue)}
    />
  );
};
export default DatePickerComponent;
