import { IKill } from "../../../interfaces/marker";
import "../../../styles/map.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { IPlayer } from "../../../interfaces/player";

type Props = {
  kill: IKill | undefined;
  players: [];
  clearKillInfo: (info: undefined) => void;
};

const KillInfo = ({ kill, players, clearKillInfo }: Props) => {
  const [name, setName] = useState("");

  const handelClear = () => {
    // send up data on close
    clearKillInfo(undefined);
  };

  useEffect(() => {
    const deadOne: any = players.find((x: IPlayer) => x.id === kill?.victimId);
    if (deadOne) {
      setName(deadOne.firstName + " " + deadOne.lastName);
    }
  }, [kill]);

  if (kill === undefined) {
    return null;
  } else {
    return (
      <>
        <div className="infoHeader">
          <h3>Kill Info</h3>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={handelClear}
            className="cross"
          />
        </div>

        <h4>{name}</h4>

        <p>
          Kill Date:
          <span style={{ fontWeight: "bold" }}> {kill.timeOfDeath}</span>
        </p>

        <p>{kill.description}</p>
      </>
    );
  }
};
export default KillInfo;
