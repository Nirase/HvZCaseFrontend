import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CreateGame from "./gameSection/CreateGame";
import UpdateGame from "./gameSection/UpdateGame";
import DeleteGame from "./gameSection/DeleteGame";

const AdminGCGame = () => {
  return (
    <AccordionDetails>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h3>Game</h3>
        </AccordionSummary>
        <AccordionDetails>
          <CreateGame />
          <UpdateGame />
          <DeleteGame />
        </AccordionDetails>
      </Accordion>
    </AccordionDetails>
  );
};

export default AdminGCGame;
