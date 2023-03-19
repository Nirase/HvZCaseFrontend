import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUser } from "../../api/apiCalls";
import { Player } from "../../interfaces/player";
import { User } from "../../interfaces/user";

type Props = {
  player: Player;
};

const PlayerListItemDetailed = ({ player }: Props) => {
  const playerId = player.id;
  const userId = player.userId;
  const isHuman = player.isHuman;
  const isPatientZero = player.isPatientZero;
  const biteCode = player.biteCode;
  const squadId = player.squadId;
  //const playerFirstName = user.firstName;
  //const playerLastName = user.lastName;

  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (player) {
      const fetchUser = async () => {
        const data = await getUser(+userId);
        setUser(data);
      };

      fetchUser();
    }
  }, [player]);

  return (
    <Card style={{ backgroundColor: "#d5dcf9", margin: 6 }}>
      <CardContent>
        <Typography variant="body2">Id: {playerId}</Typography>
        <Typography variant="body2">
          Name: {user?.firstName} {user?.lastName}
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
