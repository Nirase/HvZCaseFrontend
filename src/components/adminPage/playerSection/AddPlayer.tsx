import {
  Accordion,
  AccordionSummary,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IAddPlayer, IPlayer } from "../../../interfaces/player";
import { AddPlayerToGame } from "../../../api/apiCalls";

type Props = {
  gameId: number;
  players: Array<IPlayer> | undefined;
  setAddPlayers: (player: Array<IPlayer>) => void;
  setSnackbarRes: (res: any) => void;
  setSnackbarFrom: (from: string) => void;
};

const AddPlayer = ({
  gameId,
  players,
  setAddPlayers,
  setSnackbarRes,
  setSnackbarFrom,
}: Props) => {
  const [isHuman, setIsHuman] = useState("");
  const [isPatientZero, setIsPatientZero] = useState("");
  const [biteCode, setBiteCode] = useState("");
  const [userId, setUserId] = useState(0);
  const gameID = gameId;

  const newPlayer: IAddPlayer = {
    isHuman: true,
    isPatientZero: false,
    gameId: +gameId,
    userId: userId,
    biteCode,
  };

  const handleChangeHuman = (event: SelectChangeEvent) => {
    setIsHuman(event.target.value as string);
    if (event.target.value === "true") {
      newPlayer.isHuman = true;
      setIsPatientZero("false");
      newPlayer.isPatientZero = false;
    } else if (event.target.value === "false") {
      newPlayer.isHuman = false;
    }
  };
  const handleChangeIsPatient = (event: SelectChangeEvent) => {
    setIsPatientZero(event.target.value as string);
    if (event.target.value === "true") {
      setIsHuman("false");
      newPlayer.isHuman = false;
      newPlayer.isPatientZero = true;
    } else if (event.target.value === "false") {
      newPlayer.isPatientZero = false;
    }
  };

  const AddPlayer = async () => {
    newPlayer.userId = userId;
    newPlayer.gameId = +gameID;
    newPlayer.biteCode = "random";
    const addedPlayer = await AddPlayerToGame(+gameID, newPlayer);
    console.log(addedPlayer);
    if (addedPlayer) {
      if (addedPlayer.status != 400) {
        setSnackbarFrom("added a player");
        if (players) {
          const allPlayers = [...players, addedPlayer];
          setAddPlayers(allPlayers);
        }
      } else {
        setSnackbarFrom(
          " add player: Can't add player that is already in game"
        );
      }
    }

    setSnackbarRes(addedPlayer);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <h4>Add player</h4>
      </AccordionSummary>
      <div>
        <TextField
          id="add-player-userid-input"
          label="User Id"
          variant="standard"
          style={{ marginLeft: "20px" }}
          onChange={(e) => setUserId(+e.target.value)}
        />
        <FormControl fullWidth style={{ marginTop: 20 }}>
          <InputLabel id="add-player-ishuman-input"> isHuman </InputLabel>
          <Select
            labelId="add-player-ishuman-input"
            id="add-player-ishuman-select"
            value={isHuman}
            label="isHuman"
            onChange={handleChangeHuman}
            style={{ marginLeft: 10, marginRight: 20 }}
          >
            <MenuItem value={"true"}> true</MenuItem>
            <MenuItem value={"false"}> false</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ marginTop: 20 }}>
          <InputLabel id="add-player-ispatientzero-input">
            isPatientZero
          </InputLabel>
          <Select
            labelId="add-player-ispatientzero-input"
            id="add-player-ispatientzero-select"
            value={isPatientZero}
            label="isPatientZero"
            onChange={handleChangeIsPatient}
            style={{ marginLeft: 10, marginRight: 20 }}
          >
            <MenuItem value={"true"}> true</MenuItem>
            <MenuItem value={"false"}> false</MenuItem>
          </Select>
        </FormControl>

        <br></br>
        <Button
          variant="contained"
          style={{
            marginLeft: 10,
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: "#360568",
          }}
          onClick={AddPlayer}
        >
          Add Player
        </Button>
      </div>
    </Accordion>
  );
};

export default AddPlayer;
