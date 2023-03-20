import {
  faPoo,
  faBiohazard,
  faSnowflake,
} from "@fortawesome/free-solid-svg-icons";
import { Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { MissionInfo, Mission } from "../../../interfaces/marker";

type LatLngLiteral = google.maps.LatLngLiteral;

type Props = {
  missionmarker: Mission;
  setInfo: (missonInfo: MissionInfo) => void;
  isHuman: boolean;
};

const MissionMarker = ({ missionmarker, setInfo, isHuman }: Props) => {
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

  const [position, setPosition] = useState<LatLngLiteral>();
  const description = missionmarker.description;

  const handelSelect = () => {
    const info = {
      startDate: missionmarker.startDate,
      endDate: missionmarker.endDate,
      description,
      name: missionmarker.name,
    };

    setInfo(info);
  };

  useEffect(() => {
    const getPosition = async () => {
      const result = await getGeocode({ address: missionmarker.location });
      const { lat, lng } = await getLatLng(result[0]);
      setPosition({ lat, lng });
    };
    getPosition();
  }, []);

  //if (todaysDate <= endDate) {
  if (isHuman && missionmarker.visibleToHumans) {
    if (position) {
      if (missionmarker.visibleToHumans && missionmarker.visibleToZombies) {
        return (
          <Marker position={position} icon={missions} onClick={handelSelect} />
        );
      } else if (missionmarker.visibleToHumans) {
        return (
          <Marker
            position={position}
            icon={humanMission}
            onClick={handelSelect}
          />
        );
      } else {
        return null;
      }
    } else return null;
  } else {
    if (position) {
      if (missionmarker.visibleToHumans && missionmarker.visibleToZombies) {
        return (
          <Marker position={position} icon={missions} onClick={handelSelect} />
        );
      } else if (missionmarker.visibleToZombies) {
        return (
          <Marker
            position={position}
            icon={zombieMission}
            onClick={handelSelect}
          />
        );
      } else {
        return null;
      }
    } else return null;
  }
  //} else return null;
};

export default MissionMarker;
