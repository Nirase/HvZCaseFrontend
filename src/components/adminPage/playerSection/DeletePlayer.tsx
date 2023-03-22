import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { deletePlayer } from "../../../api/apiCalls";

type Props = {
  gameId: number;
  playerId: number;
  deleteFunction: Function;
  setSnackbarRes: (res: any) => void;
  setSnackbarFrom: (from: string) => void;
};

const DeletePlayer = ({
  gameId,
  playerId,
  deleteFunction,
  setSnackbarRes,
  setSnackbarFrom,
}: Props) => {
  const deletePlayerFromGame = async () => {
    console.log(gameId + " | " + playerId);
    if (gameId != null && playerId != null) {
      const deletePlayerRes = await deletePlayer(gameId, +playerId);
      setSnackbarFrom(" player: " + playerId);
      setSnackbarRes(deletePlayerRes);

      await deleteFunction();
    }
  };

  return (
    <>
      <Button
        variant="contained"
        style={{ marginTop: 10, backgroundColor: "#360568" }}
        onClick={deletePlayerFromGame}
      >
        Delete player
      </Button>
    </>
  );
};

export default DeletePlayer;
