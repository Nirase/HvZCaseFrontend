import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IGame } from "../../interfaces/game";
import AdminGCGame from "./AdminGCGame";
import AdminGCPlayer from "./AdminGCPlayer";
import AdminGCMission from "./AdminGCMission";

type Props = {
  game: IGame;
  refreshList: Function;
  setSnackbarRes: (res: any) => void;
  setSnackbarFrom: (from: string) => void;
};

const AdminGameCard = ({
  game,
  refreshList,
  setSnackbarRes,
  setSnackbarFrom,
}: Props) => {
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
        <AdminGCGame
          game={game}
          refreshList={refreshList}
          setSnackbarRes={(res: any) => {
            setSnackbarRes(res);
          }}
          setSnackbarFrom={(from: string) => setSnackbarFrom(from)}
        />
        <AdminGCPlayer
          game={game}
          setSnackbarRes={(res: any) => {
            setSnackbarRes(res);
          }}
          setSnackbarFrom={(from: string) => setSnackbarFrom(from)}
        />
        <AdminGCMission
          game={game}
          refreshList={refreshList}
          setSnackbarRes={(res: any) => {
            setSnackbarRes(res);
          }}
          setSnackbarFrom={(from: string) => setSnackbarFrom(from)}
        />
      </Accordion>
    </div>
  );
};
//<AdminGCPlayer gameId={gameId} />;
export default AdminGameCard;
