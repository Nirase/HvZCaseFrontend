import React from "react";
import { Player } from "../../interfaces/player";
import PlayerListItemDetailed from "./PlayerListItemDetailed";

type Props = {
  players: Array<Player>;
};
const PlayerListDetailed = ({ players }: Props) => {
  return (
    <div>
      {players.map((player) => {
        return (
          <div key={player.id}>
            <PlayerListItemDetailed player={player} />
          </div>
        );
      })}
    </div>
  );
};

export default PlayerListDetailed;
