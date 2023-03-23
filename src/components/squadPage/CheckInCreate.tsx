import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { addSquadCheckIn } from "../../api/apiCalls";
import { ICreateCheckIn } from "../../interfaces/marker";
import Places from "../Places";
type Props = {
  setSnackbarRes: (res: any) => void;
  setSnackbarFrom: (from: string) => void;
  marker: string;
};

const CheckInCreate = ({ setSnackbarFrom, setSnackbarRes, marker }: Props) => {
  const { gameId, squadId }: any = useParams();
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCreateClick = async () => {
    const check: ICreateCheckIn = {
      location,
      squadId,
      startDate,
      endDate,
    };

    const data = await addSquadCheckIn(+gameId, +squadId, check);
    setSnackbarRes(data);
    setSnackbarFrom("created a check in");
    console.log(data);
  };

  return (
    <div>
      <Places
        setPosition={(position: string) => setLocation(position)}
        marker={marker}
      />
      <div style={{ marginBottom: "10px", marginTop: "10px" }}>
        <label>Start Date</label>
        <TextField
          type="date"
          id="create-start-date-input"
          label=" "
          variant="standard"
          style={{
            marginLeft: -65,
            maxWidth: 115,
            marginRight: 15,
            marginTop: 5,
          }}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label style={{ marginLeft: 10 }}>End Date</label>
        <TextField
          type="date"
          id="create-end-date-input"
          label=" "
          variant="standard"
          style={{
            marginLeft: -65,
            maxWidth: 115,
            marginRight: 15,
            marginTop: 5,
          }}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

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
