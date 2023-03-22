import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneGame } from "../../api/apiCalls";
import { IGame } from "../../interfaces/game";
import { ISquad } from "../../interfaces/squad";
import CheckInCreate from "./CheckInCreate";

type Props = {
  squad: ISquad;
  setSnackbarRes: (res: any) => void;
  setSnackbarFrom: (from: string) => void;
};

const CheckIns = ({ squad, setSnackbarFrom, setSnackbarRes }: Props) => {
  const { gameId, squadId }: any = useParams();
  const [game, setGame] = useState<IGame>();

  useEffect(() => {
    const fetchGame = async () => {
      const res = await getOneGame(+gameId);
      setGame(res);
    };
    fetchGame();
  }, []);
  if (game) {
    return (
      <div>
        <CheckInCreate
          setSnackbarFrom={(from: string) => setSnackbarFrom(from)}
          setSnackbarRes={(res: any) => setSnackbarRes(res)}
        />
      </div>
    );
  } else return null;
};
export default CheckIns;
