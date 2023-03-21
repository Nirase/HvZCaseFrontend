import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UpdateGame from "./gameSection/UpdateGame";
import DeleteGame from "./gameSection/DeleteGame";
import { Game } from "../../interfaces/game";

type Props = {
  game: Game;
};

const AdminGCGame = ({ game }: Props) => {
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
            <UpdateGame id={game.id} game={game} />
            <DeleteGame id={game.id} />
          </AccordionDetails>
        </Accordion>
      </AccordionDetails>
    );
  } else {
    return <p>Error</p>;
  }
};

export default AdminGCGame;
