import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneGame } from "../api/apiCalls";

type Props = {
  sendSelectedDate: (Date: string) => void;
};

const DatePickerComponent = ({ sendSelectedDate }: Props) => {
  const { gameId }: any = useParams();
  const [date, setDate] = useState<Dayjs | null>(null);

  const [endDate, setEndDate] = useState<Dayjs>();

  useEffect(() => {
    if (date) {
      // send up date when value is changed
      const stringDate = date.toDate().toLocaleString().split(",", 1)[0];
      sendSelectedDate(stringDate);
    }

    const getTheGame = async () => {
      const data = await getOneGame(+gameId);
      if (data) {
        const date = dayjs(data.endDate);
        setEndDate(date);
      }
    };

    getTheGame();
  }, [date]);

  return (
    <DatePicker
      format="DD/MM/YYYY"
      value={date}
      onChange={(newValue) => setDate(newValue)}
      disablePast
      maxDate={endDate}
    />
  );
};
export default DatePickerComponent;
