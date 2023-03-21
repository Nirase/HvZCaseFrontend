import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Game } from "../../interfaces/game";
import AdminGCGame from "./AdminGCGame";
import AdminGCPlayer from "./AdminGCPlayer";
import AdminGCMission from "./AdminGCMission";

type Props = {
  game: Game;
  refreshList: Function;
};

const AdminGameCard = ({ game, refreshList }: Props) => {
  const gameId = game.id;
  const name = game.name;

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h3>
            {gameId} | {name}
          </h3>
        </AccordionSummary>
        <AdminGCGame game={game} refreshList={refreshList} />
        <AdminGCPlayer game={game} />
        <AdminGCMission game={game} />
      </Accordion>
    </div>
  );
};
//<AdminGCPlayer gameId={gameId} />;
export default AdminGameCard;
