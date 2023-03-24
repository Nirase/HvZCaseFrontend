import { faUsersRays } from "@fortawesome/free-solid-svg-icons";
import { InfoWindow, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { ICheckIn } from "../../../interfaces/marker";
import InfoWindowMap from "../../InfoWindowMap";

type LatLngLiteral = google.maps.LatLngLiteral;

type Props = {
  checkIn: ICheckIn;
  setCheckInInfo: (info: ICheckIn, position: LatLngLiteral) => void;
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
    if (position) {
      setCheckInInfo(checkIn, position);
    }
  };

  useEffect(() => {
    if (todaysDate <= endDate) {
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
    }
  }, []);

  if (position) {
    return (
      <>
        <Marker position={position} icon={checkInIcon} onClick={handelSelect} />
      </>
    );
  } else {
    return null;
  }
};

export default CheckInMarker;
