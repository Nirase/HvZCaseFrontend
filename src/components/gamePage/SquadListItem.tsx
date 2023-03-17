import { CardActions, Button, Card, CardContent } from "@mui/material";

import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Player } from "../../interfaces/player";
import { Squad } from "../../interfaces/squad";

type Props = {
  squad: Squad;
  players: Array<Player>;
};

const SquadListItem = ({ squad, players }: Props) => {
  const [amountOfMembers, setAmountOfMembers] = useState<number>(0);
  const [dead, setDead] = useState<number>(0);

  useEffect(() => {
    let nrMembers = 0;
    let nrDead = 0;
    squad.players.forEach((player: string) => {
      const id = player.split("/")[5];
      nrMembers += 1;
      const person: any = players.find((player: Player) => player.id === +id);

      if (person) {
        if (!person.isHuman) {
          nrDead += 1;
        }
      }
    });
    setAmountOfMembers(nrMembers);
    setDead(nrDead);
  }, []);

  const handleJoin = () => {
    console.log(squad.name);
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
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={handleJoin}
        >
          Join
        </Button>
      </CardActions>
    </Card>
  );
};
export default SquadListItem;
