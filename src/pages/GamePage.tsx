import Container from "@mui/material/Container";
import BiteCode from "../components/gamePage/BiteCode";
import BiteCodeEntry from "../components/gamePage/BiteCodeEntry";
import GameRegistration from "../components/gamePage/GameRegistration";
import Info from "../components/gamePage/Info";
import SquadList from "../components/gamePage/SquadList";

const GamePage = (Game: any) => {
  return (
    <Container maxWidth="lg">
      <Info Game={Game.Game} />
      <GameRegistration />
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
