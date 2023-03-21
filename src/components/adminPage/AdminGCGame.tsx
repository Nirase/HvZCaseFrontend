import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UpdateGame from "./gameSection/UpdateGame";
import DeleteGame from "./gameSection/DeleteGame";
import { Game } from "../../interfaces/game";

type Props = {
  game: Game;
  refreshList: Function;
};

const AdminGCGame = ({ game, refreshList }: Props) => {
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
            <UpdateGame id={game.id} game={game} refreshList={refreshList} />
            <DeleteGame id={game.id} refreshList={refreshList} />
          </AccordionDetails>
        </Accordion>
      </AccordionDetails>
    );
  } else {
    return <p>Error</p>;
  }
};

export default AdminGCGame;
