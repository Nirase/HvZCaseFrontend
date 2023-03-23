import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { getOnePlayerFromGame, getPlayersFromGame } from "../../api/apiCalls";
import { IGame } from "../../interfaces/game";
import PlayerListDetailed from "./PlayerListDetailed";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IPlayer } from "../../interfaces/player";
import PlayerListItemDetailed from "./PlayerListItemDetailed";
import UpdatePlayer from "./playerSection/UpdatePlayer";
import DeletePlayer from "./playerSection/DeletePlayer";
import { isNull } from "util";
import AddPlayer from "./playerSection/AddPlayer";

type Props = {
  game: IGame;
  setSnackbarRes: (res: any) => void;
  setSnackbarFrom: (from: string) => void;
};

const AdminGCPlayer = ({ game, setSnackbarRes, setSnackbarFrom }: Props) => {
  const [players, setPlayers] = useState<Array<IPlayer>>([]);
  const [player, setPlayer] = useState<IPlayer>();
  const [playerID, setPlayerId] = useState("");

  useEffect(() => {
    if (game) {
      const fetchPlayersFromGame = async () => {
        const data = await getPlayersFromGame(+game.id);
        setPlayers(data);
      };

      fetchPlayersFromGame();
    }
  }, [player]);

  //[players] for fetch list update
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newInput = event.target.value;
    setPlayerId(newInput);
  };

  //need to run twice for list removal - how to fix
  const handleRemoveItem = () => {
    setPlayers((current) =>
      current.filter((player) => player.id !== +playerID)
    );
    setPlayer(undefined);
  };

  const fetchOnePlayerFromGame = async () => {
    setPlayer(undefined);
    if (playerID != null) {
      const data = await getOnePlayerFromGame(+game.id, +playerID);
      if (data.status !== 404) {
        setPlayer(data);
      } else {
        setSnackbarFrom("player");
        setSnackbarRes(data);
      }
    }
  };

  let findPlayerCard;
  if (player != undefined) {
    findPlayerCard = <PlayerListItemDetailed player={player} />;
  } else {
    findPlayerCard = <p></p>;
  }

  let deleteInput;
  if (player != null) {
    deleteInput = (
      <DeletePlayer
        gameId={game.id}
        playerId={player.id}
        deleteFunction={handleRemoveItem}
        setSnackbarRes={(res: any) => {
          setSnackbarRes(res);
        }}
        setSnackbarFrom={(from: string) => setSnackbarFrom(from)}
      />
    );
  } else {
    deleteInput = <p>Get a player to delete!</p>;
  }
  let updatePlayer;
  if (player != null) {
    updatePlayer = (
      <UpdatePlayer
        gameid={game.id}
        player={player}
        refreshPlayer={fetchOnePlayerFromGame}
        setSnackbarRes={(res: any) => {
          setSnackbarRes(res);
        }}
        setSnackbarFrom={(from: string) => setSnackbarFrom(from)}
      />
    );
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
                <h4>List of players </h4>
              </AccordionSummary>
              <PlayerListDetailed players={players} />
            </Accordion>
            <AddPlayer
              gameId={game.id}
              players={players}
              setAddPlayers={(players: Array<IPlayer>) => {
                setPlayers(players);
              }}
              setSnackbarRes={(res: any) => {
                setSnackbarRes(res);
              }}
              setSnackbarFrom={(from: string) => setSnackbarFrom(from)}
            />
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
              {updatePlayer}
            </div>
            <div style={{ marginTop: 10 }}>
              <h4>Delete Player</h4>
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
