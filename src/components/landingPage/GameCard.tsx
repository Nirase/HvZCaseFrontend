import React from "react";
import { IGame } from "../../interfaces/game";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ROLES } from "../../roles/roles";
import keycloak from "../../keycloak";
import { useNavigate } from "react-router-dom";

type Props = {
  game: IGame;
};

const GameCard = ({ game }: Props) => {
  const gameId = game.id;
  const name = game.name;
  const description = game.description;
  const state = game.gameState;
  const playerAmount = game.players.length;
  const startDate = game.startDate;
  const endDate = game.endDate;

  const navigate = useNavigate();
  const toGame = () => {
    navigate("/game/" + gameId);
  };

  return (
    <>
      <Card sx={{ m: 2 }}>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{
                fontSize: 20,
              }}
              color="text.primary"
              gutterBottom
            >
              <b>{name}</b>
            </Typography>
            <Typography
              sx={{
                fontSize: 18,
              }}
              color="text.primary"
            >
              {" "}
              <b>Players: </b>
              {playerAmount}
            </Typography>
          </div>
          <Typography variant="h5" component="div"></Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {description}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.primary">
            <b>State: </b> {state}
          </Typography>
          <Typography variant="body2">
            <b>Start Date: </b> {startDate}
            <br />
            <b>End Date: </b> {endDate}
          </Typography>
        </CardContent>
        {keycloak.hasRealmRole(ROLES.User) && (
          <CardActions>
            <Button size="small" onClick={() => toGame()}>
              Game
            </Button>
          </CardActions>
        )}
      </Card>
    </>
  );
};

export default GameCard;
