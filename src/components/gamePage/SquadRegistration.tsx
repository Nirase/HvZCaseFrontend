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

    const addedSquad = await addSquad(+gameId, squad);

    if (addedSquad) {
      if (squads) {
        const allSquads = [...squads, addedSquad];
        setSquad(allSquads);
      }
    }

    setSnackbarFrom("created a squad");
    setSnackbarRes(addedSquad);
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
