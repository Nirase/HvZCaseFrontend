import Button from "@mui/material/Button";

const SquadListItem = (squad: any) => {
  // make calls for each member and then check there value of is_alive

  const members = squad.squad.members;
  const dead = members.filter((member: any) => !member.is_alive);

  

  return (
    <div>
      <p>{squad.squad.name}</p>
      <p>Total number of members: {squad.squad.members.length}</p>
      <p>Deceased members: {dead.length}</p>
      <Button variant="outlined" color="secondary">
        Join
      </Button>
    </div>
  );
};
export default SquadListItem;
