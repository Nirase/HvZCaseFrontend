import TextField from "@mui/material/TextField";
import { Player } from "../../interfaces/player";

type Props = {
  player: Player;
};

const BiteCode = ({ player }: Props) => {
  return (
    <div>
      <TextField
        id="BiteCode"
        variant="outlined"
        disabled
        defaultValue={player.biteCode}
        color="secondary"
      />
    </div>
  );
};
export default BiteCode;
