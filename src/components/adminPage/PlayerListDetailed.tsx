import React, { useEffect, useState } from "react";
import { IPlayer } from "../../interfaces/player";
import PlayerListItemDetailed from "./PlayerListItemDetailed";

type Props = {
  players: Array<IPlayer>;
  propPlayer: (returnedplayer: IPlayer) => void;
};
const PlayerListDetailed = ({ players, propPlayer }: Props) => {
  return (
    <div>
      {players.map((player) => {
        return (
          <div key={player.id}>
            <PlayerListItemDetailed
              player={player}
              setPlayer={(returnplayer: IPlayer) => propPlayer(returnplayer)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PlayerListDetailed;
