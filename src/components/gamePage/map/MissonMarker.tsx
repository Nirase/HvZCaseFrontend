import {
  faPoo,
  faBiohazard,
  faSnowflake,
} from "@fortawesome/free-solid-svg-icons";
import { Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { IMissionInfo, IMission } from "../../../interfaces/marker";

type LatLngLiteral = google.maps.LatLngLiteral;

type Props = {
  missionmarker: IMission;
  setInfo: (missonInfo: IMissionInfo) => void;
  setId?: (id: number) => void; //return mission id
};

const MissionMarker = ({ missionmarker, setInfo, setId }: Props) => {
  // markers
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

  // functionality
  const todaysDateString = new Date().toLocaleString().split(",", 1)[0];
  const todaysDate = new Date(todaysDateString);
  const endDate = new Date(missionmarker.endDate);

  const [icon, setIcon] = useState<google.maps.Symbol>();

  const [position, setPosition] = useState<LatLngLiteral>();
  const description = missionmarker.description;

  const handelSelect = () => {
    const info = {
      startDate: missionmarker.startDate,
      endDate: missionmarker.endDate,
      description,
      name: missionmarker.name,
    };
    if (setId) {
      setId(missionmarker.id);
    }
    setInfo(info);
  };

  useEffect(() => {
    const getPosition = async () => {
      const result = await getGeocode({ address: missionmarker.location });
      const { lat, lng } = await getLatLng(result[0]);
      setPosition({ lat, lng });
    };
    if (todaysDate <= endDate) {
      getPosition();
    }
    //set marker symbol
    if (missionmarker.visibleToHumans && missionmarker.visibleToZombies) {
      setIcon(missions);
    } else if (missionmarker.visibleToHumans) {
      setIcon(humanMission);
    } else if (missionmarker.visibleToZombies) {
      setIcon(zombieMission);
    }
  }, []);

  if (position) {
    return <Marker position={position} icon={icon} onClick={handelSelect} />;
  } else return null;
};

export default MissionMarker;
