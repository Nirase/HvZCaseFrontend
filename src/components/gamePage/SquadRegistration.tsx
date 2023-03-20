import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { addSquad } from "../../api/apiCalls";
import { Player } from "../../interfaces/player";
import { AddSquad, Squad } from "../../interfaces/squad";

type Props = {
  player: Player;
  squads: Array<Squad> | undefined;
  setSquad: (squad: Array<Squad>) => void;
  setSnackbarRes: (res: any) => void;
  setSnackbarFrom: (from: string) => void;
};

const SquadRegistration = ({
  player,
  squads,
  setSquad,
  setSnackbarRes,
  setSnackbarFrom,
}: Props) => {
  const [name, setName] = useState("");
  const { gameId }: any = useParams();
  const id = player.id;
  const [checkName, setCheckName] = useState<boolean>();

  const handleAdd = async () => {
    const squad: AddSquad = {
      name,
      gameId: +gameId,
      creatorId: id,
    };

    const squadFront: Squad = {
      // placeholder i will put the data that get sent back here later
      id: 999,
      name,
      players: [],
      squadCheckIns: [],
    };

    const data = await addSquad(+gameId, squad);

    console.log("added squad", data); // ska skica upp detta sen
    if (data) {
      if (squads) {
        const allSquads = [...squads, squadFront];
        setSquad(allSquads);
      }
    }

    setSnackbarFrom("created a squad");
    setSnackbarRes(data);
  };

  useEffect(() => {
    if (name) {
      const regex = new RegExp("^[a-zA-Z0-9_=@,.;-]+$");
      const check = regex.test(name);
      setCheckName(check);
    } else {
      setCheckName(true);
    }
  }, [name]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography variant="h5" sx={{ mb: 0, mt: 2 }}>
        Squad Registration
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 0 }}>
        If you don't find the one you want to join you can make a new squad
      </Typography>

      <TextField
        label="Enter Squad name"
        variant="outlined"
        color="secondary"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mt: 2 }}
        error={!checkName}
        helperText={
          !checkName
            ? "You can have all letters and numbers but no spaces, the special characters you can use are  . , ; _ - @ =  "
            : ""
        }
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleAdd}
        sx={{ mt: 2, mb: 2 }}
        disabled={!checkName || !name}
      >
        Create
      </Button>
    </div>
  );
};
export default SquadRegistration;

// regex för squad name \A[a-zA-Z0-9_=@,.;\-]+\z
