import { faUsersRays } from "@fortawesome/free-solid-svg-icons";
import { Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { CheckIn } from "../../../interfaces/marker";

type LatLngLiteral = google.maps.LatLngLiteral;

type Props = {
  checkIn: CheckIn;
  setCheckInInfo: (info: CheckIn) => void;
};

const CheckInMarker = ({ checkIn, setCheckInInfo }: Props) => {
  const checkInIcon = {
    path: faUsersRays.icon[4] as string,
    fillColor: "#ffffff",
    strokeWeight: 0.5,
    fillOpacity: 1,
    scale: 0.05,
    anchor: new google.maps.Point(
      faUsersRays.icon[0] / 2, // width
      faUsersRays.icon[1] // height
    ),
    strokeColor: "black",
  };

  const todaysDateString = new Date().toLocaleString().split(",", 1)[0];
  const todaysDate = new Date(todaysDateString);
  const endDate = new Date(checkIn.endDate);

  const [position, setPosition] = useState<LatLngLiteral>();

  const handelSelect = () => {
    setCheckInInfo(checkIn);
  };

  useEffect(() => {
    if (checkIn.location) {
      const getPosition = async () => {
        const result = await getGeocode({
          address: checkIn.location,
        });
        const { lat, lng } = await getLatLng(result[0]);
        setPosition({ lat, lng });
      };
      getPosition();
    }
  }, []);
  if (todaysDate <= endDate) {
    if (position) {
      return (
        <Marker position={position} icon={checkInIcon} onClick={handelSelect} />
      );
    } else {
      return null;
    }
  } else return null;
};

export default CheckInMarker;
