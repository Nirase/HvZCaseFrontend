import { Button, TextField } from "@mui/material";
import React from "react";
import { NumberLiteralType } from "typescript";
import { deleteGame } from "../../../api/apiCalls";

type Props = {
  id: number;
  refreshList: Function;
  setSnackbarRes: (res: any) => void;
  setSnackbarFrom: (from: string) => void;
};

const DeleteGame = ({
  id,
  refreshList,
  setSnackbarRes,
  setSnackbarFrom,
}: Props) => {
  const handleDelete = async () => {
    const deleteGameRes = await deleteGame(+id);
    setSnackbarFrom(" game: " + id);
    setSnackbarRes(deleteGameRes);
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
