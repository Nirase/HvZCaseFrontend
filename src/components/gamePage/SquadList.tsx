import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSquads } from "../../api/apiCalls";
import { Player } from "../../interfaces/player";
import { Squad } from "../../interfaces/squad";
import SquadListItem from "./SquadListItem";

type Props = {
  players: Array<Player>;
  squads: Array<Squad>;
};

const SquadList = ({ players, squads }: Props) => {
  return (
    <div>
      <h3>Squads active</h3>
      {squads &&
        squads.map((squad: Squad) => {
          return (
            <div key={squad.name} style={{ marginBottom: "10px" }}>
              <SquadListItem squad={squad} players={players} />
            </div>
          );
        })}
    </div>
  );
};
export default SquadList;
