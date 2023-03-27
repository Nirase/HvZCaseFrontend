import { Grid, Typography } from "@mui/material";
import { IPlayer } from "../../interfaces/player";
import "../../styles/squad.css";

import MembersTable from "./MembersTable";

type Props = {
  members: Array<IPlayer>;
};

const Members = ({ members }: Props) => {
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
