import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IPlayer } from "../../interfaces/player";
import { IUser } from "../../interfaces/user";
import "../../styles/adminPage.css";

type Props = {
  player: IPlayer;
  setPlayer?: (returnplayer: IPlayer) => void;
};

const PlayerListItemDetailed = ({ player, setPlayer }: Props) => {
  const playerId = player.id;
  const userId = player.userId;
  const isHuman = player.isHuman;
  const isPatientZero = player.isPatientZero;
  const biteCode = player.biteCode;
  const squadId = player.squadId;
  const firstName = player.firstName;
  const lastName = player.lastName;

  //calls function in the parent
  const handleClick = () => {
    if (setPlayer) {
      setPlayer(player);
    }
  };

  return (
    <Card className="adminplayercard" style={{}} onClick={handleClick}>
      <CardContent>
        <Typography variant="body2">Id: {playerId}</Typography>
        <Typography variant="body2">
          Name: {firstName} {lastName}
        </Typography>
        <Typography variant="body2">UserId: {userId + ""}</Typography>
        <Typography variant="body2">isHuman: {isHuman + ""}</Typography>
        <Typography variant="body2">
          isPatientZero: {isPatientZero + ""}
        </Typography>
        <Typography variant="body2">biteCode: {biteCode + ""}</Typography>
        <Typography variant="body2">squadId: {squadId + ""}</Typography>
      </CardContent>
    </Card>
  );
};

export default PlayerListItemDetailed;
