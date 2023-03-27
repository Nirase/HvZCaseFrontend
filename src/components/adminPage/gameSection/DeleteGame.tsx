import { Button, TextField } from "@mui/material";
import React from "react";
import { NumberLiteralType } from "typescript";
import { deleteGame } from "../../../api/apiCalls";

type Props = {
  id: number;
  handleDeleteGame: Function;
  setSnackbarRes: (res: any) => void;
  setSnackbarFrom: (from: string) => void;
};

const DeleteGame = ({
  id,
  handleDeleteGame,
  setSnackbarRes,
  setSnackbarFrom,
}: Props) => {
  const handleDelete = async () => {
    const deleteGameRes = await deleteGame(+id);
    setSnackbarFrom(" game: " + id);
    setSnackbarRes(deleteGameRes);
    handleDeleteGame(id);
  };

  return (
    <Button
      id="delete-game-button"
      variant="contained"
      style={{ marginTop: 10, backgroundColor: "#360568" }}
      onClick={handleDelete}
    >
      Delete Game
    </Button>
  );
};

export default DeleteGame;
