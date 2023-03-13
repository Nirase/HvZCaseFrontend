import {
  faSkullCrossbones,
  faPoo,
  faBiohazard,
  faUsersRays,
  faSnowflake,
} from "@fortawesome/free-solid-svg-icons";
import { Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { Info, Mission } from "../../interfaces/marker";

type LatLngLiteral = google.maps.LatLngLiteral;

type Props = {
  missionmarker: Mission;
  info: (missonInfo: Info) => void;
};

const MissionMarker = ({ missionmarker, info }: Props) => {
  // markers
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

  const missions = {
    path: faPoo.icon[4] as string,
    fillColor: "#6e231e",
    strokeWeight: 1,
    fillOpacity: 1,
    scale: 0.05,
    anchor: new google.maps.Point(
      faPoo.icon[0] / 2, // width
      faPoo.icon[1] // height
    ),
    strokeColor: "#ffffff",
  };

  const humanMission = {
    path: faSnowflake.icon[4] as string,
    fillColor: "#ffffff",
    strokeWeight: 0.5,
    fillOpacity: 1,
    scale: 0.05,
    anchor: new google.maps.Point(
      faSnowflake.icon[0] / 2, // width
      faSnowflake.icon[1] // height
    ),
    strokeColor: "black",
  };

  const zombieMission = {
    path: faBiohazard.icon[4] as string,
    fillColor: "#c91804",
    strokeWeight: 0.5,
    fillOpacity: 1,
    scale: 0.05,
    anchor: new google.maps.Point(
      faBiohazard.icon[0] / 2, // width
      faBiohazard.icon[1] // height
    ),
    strokeColor: "black",
  };

  const checkIn = {
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

  // funktions
  const todaysDate = new Date().toLocaleString().split(",", 1);

  const [icon, setIcon] = useState();
  const [position, setPosition] = useState<LatLngLiteral>();
  const description = missionmarker.description;

  const handelSelect = () => {
    console.log("hej");
  };

  useEffect(() => {
    const getPosition = async () => {
      const result = await getGeocode({ address: missionmarker.location });
      const { lat, lng } = await getLatLng(result[0]);
      setPosition({ lat, lng });
    };
    getPosition();
  }, []);

  if (position) {
    return (
      <Marker
        position={position}
        icon={icon}
        title="misson for humnas"
        onClick={handelSelect}
      />
    );
  } else {
    return null;
  }
};

export default MissionMarker;
