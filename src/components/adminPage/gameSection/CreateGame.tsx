import { Button, TextField } from "@mui/material";
import React from "react";

const CreateGame = () => {
  return (
    <div>
      <b>Create game</b>
      <br></br>
      <TextField id="create-name-input" label="Name" variant="standard" />
      <TextField
        id="create-desc-input"
        label="Description"
        variant="standard"
        style={{ marginLeft: "20px" }}
      />
      <br></br>
      <TextField id="create-addressInput" label="Address" variant="standard" />
      <TextField
        type={"number"}
        id="create-radius-input"
        label="Map radius (m)"
        variant="standard"
        style={{ marginLeft: "20px" }}
      />
      <br></br>
      <label>Start Date</label>
      <TextField
        type="date"
        id="create-start-date-input"
        label=" "
        variant="standard"
        style={{ marginLeft: "-70px" }}
      />
      <label style={{ marginLeft: "20px" }}>End Date</label>
      <TextField
        type="date"
        id="create-end-date-input"
        label=" "
        variant="standard"
        style={{ marginLeft: "-65px" }}
      />
      <br></br>
      <Button
        id="create-game-button"
        variant="contained"
        style={{ marginTop: 10, backgroundColor: "#360568" }}
      >
        Create Game
      </Button>
    </div>
  );
};

export default CreateGame;
