import { Player } from "../../interfaces/player";
import { Squad } from "../../interfaces/squad";
import SquadListItem from "./SquadListItem";

type Props = {
  players: Array<Player>;
  squads: Array<Squad>;
  player: Player | undefined;
  updatePlayer: (player: Player) => void;
};

const SquadList = ({ players, squads, player, updatePlayer }: Props) => {
  return (
    <div>
      <h3>Squads active</h3>
      {squads &&
        squads.map((squad: Squad) => {
          return (
            <div key={squad.id} style={{ marginBottom: "10px" }}>
              <SquadListItem
                squad={squad}
                players={players}
                player={player}
                updatePlayer={(player: Player) => updatePlayer(player)}
              />
            </div>
          );
        })}
    </div>
  );
};
export default SquadList;
