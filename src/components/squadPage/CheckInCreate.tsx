import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { addSquadCheckIn } from "../../api/apiCalls";
import { ICheckIn, ICreateCheckIn } from "../../interfaces/marker";
import "../../styles/squad.css";
import DatePickerComponent from "../DatePicker";

type Props = {
  setSnackbarRes: (res: any) => void;
  setSnackbarFrom: (from: string) => void;
  marker: string;
  allCheckIns: Array<ICheckIn> | undefined;
  setAllCheckIns: (cheks: Array<ICheckIn>) => void;
};

const CheckInCreate = ({
  setSnackbarFrom,
  setSnackbarRes,
  marker,
  allCheckIns,
  setAllCheckIns,
}: Props) => {
  const { gameId, squadId }: any = useParams();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCreateClick = async () => {
    const check: ICreateCheckIn = {
      location: marker,
      squadId,
      startDate,
      endDate,
    };
    if (startDate && endDate) {
      const data = await addSquadCheckIn(+gameId, +squadId, check);
      setSnackbarRes(data);
      setSnackbarFrom("created a check in");
      console.log(data);
      if (allCheckIns) {
        const all = [...allCheckIns, data];
        setAllCheckIns(all);
        setEndDate("");
        setStartDate("");
      }
    } else {
      setSnackbarRes("enter all fields");
    }
  };
  console.log(startDate);
  console.log(endDate);
  return (
    <div className="locationCreate">
      <p>
        Choose a location by clicking on the map, you can move the red marker by
        dragging it if you want another location
      </p>
      <label style={{ fontWeight: "bold" }}>Location</label>
      <TextField
        id="create-checkin-input"
        variant="standard"
        required={true}
        value={marker}
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          readOnly: true,
        }}
      />

      <label style={{ fontWeight: "bold" }}>Start Date</label>

      <DatePickerComponent
        sendSelectedDate={(Date: string) => setStartDate(Date)}
      />
      <label style={{ fontWeight: "bold", marginTop: "8px" }}>End Date</label>

      <DatePickerComponent
        sendSelectedDate={(Date: string) => setEndDate(Date)}
      />

      <Button
        variant="contained"
        style={{ backgroundColor: "secondary" }}
        onClick={handleCreateClick}
        sx={{ mt: 2 }}
      >
        Create
      </Button>
    </div>
  );
};
export default CheckInCreate;
