import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UpdateGame from "./gameSection/UpdateGame";
import DeleteGame from "./gameSection/DeleteGame";
import { IGame } from "../../interfaces/game";

type Props = {
  game: IGame;
  refreshList: Function;
  setSnackbarRes: (res: any) => void;
  setSnackbarFrom: (from: string) => void;
};

const AdminGCGame = ({
  game,
  refreshList,
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
              refreshList={refreshList}
              setSnackbarRes={(res: any) => {
                setSnackbarRes(res);
              }}
              setSnackbarFrom={(from: string) => setSnackbarFrom(from)}
            />
            <DeleteGame
              id={game.id}
              refreshList={refreshList}
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
