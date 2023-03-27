import { IPlayer } from "../../interfaces/player";
import PlayerListItem from "./PlayerListItem";
import "../../styles/player.css";
type Props = {
  players: Array<IPlayer>;
};

const PlayerList = ({ players }: Props) => {
  return (
    <div className="playerList">
      <h3>List of players</h3>
      {players.map((player) => {
        return (
          <div key={player.id} className="playerCard">
            <PlayerListItem player={player} />
          </div>
        );
      })}
    </div>
  );
};
export default PlayerList;
