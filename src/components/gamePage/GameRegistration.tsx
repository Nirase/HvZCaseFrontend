import Button from "@mui/material/Button";
import { useParams } from "react-router";
import { User } from "../../interfaces/user";
import randomWords from "random-words";
import { addPlayer, Player } from "../../interfaces/player";
import { addPlayerToGame } from "../../api/apiCalls";

type Props = {
  gameName: string;
  user: User;
  players: Array<Player> | undefined;
  setPlayer: (player: Player) => void;
  addToAllPlayers: (allPlayers: Array<Player>) => void;
  setSnackbarRes: (res: any) => void;
  setSnackbarFrom: (from: string) => void;
};

const GameRegistration = ({
  gameName,
  user,
  players,
  setPlayer,
  addToAllPlayers,
  setSnackbarRes,
  setSnackbarFrom,
}: Props) => {
  const { gameId }: any = useParams();
  const biteCode = randomWords({ min: 3, max: 10 })[0];

  const join = async () => {
    const newPlayer: addPlayer = {
      isHuman: true,
      isPatientZero: false,
      gameId: +gameId,
      userId: user.id,
      biteCode,
    };

    const addedPlayer = await addPlayerToGame(gameId, newPlayer);
    setSnackbarRes(addedPlayer);
    setSnackbarFrom("register for game");
    if (addedPlayer) {
      setPlayer(addedPlayer);
      if (players) {
        const allPlayers = [...players, addedPlayer];
        addToAllPlayers(allPlayers);
      }
    }
    console.log(addedPlayer);
  };
  return (
    <>
      <Button
        variant="contained"
        style={{ backgroundColor: "#360568" }}
        name={gameName}
        onClick={join}
      >
        Enter {gameName}
      </Button>
    </>
  );
};
export default GameRegistration;
