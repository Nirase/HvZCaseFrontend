import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UpdateGame from "./gameSection/UpdateGame";
import DeleteGame from "./gameSection/DeleteGame";
import { IGame } from "../../interfaces/game";
import { deleteGame } from "../../api/apiCalls";

type Props = {
  game: IGame;
  updateGames: Function;
  handleDeleteGame: Function;
  setSnackbarRes: (res: any) => void;
  setSnackbarFrom: (from: string) => void;
};

const AdminGCGame = ({
  game,
  updateGames,
  handleDeleteGame,
  setSnackbarRes,
  setSnackbarFrom,
}: Props) => {
  if (game) {
    return (
      <AccordionDetails>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h3>Game</h3>
          </AccordionSummary>
          <AccordionDetails>
            <UpdateGame
              id={game.id}
              game={game}
              updateGameFunc={updateGames}
              setSnackbarRes={(res: any) => {
                setSnackbarRes(res);
              }}
              setSnackbarFrom={(from: string) => setSnackbarFrom(from)}
            />
            <DeleteGame
              id={game.id}
              handleDeleteGame={handleDeleteGame}
              setSnackbarRes={(res: any) => {
                setSnackbarRes(res);
              }}
              setSnackbarFrom={(from: string) => setSnackbarFrom(from)}
            />
          </AccordionDetails>
        </Accordion>
      </AccordionDetails>
    );
  } else {
    return <p>Error</p>;
  }
};

export default AdminGCGame;
