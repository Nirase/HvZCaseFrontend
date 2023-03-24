import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneGame } from "../../api/apiCalls";
import { IGame } from "../../interfaces/game";
import { ICheckIn } from "../../interfaces/marker";
import { ISquad } from "../../interfaces/squad";
import CreateMarkerMap from "../CreateMarkerMap";
import CheckInCreate from "./CheckInCreate";
import "../../styles/squad.css";

type Props = {
  squad: ISquad;
  setSnackbarRes: (res: any) => void;
  setSnackbarFrom: (from: string) => void;
};

const CheckIns = ({ squad, setSnackbarFrom, setSnackbarRes }: Props) => {
  const { gameId }: any = useParams();
  const [game, setGame] = useState<IGame>();
  const [address, setAddress] = useState("");
  const [checkIns, setCheckIns] = useState<Array<ICheckIn>>();

  useEffect(() => {
    const fetchGame = async () => {
      const res = await getOneGame(+gameId);
      setGame(res);
    };
    fetchGame();
    setCheckIns(squad.squadCheckIns);
  }, []);

  if (game) {
    return (
      <div className="checkInCreateContainer">
        <CheckInCreate
          setSnackbarFrom={(from: string) => setSnackbarFrom(from)}
          setSnackbarRes={(res: any) => setSnackbarRes(res)}
          marker={address}
          allCheckIns={checkIns}
          setAllCheckIns={(cheks: Array<ICheckIn>) => setCheckIns(cheks)}
        />
        <CreateMarkerMap
          game={game}
          markerAddress={(address: string) => setAddress(address)}
          page={"squad"}
          checkInMarkers={checkIns}
        />
      </div>
    );
  } else return null;
};
export default CheckIns;
