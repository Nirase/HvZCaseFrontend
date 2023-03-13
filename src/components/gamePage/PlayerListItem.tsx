import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Player } from "../../interfaces/player";

type Props = {
  player: Player;
};

const PlayerListItem = ({ player }: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="body2">
          Name: {player.firstName} {player.lastName}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default PlayerListItem;
