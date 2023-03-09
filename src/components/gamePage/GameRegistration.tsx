import Button from "@mui/material/Button";
import { Game } from "../../interfaces/game";

type Props = {
  game: Game;
};

const GameRegistration = ({ game }: Props) => {
  const join = (event: any) => {
    console.log(event.target.name);
  };
  return (
    <Button
      variant="contained"
      style={{ backgroundColor: "#360568" }}
      name={game.name}
      onClick={join}
    >
      Enter {game.name}
    </Button>
  );
};
export default GameRegistration;
