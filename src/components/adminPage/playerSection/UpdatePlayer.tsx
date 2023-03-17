import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
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
      await updatePlayerToGame(gameid, player);
    }
  };

  return (
    <div>
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
      <Button
        variant="contained"
        style={{ marginTop: 10, backgroundColor: "#360568" }}
        onClick={updatePlayer}
      >
        Update player
      </Button>
    </div>
  );
};

export default UpdatePlayer;
