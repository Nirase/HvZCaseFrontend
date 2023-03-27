import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { maxWidth } from "@mui/system";
import { useLoadScript } from "@react-google-maps/api";
import React, { useState } from "react";
import { updateGame } from "../../../api/apiCalls";
import { IGame } from "../../../interfaces/game";
import Places from "../../Places";

type Props = {
  id: number;
  game: IGame;
  updateGameFunc: Function;
  //refreshList: Function;
  setSnackbarRes: (res: any) => void;
  setSnackbarFrom: (from: string) => void;
};
const libraries: (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[] = ["places"];

const UpdateGame = ({
  id,
  game,
  updateGameFunc,
  //refreshList,
  setSnackbarRes,
  setSnackbarFrom,
}: Props) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [address, setAddress] = useState("");
  const [mapRadius, setRadius] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [gameState, setGameState] = useState("");

  const updatedGame: IGame = {
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

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY as string,
    libraries: libraries,
  });

  const handleChange = (event: SelectChangeEvent) => {
    setGameState(event.target.value as string);
  };

  const handleUpdate = async () => {
    if (name) {
      updatedGame.name = name;
    }
    if (desc) {
      updatedGame.description = desc;
    }
    if (startDate) {
      updatedGame.startDate = startDate;
    }
    if (endDate) {
      updatedGame.endDate = endDate;
    }
    if (
      gameState === "Registration" ||
      gameState === "InProgress" ||
      gameState === "Completed"
    ) {
      updatedGame.gameState = gameState;
    }
    if (address) {
      updatedGame.location = address;
    }
    if (mapRadius) {
      updatedGame.radius = mapRadius;
    }

    const updateGameRes = await updateGame(id, updatedGame);
    setSnackbarFrom(" updated Game: " + id);
    setSnackbarRes(updateGameRes);
    updateGameFunc(updatedGame);
    //await refreshList();
  };
  return (
    <div>
      <br></br>
      <b>Update game</b>
      <br></br>
      <TextField
        id="nameInput"
        label="Name"
        variant="standard"
        defaultValue={game.name}
        style={{ marginRight: 20 }}
        onChange={(e) => setName(e.target.value as string)}
      />
      <TextField
        id="update-game-desc-input"
        label="Description"
        variant="standard"
        style={{ marginRight: 20 }}
        defaultValue={game.description}
        onChange={(e) => setDesc(e.target.value as string)}
      />
      <br></br>
      <div style={{ maxWidth: 600, marginTop: 20, marginBottom: 20 }}>
        {!isLoaded ? (
          <p></p>
        ) : (
          <Places setPosition={(position: string) => setAddress(position)} />
        )}
      </div>
      <TextField
        type={"number"}
        id="update-game-radius-input"
        label="Map radius (m)"
        variant="standard"
        style={{ marginBottom: 20 }}
        defaultValue={game.radius}
        onChange={(e) => setRadius(+e.target.value)}
      />
      <br></br>
      <label>Start Date</label>
      <TextField
        type="date"
        id="update-start-date-input"
        label=" "
        variant="standard"
        style={{ marginLeft: -70, maxWidth: 110 }}
        defaultValue={game.startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <br></br>
      <label>End Date</label>
      <TextField
        type="date"
        id="update-end-date-input"
        label=" "
        variant="standard"
        style={{ marginLeft: -65, maxWidth: 110 }}
        defaultValue={game.endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <br></br>
      <FormControl fullWidth style={{ marginTop: 20, maxWidth: 600 }}>
        <InputLabel id="update-game-state-input"> Game State </InputLabel>
        <Select
          labelId="update-game-state-input"
          id="update-game-state-select"
          value={gameState}
          label="Game State"
          onChange={handleChange}
          defaultValue={game.gameState}
        >
          <MenuItem value={"Registration"}>Registration</MenuItem>
          <MenuItem value={"InProgress"}>In Progress</MenuItem>
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
