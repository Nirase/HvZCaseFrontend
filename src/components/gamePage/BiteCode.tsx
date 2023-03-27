import TextField from "@mui/material/TextField";
import { IPlayer } from "../../interfaces/player";

type Props = {
  player: IPlayer;
};

const BiteCode = ({ player }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3>Your bite code</h3>
      <p>This is the code to give the Zombie when they tag you</p>
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
