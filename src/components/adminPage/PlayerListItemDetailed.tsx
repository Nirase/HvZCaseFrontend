import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUser } from "../../api/apiCalls";
import { IPlayer } from "../../interfaces/player";
import { IUser } from "../../interfaces/user";

type Props = {
  player: IPlayer;
};

const PlayerListItemDetailed = ({ player }: Props) => {
  const playerId = player.id;
  const userId = player.userId;
  const isHuman = player.isHuman;
  const isPatientZero = player.isPatientZero;
  const biteCode = player.biteCode;
  const squadId = player.squadId;
  const firstName = player.firstName;
  const lastName = player.lastName;

  return (
    <Card style={{ backgroundColor: "#d5dcf9", margin: 6 }}>
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
