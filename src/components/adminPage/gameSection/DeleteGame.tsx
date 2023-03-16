import { Button, TextField } from "@mui/material";
import React from "react";
import { NumberLiteralType } from "typescript";

type Props = {
  id: number;
};

const DeleteGame = (id: Props) => {
  return (
    <div>
      <br></br>
      <b>Delete game</b>
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
