import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAnything } from "../../api/apiCalls";
import { Player } from "../../interfaces/player";
import "../../styles/squad.css";

import MembersTable from "./MembersTable";

type Props = {
  members: Array<string>;
};

const Members = ({ members }: Props) => {
  const [membersAsPlayers, setMembersAsPlayers] = useState<Array<Player>>();
  const [aliveMembers, setAliveMembers] = useState<Array<Player>>();
  const [deadMembers, setDeadMembers] = useState<Array<Player>>();

  useEffect(() => {
    let allMembersAsPlayer: Player[] = [];
    let dead: Player[] = [];
    let alive: Player[] = [];
    const fetchPlayers = async () => {
      members.forEach(async (member: string) => {
        const fetchedMember: Player = await getAnything(member);
        allMembersAsPlayer.push(fetchedMember);
        setMembersAsPlayers(allMembersAsPlayer);
        if (fetchedMember.isHuman) {
          alive.push(fetchedMember);
          setAliveMembers(alive);
        } else {
          dead.push(fetchedMember);
          setDeadMembers(dead);
        }
      });
    };
    fetchPlayers();
  }, []);

  if (membersAsPlayers) {
    return (
      <div>
        <Typography variant="h5">Members</Typography>
        <Grid className="membersContainer">
          <MembersTable members={membersAsPlayers} />
        </Grid>
      </div>
    );
  } else return null;
};
export default Members;
