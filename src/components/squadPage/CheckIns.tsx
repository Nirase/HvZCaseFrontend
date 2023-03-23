import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnything, getOneGame } from "../../api/apiCalls";
import { IGame } from "../../interfaces/game";
import { ICheckIn } from "../../interfaces/marker";
import { ISquad } from "../../interfaces/squad";
import CreateMarkerMap from "../CreateMarkerMap";
import CheckInCreate from "./CheckInCreate";

type Props = {
  squad: ISquad;
  setSnackbarRes: (res: any) => void;
  setSnackbarFrom: (from: string) => void;
};

const CheckIns = ({ squad, setSnackbarFrom, setSnackbarRes }: Props) => {
  const { gameId, squadId }: any = useParams();
  const [game, setGame] = useState<IGame>();
  const [address, setAddress] = useState("");
  const [CheckIns, setCheckIns] = useState<Array<ICheckIn>>();

  useEffect(() => {
    const fetchGame = async () => {
      const res = await getOneGame(+gameId);
      setGame(res);
    };
    fetchGame();

    let fetchedChecks: any = [];
    const fetchChecks = async (path: string) => {
      const res = await getAnything(path);
      fetchedChecks.push(res);
      setCheckIns(fetchedChecks);
    };
    squad.squadCheckIns.forEach((check: string) => {
      fetchChecks(check);
    });
  }, []);

  if (game) {
    return (
      <div>
        <CheckInCreate
          setSnackbarFrom={(from: string) => setSnackbarFrom(from)}
          setSnackbarRes={(res: any) => setSnackbarRes(res)}
          marker={address}
        />
        <CreateMarkerMap
          game={game}
          markerAddress={(address: string) => setAddress(address)}
          page={"squad"}
          checkInMarkers={CheckIns}
        />
      </div>
    );
  } else return null;
};
export default CheckIns;
