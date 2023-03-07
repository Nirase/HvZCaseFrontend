import Container from "@mui/material/Container";
import BiteCode from "../components/gamePage/BiteCode";
import BiteCodeEntry from "../components/gamePage/BiteCodeEntry";
import GameRegistration from "../components/gamePage/GameRegistration";
import Info from "../components/gamePage/Info";
import SquadList from "../components/gamePage/SquadList";
import { Game } from "../interfaces/game";

type Props = {
  game: Game;
};

const GamePage = ({ game }: Props) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "#B96AC9",
        borderRadius: "10px",
      }}
    >
      <Info game={game} />
      <GameRegistration game={game} />
      <div>
        <BiteCode />
        <BiteCodeEntry />
      </div>
      <div>
        <SquadList />
      </div>
    </Container>
  );
};
export default GamePage;
