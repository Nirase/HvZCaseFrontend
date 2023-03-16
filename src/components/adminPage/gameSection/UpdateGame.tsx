import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const UpdateGame = () => {
  const [gameState, setGameState] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setGameState(event.target.value as string);
  };
  return (
    <div>
      <br></br>
      <b>Update game</b>
      <br></br>
      <TextField id="nameInput" label="Name" variant="standard" />
      <TextField
        id="update-game-desc-input"
        label="Description"
        variant="standard"
        style={{ marginLeft: "20px" }}
      />
      <br></br>
      <TextField id="addressInput" label="Address" variant="standard" />
      <TextField
        type={"number"}
        id="update-game-radius-input"
        label="Map radius (m)"
        variant="standard"
        style={{ marginLeft: "20px" }}
      />
      <br></br>
      <label>Start Date</label>
      <TextField
        type="date"
        id="update-start-date-input"
        label=" "
        variant="standard"
        style={{ marginLeft: "-70px" }}
      />
      <label style={{ marginLeft: "20px" }}>End Date</label>
      <TextField
        type="date"
        id="update-end-date-input"
        label=" "
        variant="standard"
        style={{ marginLeft: "-65px" }}
      />
      <br></br>
      <FormControl fullWidth style={{ marginTop: 20 }}>
        <InputLabel id="update-game-state-input"> Game State </InputLabel>
        <Select
          labelId="update-game-state-input"
          id="update-game-state-select"
          value={gameState}
          label="Game State"
          onChange={handleChange}
        >
          <MenuItem value={"registration"}>Registration</MenuItem>
          <MenuItem value={"inProgress"}>In Progress</MenuItem>
          <MenuItem value={"completed"}>Complete</MenuItem>
        </Select>
      </FormControl>
      <br></br>
      <Button
        id="update-game-button"
        variant="contained"
        style={{ marginTop: 10, backgroundColor: "#360568" }}
      >
        Update Game
      </Button>
    </div>
  );
};

export default UpdateGame;
