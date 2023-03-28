import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  getOnePlayerFromGame,
  getPlayersFromGameWithDetails,
} from "../../api/apiCalls";
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

  //loads existing players
  useEffect(() => {
    if (game) {
      const fetchPlayersFromGame = async () => {
        const data = await getPlayersFromGameWithDetails(+game.id);
        setPlayers(data);
      };

      fetchPlayersFromGame();
    }
  }, []);

  //sets the playerId when playercard is pressed
  useEffect(() => {
    if (player) {
      setPlayerId(player.id.toString());
    }
  }, [player]);

  //updates playerList after updates
  useEffect(() => {
    const newPlayerList = [...players];
    for (let i = 0; i < players.length; i++) {
      if (players[i].userId === player?.userId) {
        newPlayerList[i] = player;
      }
    }
    setPlayers(newPlayerList);
  }, [player]);

  //updates playerId in order to find user
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newInput = event.target.value;
    setPlayerId(newInput);
  };

  //removes player from playerlist
  const handleRemoveItem = () => {
    setPlayers((current) =>
      current.filter((tempPlayer) => tempPlayer.id !== player?.id)
    );
    setPlayer(undefined);
  };

  //get a player from the database
  const fetchOnePlayerFromGame = async () => {
    setPlayer(undefined);
    if (playerID != null) {
      const data = await getOnePlayerFromGame(+game.id, +playerID);
      if (data.status !== 404) {
        setPlayer(data);
      } else {
        setSnackbarRes(data);
      }
    }
  };

  //updates player in front end
  const updatePlayerCard = (uPlayer: IPlayer) => {
    setPlayer(undefined);
    if (playerID != null) {
      setPlayer(uPlayer);
    }
  };

  //making selected playercard only visible when a player is selected
  let findPlayerCard;
  if (player != undefined) {
    findPlayerCard = (
      <div>
        <p>selected player</p>
        <PlayerListItemDetailed player={player} />
      </div>
    );
  } else {
    findPlayerCard = <p></p>;
  }

  //making delete player only visible when a player is selected
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
    deleteInput = <p></p>;
  }

  //making update player only visible when a player is selected
  let updatePlayer;
  if (player != null) {
    updatePlayer = (
      <UpdatePlayer
        gameid={game.id}
        player={player}
        refreshPlayer={updatePlayerCard}
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
              <PlayerListDetailed
                players={players}
                propPlayer={(player: IPlayer) => setPlayer(player)}
              />
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
              <h4>Select Player</h4>
              <p>Get player by searching for Id or select from player list</p>
              <TextField
                type={"number"}
                id="get-playerid-input"
                label="Id"
                onChange={handleInputChange}
                variant="standard"
                value={playerID}
                style={{ marginRight: 20 }}
              />
              <Button
                variant="contained"
                style={{
                  marginTop: 10,
                  marginRight: 10,
                  backgroundColor: "#360568",
                }}
                onClick={fetchOnePlayerFromGame}
              >
                Get player
              </Button>
              {deleteInput}
              <div>{findPlayerCard}</div>
            </div>
            <div style={{ marginTop: 10 }}>
              <h4>Update Player</h4>
              {updatePlayer}
            </div>
          </AccordionDetails>
        </Accordion>
      </AccordionDetails>
    );
  } else {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h3>Player</h3>
        </AccordionSummary>
        <AccordionDetails>
          <div>loading..</div>
        </AccordionDetails>
      </Accordion>
    );
  }
};

export default AdminGCPlayer;
