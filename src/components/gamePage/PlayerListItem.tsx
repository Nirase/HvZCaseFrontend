import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IPlayer } from "../../interfaces/player";
import "../../styles/player.css";

type Props = {
  player: IPlayer;
};

const PlayerListItem = ({ player }: Props) => {
  return (
    <Card>
      <CardContent className="cardContent">
        <Typography variant="body2">
          Name: {player.firstName} {player.lastName}
        </Typography>
        <Typography variant="body2">
          Dead: {player.isHuman ? "No" : "Yes"}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default PlayerListItem;
