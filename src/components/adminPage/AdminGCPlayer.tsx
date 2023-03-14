import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { getOnePlayerFromGame, getPlayersFromGame } from "../../api/apiCalls";
import { Game } from "../../interfaces/game";
import PlayerListDetailed from "./PlayerListDetailed";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Player } from "../../interfaces/player";

type Props = {
  game: Game;
};

const AdminGCPlayer = (game: Props) => {
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState<Player>();
  const [playerID, setPlayerId] = useState<number>();
  var newInput;
  useEffect(() => {
    if (game) {
      const fetchPlayersFromGame = async () => {
        const data = await getPlayersFromGame(+game.game.id);
        setPlayers(data);
      };

      fetchPlayersFromGame();
    }
  }, []);

  //NaN???
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    newInput = event.target.value;
  };

  const fetchOnePlayerFromGame = async () => {
    setPlayerId(parseInt(newInput.toString));
    if (playerID) {
      const data = await getOnePlayerFromGame(+game.game.id, playerID);
      setPlayer(data);
    }
  };

  if (players) {
    return (
      <AccordionDetails>
        <h2>Player</h2>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h3>List of players</h3>
          </AccordionSummary>
          <PlayerListDetailed players={players} />
        </Accordion>
        <div style={{ marginTop: 10 }}>
          <h3>Get Player</h3>
          <TextField
            type={"number"}
            id="playerIdInput"
            label="Id"
            onChange={handleInputChange}
            variant="standard"
            value={playerID}
          />
          <br></br>
          <Button
            variant="contained"
            style={{ marginTop: 10, backgroundColor: "#360568" }}
            onClick={fetchOnePlayerFromGame}
          >
            Get player
          </Button>
        </div>
        <hr style={{ marginLeft: -20, marginRight: -20, marginTop: 20 }}></hr>
      </AccordionDetails>
    );
  } else {
    return (
      <div>
        <h2>Player</h2>
        <div>loading..</div>
      </div>
    );
  }
};

export default AdminGCPlayer;
