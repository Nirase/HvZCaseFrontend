import { Circle, GoogleMap, Marker } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../../styles/map.css";
import Places from "./Places";

import {
  faSkullCrossbones,
  faPoo,
  faBiohazard,
  faUsersRays,
  faSnowflake,
} from "@fortawesome/free-solid-svg-icons";
import MissionMarker from "./MissonMarker";
import { Info, Mission } from "../../interfaces/marker";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

const Map = () => {
  const [mapCenter, setMapCenter] = useState<LatLngLiteral>();
  const [missoinInfo, setMissonInfo] = useState<Info>();
  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 55.790473, lng: 13.122525 }),
    []
  );

  const options = useMemo<MapOptions>(
    () => ({
      zoom: 15,
      mapId: "a20415a885e17d09",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

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

  const circleOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    strokeColor: "#8BC34A",
    fillColor: "#8BC34A",
  };

  //mockdata
  const mission = [
    {
      id: 3,
      name: "hej",
      description: "hejdå",
      visibleToHumans: false,
      visibleToZombies: true,
      startDate: "2023-03-9",
      endDate: "2023-03-11",
      location: "nordanväg 48B, Kävlinge",
    },
    {
      id: 4,
      name: "hej",
      description: "hejdå2",
      visibleToHumans: true,
      visibleToZombies: false,
      startDate: "2023-03-9",
      endDate: "2023-03-11",
      location: "nordanväg 47B, Kävlinge",
    },
    {
      id: 5,
      name: "hej",
      description: "hejdå3",
      visibleToHumans: true,
      visibleToZombies: true,
      startDate: "2023-03-9",
      endDate: "2023-03-11",
      location: "nordanväg 48C, Kävlinge",
    },
  ];

  return (
    <div className="mapContainer">
      <div className="mapInfo">
        <h2>info</h2>
        <Places
          setMapCenter={(position: LatLngLiteral) => {
            setMapCenter(position);
            mapRef.current?.panTo(position);
          }}
        />
        <h3>{missoinInfo?.name}</h3>
        <p>{missoinInfo?.description}</p>
      </div>
      <div className="map">
        <GoogleMap
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
          id="map"
        >
          {mapCenter && (
            <>
              <Circle
                center={mapCenter}
                radius={1000}
                options={circleOptions}
              />
              {mission.map((marker) => {
                return (
                  <div key={marker.id}>
                    <MissionMarker
                      missionmarker={marker}
                      info={(info: Info) => setMissonInfo(info)}
                    />
                  </div>
                );
              })}
              <Marker
                position={mapCenter}
                icon={humanMission}
                title="misson for humnas"
              />
              <Marker
                position={{ lat: 55.79633, lng: 13.115525 }}
                icon={zombieMission}
              />
              <Marker
                position={{ lat: 55.7956, lng: 13.113658 }}
                icon={checkIn}
              />
              <Marker
                position={{ lat: 55.795763, lng: 13.115728 }}
                icon={missions}
              />
              <Marker
                position={{ lat: 55.796101, lng: 13.115021 }}
                icon={scull}
              />
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};
export default Map;
