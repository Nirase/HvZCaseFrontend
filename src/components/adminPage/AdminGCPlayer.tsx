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
import PlayerListItemDetailed from "./PlayerListItemDetailed";
import UpdatePlayer from "./playerSection/UpdatePlayer";
import AddPlayer from "./playerSection/AddPlayer";
import DeletePlayer from "./playerSection/DeletePlayer";

type Props = {
  game: Game;
};

const AdminGCPlayer = (game: Props) => {
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState<Player>();
  const [playerID, setPlayerId] = useState("");

  useEffect(() => {
    if (game) {
      const fetchPlayersFromGame = async () => {
        const data = await getPlayersFromGame(+game.game.id);
        setPlayers(data);
      };

      fetchPlayersFromGame();
    }
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newInput = event.target.value;
    setPlayerId(newInput);
  };

  const fetchOnePlayerFromGame = async () => {
    if (playerID != null) {
      const data = await getOnePlayerFromGame(+game.game.id, +playerID);
      setPlayer(data);
    }
  };

  let findPlayerCard;
  if (player != null) {
    findPlayerCard = <PlayerListItemDetailed player={player} />;
  } else {
    findPlayerCard = <p>Player not found</p>;
  }
  let deleteInput;
  if (player != null) {
    deleteInput = <DeletePlayer />;
  } else {
    deleteInput = <p>Get a player to delete!</p>;
  }
  let updatePlayer;
  if (player != null) {
    updatePlayer = <UpdatePlayer player={player} />;
  } else {
    updatePlayer = <p>Get a player to update!</p>;
  }

  if (players) {
    return (
      <AccordionDetails>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h3>Player</h3>
          </AccordionSummary>
          <AccordionDetails>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h4>List of players</h4>
              </AccordionSummary>
              <PlayerListDetailed players={players} />
            </Accordion>
            <AddPlayer />
            <div style={{ marginTop: 10 }}>
              <h4>Get Player</h4>
              <TextField
                type={"number"}
                id="get-playerid-input"
                label="Id"
                onChange={handleInputChange}
                variant="standard"
              />
              <br></br>
              <Button
                variant="contained"
                style={{ marginTop: 10, backgroundColor: "#360568" }}
                onClick={fetchOnePlayerFromGame}
              >
                Get player
              </Button>
              <div>{findPlayerCard}</div>
            </div>
            <div style={{ marginTop: 10 }}>
              <h4>Update Player</h4>
              <p>Id: {playerID}</p>
              {updatePlayer}
            </div>
            <div style={{ marginTop: 10 }}>
              <h4>Delete Player</h4>
              <p>Id: {playerID}</p>
              {deleteInput}
            </div>
          </AccordionDetails>
        </Accordion>
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
