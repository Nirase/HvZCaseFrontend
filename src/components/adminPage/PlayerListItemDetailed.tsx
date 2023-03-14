import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Player } from "../../interfaces/player";

type Props = {
  player: Player;
};

const PlayerListItemDetailed = ({ player }: Props) => {
  const playerId = player.id;
  const userId = player.userId;
  const isHuman = player.isHuman;
  const isPatientZero = player.isPatientZero;
  const biteCode = player.biteCode;

  return (
    <Card style={{ backgroundColor: "#d5dcf9", margin: 6 }}>
      <CardContent>
        <Typography variant="body2">Id: {playerId}</Typography>
        <Typography variant="body2">
          Name: {player.firstName + ""} {player.lastName + ""}
        </Typography>
        <Typography variant="body2">UserId: {userId + ""}</Typography>
        <Typography variant="body2">isHuman: {isHuman + ""}</Typography>
        <Typography variant="body2">
          isPatientZero: {isPatientZero + ""}
        </Typography>
        <Typography variant="body2">biteCode: {biteCode + ""}</Typography>
      </CardContent>
    </Card>
  );
};

export default PlayerListItemDetailed;
