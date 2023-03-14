import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const AdminGCGame = () => {
  const [gameState, setGameState] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setGameState(event.target.value as string);
  };
  return (
    <AccordionDetails>
      <h2>Game</h2>
      <div>
        <b>Create game</b>
        <br></br>
        <TextField id="nameInput" label="Name" variant="standard" />
        <TextField
          id="descInput"
          label="Description"
          variant="standard"
          style={{ marginLeft: "20px" }}
        />
        <br></br>
        <TextField id="addressInput" label="Address" variant="standard" />

        <TextField
          type={"number"}
          id="radiusInput"
          label="Map radius (m)"
          variant="standard"
          style={{ marginLeft: "20px" }}
        />
        <br></br>

        <label>Start Date</label>
        <TextField
          type="date"
          id="startDateInput"
          label=" "
          variant="standard"
          style={{ marginLeft: "-70px" }}
        />
        <label style={{ marginLeft: "20px" }}>End Date</label>
        <TextField
          type="date"
          id="endDateInput"
          label=" "
          variant="standard"
          style={{ marginLeft: "-65px" }}
        />
        <br></br>
        <Button
          variant="contained"
          style={{ marginTop: 10, backgroundColor: "#360568" }}
        >
          Create Game
        </Button>
      </div>
      <div>
        <br></br>
        <b>Create game</b>
        <br></br>
        <FormControl fullWidth style={{ marginTop: 20 }}>
          <InputLabel id="gameStateInputLabel"> Game State </InputLabel>
          <Select
            labelId="gameStateInputLabel"
            id="gameStateInput"
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
          variant="contained"
          style={{ marginTop: 10, backgroundColor: "#360568" }}
        >
          Update Game
        </Button>
      </div>
      <div>
        <br></br>
        <b>Delete game</b>
        <br></br>
        <TextField
          type={"number"}
          id="standard-basic"
          label="Standard"
          variant="standard"
        />
        <br></br>
        <Button
          variant="contained"
          style={{ marginTop: 10, backgroundColor: "#360568" }}
        >
          Delete Game
        </Button>
      </div>
      <hr style={{ marginLeft: -20, marginRight: -20, marginTop: 20 }}></hr>
    </AccordionDetails>
  );
};

export default AdminGCGame;
