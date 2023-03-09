import { CardActions, Button, Card, CardContent } from "@mui/material";

import Typography from "@mui/material/Typography";

type Props = {
  squad: any;
};

const SquadListItem = ({ squad }: Props) => {
  const members = squad.members;
  const dead = members.filter((member: any) => !member.is_alive);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {squad.name}
        </Typography>
        <Typography variant="body2">Members: {squad.members.length}</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Deceased members: {dead.length}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" color="secondary">
          Join
        </Button>
      </CardActions>
    </Card>
  );
};
export default SquadListItem;
