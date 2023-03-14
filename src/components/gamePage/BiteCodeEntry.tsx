import TextField from "@mui/material/TextField";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Button, Typography } from "@mui/material";

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

const BiteCodeEntry = () => {
  const [expanded, setExpanded] = useState(false);
  const [biteCode, setBiteCode] = useState("");
  const [location, setLocation] = useState("");
  const [description, seetDescription] = useState("");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={{ maxWidth: "50%" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          id="BiteCodeEntry"
          label="Enter Bite Code"
          variant="filled"
          color="secondary"
        />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        <Button variant="contained" style={{ backgroundColor: "red" }}>
          Kill
        </Button>
      </div>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div>
          <Typography paragraph>Optional:</Typography>
          <Typography paragraph>
            Enter address for where the bite took place.
          </Typography>
          <TextField
            id="BiteLocation"
            label="Enter Bite Location"
            variant="filled"
            color="secondary"
          />

          <Typography paragraph>enter description of kill</Typography>
          <TextField
            id="BiteDescription"
            label="Enter short description of kill"
            variant="filled"
            color="secondary"
          />
        </div>
      </Collapse>
    </div>
  );
};
export default BiteCodeEntry;
