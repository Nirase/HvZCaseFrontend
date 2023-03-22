import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAnything } from "../../api/apiCalls";
import { IPlayer } from "../../interfaces/player";
import "../../styles/squad.css";

import MembersTable from "./MembersTable";

type Props = {
  members: Array<string>;
};

const Members = ({ members }: Props) => {
  const [membersAsPlayers, setMembersAsPlayers] = useState<Array<IPlayer>>();
  const [aliveMembers, setAliveMembers] = useState<Array<IPlayer>>();
  const [deadMembers, setDeadMembers] = useState<Array<IPlayer>>();

  useEffect(() => {
    let allMembersAsPlayer: IPlayer[] = [];
    let dead: IPlayer[] = [];
    let alive: IPlayer[] = [];
    const fetchPlayers = async () => {
      members.forEach(async (member: string) => {
        const fetchedMember: IPlayer = await getAnything(member);
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
        <Grid className="membersContainer" sx={{ margin: "10px" }}>
          {members.length === membersAsPlayers.length ? (
            <MembersTable members={membersAsPlayers} />
          ) : (
            ""
          )}
        </Grid>
      </div>
    );
  } else return null;
};
export default Members;
