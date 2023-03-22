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
import { IPlayer } from "../../../interfaces/player";
import { updatePlayerToGame } from "../../../api/apiCalls";

type Props = {
  gameid: number;
  player: IPlayer;
  refreshPlayer: Function;
  setSnackbarRes: (res: any) => void;
  setSnackbarFrom: (from: string) => void;
};

const UpdatePlayer = ({
  gameid,
  player,
  refreshPlayer,
  setSnackbarRes,
  setSnackbarFrom,
}: Props) => {
  const [isHumanStr, setIsHuman] = useState("");
  const [isPatientZeroStr, setIsPatientZero] = useState("");
  const [squadId, setSquadId] = useState(0);

  const updatedPlayer: IPlayer = {
    id: +player.id,
    firstName: player.firstName,
    lastName: player.lastName,
    isHuman: player.isHuman,
    isPatientZero: player.isPatientZero,
    userId: player.userId,
    biteCode: "random",
    squadId: squadId,
  };

  const handleChangeHuman = (event: SelectChangeEvent) => {
    setIsHuman(event.target.value as string);
    if (event.target.value === "true") {
      updatedPlayer.isHuman = true;
      setIsPatientZero("false");
      updatedPlayer.isPatientZero = false;
    } else if (event.target.value === "false") {
      updatedPlayer.isHuman = false;
    }
  };
  const handleChangeIsPatient = (event: SelectChangeEvent) => {
    setIsPatientZero(event.target.value as string);
    if (event.target.value === "true") {
      setIsHuman("false");
      updatedPlayer.isHuman = false;
      updatedPlayer.isPatientZero = true;
    } else if (event.target.value === "false") {
      updatedPlayer.isPatientZero = false;
    }
  };

  const updatePlayer = async () => {
    if (player != null) {
      if (isHumanStr === "true") {
        updatedPlayer.isHuman = true;
      } else if (isHumanStr === "false") {
        updatedPlayer.isHuman = false;
      }
      if (isPatientZeroStr === "true") {
        updatedPlayer.isPatientZero = true;
      } else if (isPatientZeroStr === "false") {
        updatedPlayer.isPatientZero = false;
      }
      if (squadId === 0) {
        updatedPlayer.squadId = null;
      } else {
        updatedPlayer.squadId = squadId;
      }
      const updatePlayerRes = await updatePlayerToGame(gameid, updatedPlayer);
      if (updatePlayerRes.status !== 404) {
        setSnackbarFrom(" updated player: " + player.id);
        setSnackbarRes(updatePlayerRes);
      } else {
        setSnackbarFrom(
          " squad " + updatedPlayer.squadId + " in the game. Update failed"
        );
        setSnackbarRes(updatePlayerRes);
      }
      refreshPlayer();
    }
  };
  return (
    <>
      <FormControl fullWidth style={{ marginTop: 20 }}>
        <InputLabel id="update-player-ishuman-input"> isHuman </InputLabel>
        <Select
          labelId="update-player-ishuman-input"
          id="update-player-ishuman-select"
          value={isHumanStr}
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
          value={isPatientZeroStr}
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
        style={{ marginLeft: 10, marginRight: 10 }}
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
