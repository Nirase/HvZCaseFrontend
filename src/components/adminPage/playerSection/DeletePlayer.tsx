import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { deletePlayer } from "../../../api/apiCalls";

type Props = {
  gameId: number;
  playerId: number;
  deleteFunction: Function;
};

const DeletePlayer = ({ gameId, playerId, deleteFunction }: Props) => {
  const deletePlayerFromGame = async () => {
    console.log(gameId + " | " + playerId);
    if (gameId != null && playerId != null) {
      await deletePlayer(gameId, +playerId);
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
