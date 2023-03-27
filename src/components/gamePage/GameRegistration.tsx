import Button from "@mui/material/Button";
import { useParams } from "react-router";
import { IUser } from "../../interfaces/user";
import randomWords from "random-words";
import { IAddPlayer, IPlayer } from "../../interfaces/player";
import { AddPlayerToGame } from "../../api/apiCalls";

type Props = {
  gameName: string;
  user: IUser;
  players: Array<IPlayer> | undefined;
  setPlayer: (player: IPlayer) => void;
  addToAllPlayers: (allPlayers: Array<IPlayer>) => void;
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
  const number: number = +gameId + user.id;

  const join = async () => {
    const newPlayer: IAddPlayer = {
      isHuman: true,
      isPatientZero: false,
      gameId: +gameId,
      userId: user.id,
      biteCode: biteCode + number,
    };

    const addedPlayer = await AddPlayerToGame(gameId, newPlayer);

    setSnackbarRes(addedPlayer);
    setSnackbarFrom("register for game");
    if (addedPlayer) {
      setPlayer(addedPlayer);
      if (players) {
        const allPlayers = [...players, addedPlayer];
        addToAllPlayers(allPlayers);
      }
    }
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
