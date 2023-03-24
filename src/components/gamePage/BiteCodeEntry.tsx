import TextField from "@mui/material/TextField";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { ICreateKill } from "../../interfaces/marker";
import { IPlayer } from "../../interfaces/player";
import { useParams } from "react-router-dom";
import { addKill } from "../../api/apiCalls";
import Places from "../Places";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

type Props = {
  player: IPlayer;
  setSnackbarRes: (res: any) => void;
  setSnackbarFrom: (from: string) => void;
};

const BiteCodeEntry = ({ player, setSnackbarFrom, setSnackbarRes }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [biteCode, setBiteCode] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const { gameId }: any = useParams();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleKillClick = async () => {
    const time = new Date().toLocaleString();
    const kill: ICreateKill = {
      location,
      description,
      timeOfDeath: time,
      biteCode,
      killerId: player.id,
      gameId: +gameId,
    };

    const data = await addKill(+gameId, kill);
    setSnackbarRes(data);
    setSnackbarFrom("Kill");
    console.log(data);
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          id="BiteCodeEntry"
          label="Enter Bite Code"
          variant="outlined"
          color="secondary"
          fullWidth
          value={biteCode}
          onChange={(e) => setBiteCode(e.target.value)}
          error={biteCode === player.biteCode}
          helperText={
            biteCode === player.biteCode
              ? "you can't input your old bite code"
              : ""
          }
        />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        <Button
          variant="contained"
          style={{ backgroundColor: "red" }}
          onClick={handleKillClick}
        >
          Kill
        </Button>
      </div>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div>
          <Typography paragraph>Optional:</Typography>

          <Places setPosition={(position: string) => setLocation(position)} />

          <Typography paragraph>
            Enter address for where the bite took place.
          </Typography>

          <TextField
            id="BiteDescription"
            label="Enter short description of kill"
            variant="outlined"
            color="secondary"
            multiline
            maxRows={5}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Typography paragraph>Rnter description of kill</Typography>
        </div>
      </Collapse>
    </div>
  );
};
export default BiteCodeEntry;
