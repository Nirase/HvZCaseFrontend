import Button from "@mui/material/Button";
import { Game } from "../../interfaces/game";

type Props = {
  game: Game;
};

const GameRegistration = ({ game }: Props) => {
  return (
    <Button variant="contained" style={{ backgroundColor: "#360568" }}>
      Enter {game.Name}
    </Button>
  );
};
export default GameRegistration;
