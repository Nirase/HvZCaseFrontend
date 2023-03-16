import TextField from "@mui/material/TextField";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { CreateKill } from "../../interfaces/marker";
import { Player } from "../../interfaces/player";
import { useParams } from "react-router-dom";
import { addKill } from "../../api/apiCalls";
import ResponseSnackBar from "../ResponseSnackBar";

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
  player: Player;
};

const BiteCodeEntry = ({ player }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [biteCode, setBiteCode] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const { gameId }: any = useParams();
  const [res, setRes] = useState<any>();
  const [snackbar, setSnackbar] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleKillClick = async () => {
    const time = new Date().toLocaleString();
    const kill: any = {
      location,
      description,

      biteCode,
      killerId: player.id,
      gameId: +gameId,
    };

    const data = await addKill(+gameId, kill);
    setRes(data);
    setSnackbar(true);
    console.log("kill", data);
  };

  return (
    <div style={{ width: "50%" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          id="BiteCodeEntry"
          label="Enter Bite Code"
          variant="filled"
          color="secondary"
          fullWidth
          value={biteCode}
          onChange={(e) => setBiteCode(e.target.value)}
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

          <TextField
            id="BiteLocation"
            label="Enter Bite Location"
            variant="filled"
            color="secondary"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Typography paragraph>
            Enter address for where the bite took place.
          </Typography>

          <TextField
            id="BiteDescription"
            label="Enter short description of kill"
            variant="filled"
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
      <ResponseSnackBar open={snackbar} res={res} from={"killed"} />
    </div>
  );
};
export default BiteCodeEntry;
