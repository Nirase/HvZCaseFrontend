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
import { updateGame } from "../../../api/apiCalls";
import { Game } from "../../../interfaces/game";

type Props = {
  id: number;
  game: Game;
};

const UpdateGame = ({ id, game }: Props) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [address, setAddress] = useState("");
  const [mapRadius, setRadius] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [gameState, setGameState] = useState("");

  const updatedGame: Game = {
    id: id,
    name: game.name,
    description: game.description,
    startDate: game.startDate,
    endDate: game.endDate,
    gameState: game.gameState,
    location: game.location,
    radius: game.radius,
    players: game.players,
    kills: game.kills,
    missions: game.missions,
  };

  console.log(game);
  const handleChange = (event: SelectChangeEvent) => {
    setGameState(event.target.value as string);
  };

  const handleUpdate = async () => {
    updatedGame.name = name;
    updatedGame.description = desc;
    updatedGame.startDate = startDate;
    updatedGame.endDate = endDate;
    if (
      gameState == "Registration" ||
      gameState == "In progress" ||
      gameState == "Completed"
    ) {
      updatedGame.gameState = gameState;
    }
    updatedGame.location = address;
    updatedGame.radius = mapRadius;
    console.log(updatedGame);
    await updateGame(id, updatedGame);
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
        onChange={(e) => setName(e.target.value as string)}
      />
      <br></br>
      <TextField
        id="addressInput"
        label="Address"
        variant="standard"
        onChange={(e) => setDesc(e.target.value as string)}
      />
      <TextField
        type={"number"}
        id="update-game-radius-input"
        label="Map radius (m)"
        variant="standard"
        style={{ marginLeft: "20px" }}
        onChange={(e) => setAddress(e.target.value)}
      />
      <br></br>
      <label>Start Date</label>
      <TextField
        type="date"
        id="update-start-date-input"
        label=" "
        variant="standard"
        style={{ marginLeft: "-70px" }}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <label style={{ marginLeft: "20px" }}>End Date</label>
      <TextField
        type="date"
        id="update-end-date-input"
        label=" "
        variant="standard"
        style={{ marginLeft: "-65px" }}
        onChange={(e) => setEndDate(e.target.value)}
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
          defaultValue={""}
        >
          <MenuItem value={"Registration"}>Registration</MenuItem>
          <MenuItem value={"In progress"}>In Progress</MenuItem>
          <MenuItem value={"Completed"}>Complete</MenuItem>
        </Select>
      </FormControl>
      <br></br>
      <Button
        id="update-game-button"
        variant="contained"
        style={{ marginTop: 10, backgroundColor: "#360568" }}
        onClick={handleUpdate}
      >
        Update Game
      </Button>
    </div>
  );
};

export default UpdateGame;
