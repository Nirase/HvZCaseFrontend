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
import { Player } from "../../../interfaces/player";
import { updatePlayerToGame } from "../../../api/apiCalls";

type Props = {
  gameid: number;
  player: Player;
};

const UpdatePlayer = ({ gameid, player }: Props) => {
  const [isHuman, setIsHuman] = useState("");
  const [isPatientZero, setIsPatientZero] = useState("");
  const [squadId, setSquadId] = useState(0);

  const handleChangeHuman = (event: SelectChangeEvent) => {
    setIsHuman(event.target.value as string);
    if (event.target.value == "true") {
      player.isHuman = true;
      setIsPatientZero("false");
      player.isPatientZero = false;
    } else if (event.target.value == "false") {
      player.isHuman = false;
    }
  };
  const handleChangeIsPatient = (event: SelectChangeEvent) => {
    setIsPatientZero(event.target.value as string);
    if (event.target.value == "true") {
      setIsHuman("false");
      player.isHuman = false;
      player.isPatientZero = true;
    } else if (event.target.value == "false") {
      player.isPatientZero = false;
    }
  };

  const updatePlayer = async () => {
    if (player != null) {
      if (squadId == 0) {
        //what should i put her instead? if someone doesn't have a squad what do we do? leave squad function?
        player.squadId = null;
      } else {
        player.squadId = squadId;
      }
      console.log(player.squadId);
      await updatePlayerToGame(gameid, player);
    }
  };

  return (
    <>
      <FormControl fullWidth style={{ marginTop: 20 }}>
        <InputLabel id="update-player-ishuman-input"> isHuman </InputLabel>
        <Select
          labelId="update-player-ishuman-input"
          id="update-player-ishuman-select"
          value={isHuman}
          label="isHuman"
          onChange={handleChangeHuman}
        >
          <MenuItem value={"true"}> true</MenuItem>
          <MenuItem value={"false"}> false</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth style={{ marginTop: 20 }}>
        <InputLabel id="update-ispatientzero-ishuman-input">
          isPatientZero
        </InputLabel>
        <Select
          labelId="update-ispatientzero-ishuman-input"
          id="update-ispatientzero-ishuman-select"
          value={isPatientZero}
          label="isPatientZero"
          onChange={handleChangeIsPatient}
        >
          <MenuItem value={"true"}> true</MenuItem>
          <MenuItem value={"false"}> false</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="update-player-squadid-input"
        label="Squad Id"
        variant="standard"
        type={"number"}
        style={{ marginLeft: "20px" }}
        onChange={(e) => setSquadId(+e.target.value)}
      />
      <Button
        variant="contained"
        style={{ marginTop: 10, backgroundColor: "#360568" }}
        onClick={updatePlayer}
      >
        Update player
      </Button>
    </>
  );
};

export default UpdatePlayer;
