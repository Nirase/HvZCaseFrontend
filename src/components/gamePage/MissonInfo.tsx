import { Paper } from "@mui/material";
import { Info } from "../../interfaces/marker";
import "../../styles/map.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

type Props = {
  info: Info | undefined;
  clearInfo: (info: undefined) => void;
};

const MissonInfo = ({ info, clearInfo }: Props) => {
  const [showStartDate, setShowStartDate] = useState<boolean>();
  useEffect(() => {
    if (info) {
      const todaysDateString = new Date().toLocaleString().split(",", 1)[0];
      const todaysDate = new Date(todaysDateString);
      const startDate = new Date(info.startDate);

      setShowStartDate(startDate > todaysDate);
    }
  }, [info]);

  const handelClear = () => {
    clearInfo(undefined);
  };

  if (info === undefined) {
    return (
      <Paper className="mapInfo">
        <h3>Mission Info</h3>
        <p>No mission chosen</p>
      </Paper>
    );
  } else {
    return (
      <Paper className="mapInfo">
        <div className="infoHeader">
          <h3>Mission Info</h3>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={handelClear}
            className="cross"
          />
        </div>

        <h4>{info.name}</h4>
        {showStartDate && (
          <p>
            Start Date:
            <span style={{ fontWeight: "bold" }}> {info.startDate}</span>
          </p>
        )}
        <p>
          End Date:
          <span style={{ fontWeight: "bold" }}> {info.endDate}</span>
        </p>
        <p>{info.description}</p>
      </Paper>
    );
  }
};
export default MissonInfo;
