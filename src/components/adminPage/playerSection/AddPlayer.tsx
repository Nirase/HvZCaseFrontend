import {
  Accordion,
  AccordionSummary,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AddPlayer = () => {
  const [isHuman, setIsHuman] = useState("");
  const [isPatientZero, setIsPatientZero] = useState("");

  const handleChangeHuman = (event: SelectChangeEvent) => {
    setIsHuman(event.target.value as string);
  };
  const handleChangeIsPatient = (event: SelectChangeEvent) => {
    setIsPatientZero(event.target.value as string);
  };
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <h4>Add player</h4>
      </AccordionSummary>
      <div>
        <TextField
          id="add-player-userid-input"
          label="User Id"
          variant="standard"
          style={{ marginLeft: "20px" }}
        />
        <TextField
          id="add-player-gameid-input"
          type={"number"}
          label="Game Id"
          variant="standard"
          style={{ marginLeft: "20px" }}
        />
        <FormControl fullWidth style={{ marginTop: 20 }}>
          <InputLabel id="add-player-ishuman-input"> isHuman </InputLabel>
          <Select
            labelId="add-player-ishuman-input"
            id="add-player-ishuman-select"
            value={isHuman}
            label="isHuman"
            onChange={handleChangeHuman}
            style={{ marginLeft: 10, marginRight: 20 }}
          >
            <MenuItem value={"true"}> true</MenuItem>
            <MenuItem value={"false"}> false</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ marginTop: 20 }}>
          <InputLabel id="add-player-ispatientzero-input">
            isPatientZero
          </InputLabel>
          <Select
            labelId="add-player-ispatientzero-input"
            id="add-player-ispatientzero-select"
            value={isPatientZero}
            label="isPatientZero"
            onChange={handleChangeIsPatient}
            style={{ marginLeft: 10, marginRight: 20 }}
          >
            <MenuItem value={"true"}> true</MenuItem>
            <MenuItem value={"false"}> false</MenuItem>
          </Select>
        </FormControl>

        <br></br>
        <Button
          variant="contained"
          style={{
            marginLeft: 10,
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: "#360568",
          }}
        >
          Add Player
        </Button>
      </div>
    </Accordion>
  );
};

export default AddPlayer;
