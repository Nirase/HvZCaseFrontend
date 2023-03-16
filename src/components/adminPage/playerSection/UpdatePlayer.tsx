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

type Props = {
  player: Player;
};

const UpdatePlayer = (player: Props) => {
  const [isHuman, setIsHuman] = useState("");
  const [isPatientZero, setIsPatientZero] = useState("");

  const handleChangeHuman = (event: SelectChangeEvent) => {
    setIsHuman(event.target.value as string);
  };
  const handleChangeIsPatient = (event: SelectChangeEvent) => {
    setIsPatientZero(event.target.value as string);
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
      >
        Update player
      </Button>
    </div>
  );
};

export default UpdatePlayer;
