import { Button, TextField } from "@mui/material";
import React from "react";
import { NumberLiteralType } from "typescript";
import { deleteGame } from "../../../api/apiCalls";

type Props = {
  id: number;
  refreshList: Function;
};

const DeleteGame = ({ id, refreshList }: Props) => {
  const handleDelete = async () => {
    await deleteGame(+id);
    await refreshList();
  };

  return (
    <div>
      <br></br>
      <b>Delete game</b>
      <br></br>
      <Button
        id="delete-game-button"
        variant="contained"
        style={{ marginTop: 10, backgroundColor: "#360568" }}
        onClick={handleDelete}
      >
        Delete Game
      </Button>
    </div>
  );
};

export default DeleteGame;
