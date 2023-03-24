import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAnything } from "../../api/apiCalls";
import { IPlayer } from "../../interfaces/player";
import "../../styles/squad.css";

import MembersTable from "./MembersTable";

type Props = {
  members: Array<IPlayer>;
};

const Members = ({ members }: Props) => {
  const [aliveMembers, setAliveMembers] = useState<Array<IPlayer>>();
  const [deadMembers, setDeadMembers] = useState<Array<IPlayer>>();

  useEffect(() => {
    let dead: number = 0;
    let alive: IPlayer[] = [];
  }, []);

  return (
    <div>
      <Typography variant="h4">Members</Typography>

      <Grid className="membersContainer" sx={{ margin: "10px" }}>
        <MembersTable members={members} />
      </Grid>
    </div>
  );
};
export default Members;
