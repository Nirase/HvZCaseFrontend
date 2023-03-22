import { CardActions, Button, Card, CardContent } from "@mui/material";

import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import {
  AddPlayerToSquad,
  removePlayerFromSquad,
  updatePlayerToGame,
} from "../../api/apiCalls";
import { IPlayer } from "../../interfaces/player";
import { ISquad } from "../../interfaces/squad";

type Props = {
  squad: ISquad;
  players: Array<IPlayer>;
  player: IPlayer | undefined;
  updatePlayer: (player: IPlayer) => void;
};

const SquadListItem = ({ squad, players, player, updatePlayer }: Props) => {
  const [amountOfMembers, setAmountOfMembers] = useState<number>(0);
  const [dead, setDead] = useState<number>(0);
  const { gameId }: any = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    let nrMembers = 0;
    let nrDead = 0;
    squad.players.forEach((player: string) => {
      const id = player.split("/")[5];
      nrMembers += 1;
      const person: any = players.find((player: IPlayer) => player.id === +id);

      if (person) {
        if (!person.isHuman) {
          nrDead += 1;
        }
      }
    });
    setAmountOfMembers(nrMembers);
    setDead(nrDead);
  }, []);

  const handleJoin = async () => {
    if (player) {
      const playerCopy: IPlayer = { ...player };
      playerCopy.squadId = squad.id;

      await AddPlayerToSquad(+gameId, squad.id, player.id);
      updatePlayer(playerCopy);
      setAmountOfMembers(amountOfMembers + 1);
    }
  };

  const handleLeave = async () => {
    if (player) {
      const playerCopy: IPlayer = { ...player };
      playerCopy.squadId = null;

      await removePlayerFromSquad(+gameId, squad.id, player.id);
      updatePlayer(playerCopy);
      setAmountOfMembers(amountOfMembers - 1);
    }
  };

  const handleInfo = () => {
    navigate("/game/" + gameId + "/squad/" + squad.id);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {squad.name}
        </Typography>
        <Typography variant="body2">Members: {amountOfMembers}</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Deceased members: {dead}
        </Typography>
      </CardContent>
      <CardActions>
        {player && (
          <>
            {player.squadId === squad.id ? (
              <>
                <Button
                  size="small"
                  variant="outlined"
                  color="secondary"
                  onClick={handleInfo}
                >
                  Info
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={handleLeave}
                >
                  Leave
                </Button>
              </>
            ) : (
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                onClick={handleJoin}
              >
                Join
              </Button>
            )}
          </>
        )}
      </CardActions>
    </Card>
  );
};
export default SquadListItem;
