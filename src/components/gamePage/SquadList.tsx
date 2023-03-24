import { IPlayer } from "../../interfaces/player";
import { ISquad } from "../../interfaces/squad";
import SquadListItem from "./SquadListItem";

type Props = {
  players: Array<IPlayer>;
  squads: Array<ISquad>;
  player: IPlayer | undefined;
  updatePlayer: (player: IPlayer) => void;
  setSnackbarRes: (res: any) => void;
  setSnackbarFrom: (from: string) => void;
};

const SquadList = ({
  players,
  squads,
  player,
  updatePlayer,
  setSnackbarRes,
  setSnackbarFrom,
}: Props) => {
  return (
    <div>
      <h3>Squads active</h3>
      {squads &&
        squads.map((squad: ISquad) => {
          return (
            <div key={squad.id} style={{ marginBottom: "10px" }}>
              <SquadListItem
                squad={squad}
                players={players}
                player={player}
                updatePlayer={(player: IPlayer) => updatePlayer(player)}
                setSnackbarRes={(res: any) => {
                  setSnackbarRes(res);
                }}
                setSnackbarFrom={(from: string) => setSnackbarFrom(from)}
              />
            </div>
          );
        })}
    </div>
  );
};
export default SquadList;
