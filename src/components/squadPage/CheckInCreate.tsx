import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { addSquadCheckIn } from "../../api/apiCalls";
import { ICheckIn, ICreateCheckIn } from "../../interfaces/marker";

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
  };

  return (
    <div style={{ width: "30%", display: "flex", flexDirection: "column" }}>
      <label>Location</label>
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

      <label>Start Date</label>
      <TextField
        type="date"
        id="create-start-date-input"
        label=" "
        variant="standard"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <label>End Date</label>
      <TextField
        type="date"
        id="create-end-date-input"
        label=" "
        variant="standard"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <Button
        variant="contained"
        style={{ backgroundColor: "secondary" }}
        onClick={handleCreateClick}
      >
        Create
      </Button>
    </div>
  );
};
export default CheckInCreate;
