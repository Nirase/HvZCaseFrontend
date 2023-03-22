import { IPlayer } from "../../interfaces/player";
import { ISquad } from "../../interfaces/squad";
import SquadListItem from "./SquadListItem";

type Props = {
  players: Array<IPlayer>;
  squads: Array<ISquad>;
  player: IPlayer | undefined;
  updatePlayer: (player: IPlayer) => void;
};

const SquadList = ({ players, squads, player, updatePlayer }: Props) => {
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
              />
            </div>
          );
        })}
    </div>
  );
};
export default SquadList;
