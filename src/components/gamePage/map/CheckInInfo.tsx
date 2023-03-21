import { CheckIn } from "../../../interfaces/marker";
import "../../../styles/map.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type Props = {
  checkIn: CheckIn | undefined;

  clearCheckInInfo: (info: undefined) => void;
};

const CheckInInfo = ({ checkIn, clearCheckInInfo }: Props) => {
  const handelClear = () => {
    clearCheckInInfo(undefined);
  };

  if (checkIn === undefined) {
    return null;
  } else {
    return (
      <>
        <div className="infoHeader">
          <h3>CheckIn</h3>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={handelClear}
            className="cross"
          />
        </div>

        <p>
          Start Date:
          <span style={{ fontWeight: "bold" }}> {checkIn.startDate}</span>
        </p>

        <p>
          End Date:
          <span style={{ fontWeight: "bold" }}> {checkIn.endDate}</span>
        </p>
      </>
    );
  }
};
export default CheckInInfo;
