import { Button, TextField } from "@mui/material";
import React from "react";

const DeleteGame = () => {
  return (
    <div>
      <br></br>
      <b>Delete game</b>
      <br></br>
      <TextField
        type={"number"}
        id="delete-gameId-input"
        label="Id"
        variant="standard"
      />
      <br></br>
      <Button
        id="delete-game-button"
        variant="contained"
        style={{ marginTop: 10, backgroundColor: "#360568" }}
      >
        Delete Game
      </Button>
    </div>
  );
};

export default DeleteGame;
