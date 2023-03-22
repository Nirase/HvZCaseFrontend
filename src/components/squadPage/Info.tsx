import { Typography } from "@mui/material";
import { ISquad } from "../../interfaces/squad";

type Props = {
  squad: ISquad;
};

const Info = ({ squad }: Props) => {
  return (
    <div>
      <Typography variant="h2">{squad.name}</Typography>
      <Typography variant="body1">
        Amount of players: {squad.players.length}
      </Typography>
    </div>
  );
};
export default Info;
