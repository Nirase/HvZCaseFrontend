import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import { Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { Kill } from "../../../interfaces/marker";

type LatLngLiteral = google.maps.LatLngLiteral;

type Props = {
  kill: Kill;
  setKillInfo: (info: Kill) => void;
};

const KillMarker = ({ kill, setKillInfo }: Props) => {
  const scull = {
    path: faSkullCrossbones.icon[4] as string,
    fillColor: "gray",
    strokeWeight: 1,
    fillOpacity: 1,
    scale: 0.05,
    anchor: new google.maps.Point(
      faSkullCrossbones.icon[0] / 2, // width
      faSkullCrossbones.icon[1] // height
    ),
    strokeColor: "#ffffff",
  };

  const [position, setPosition] = useState<LatLngLiteral>();
  const description = kill.description;

  const handelSelect = () => {
    const killInfo = {
      timeOfDeath: kill.timeOfDeath,
      victimId: kill.victimId,
      location: kill.location,
      description,
    };
    setKillInfo(killInfo);
  };

  useEffect(() => {
    if (kill.location) {
      const getPosition = async () => {
        const result = await getGeocode({
          address: kill.location,
        });
        const { lat, lng } = await getLatLng(result[0]);
        setPosition({ lat, lng });
      };
      getPosition();
    }
  }, []);

  if (position) {
    return <Marker position={position} icon={scull} onClick={handelSelect} />;
  } else {
    return null;
  }
};

export default KillMarker;
