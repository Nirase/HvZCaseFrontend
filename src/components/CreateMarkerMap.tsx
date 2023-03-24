import { Circle, GoogleMap, Marker } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../styles/map.css";

import MissionMarke from "./gamePage/map/MissonMarker";
import { ICheckIn, IMission, IMissionInfo } from "../interfaces/marker";
import { IGame } from "../interfaces/game";
import { getGeocode, getLatLng, LatLng } from "use-places-autocomplete";
import MissonInfo from "./gamePage/map/MissonInfo";
import { Button, Paper } from "@mui/material";
import { getAllMissionsInGame } from "../api/apiCalls";
import MissionMarker from "./gamePage/map/MissonMarker";

import CheckInMarker from "./gamePage/map/CheckInMarker";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
type gLatLng = google.maps.LatLng;

type Props = {
  game: IGame;
  checkInMarkers?: Array<ICheckIn>;
  missionMarkers?: Array<IMission>;
  markerAddress: (address: string) => void;
  missionInfo?: (selectedMission: IMissionInfo) => void;
  missionId?: (selectedMissionId: number) => void;
  page: string;
};

const CreateMarkerMap = ({
  game,
  markerAddress,
  checkInMarkers,
  missionMarkers,
  missionInfo,
  missionId,
  page,
}: Props) => {
  const [mapCenter, setMapCenter] = useState<LatLngLiteral>();
  const [missions, setMissions] = useState<Array<IMission>>();
  const [marker, setMarker] = useState<gLatLng>();

  const mapRef = useRef<GoogleMap>();
  const options = useMemo<MapOptions>(
    () => ({
      zoom: 15,
      mapId: "a20415a885e17d09",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  useEffect(() => {
    setMissions(missionMarkers);
  }, [missionMarkers]);

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  useEffect(() => {
    const getPosition = async () => {
      const result = await getGeocode({ address: game.location });
      const { lat, lng } = await getLatLng(result[0]);
      setMapCenter({ lat, lng });
    };
    getPosition();
  }, [game.location]);

  const circleOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    strokeColor: "#8BC34A",
    fillColor: "#8BC34A",
    center: mapCenter,
    radius: game.radius,
  };

  const createMarker = async (latLng: google.maps.LatLng | null) => {
    if (latLng) {
      const res = await getGeocode({ location: latLng });
      setMarker(latLng);
      markerAddress(res[0].formatted_address);
    }
  };

  const draggedMarker = async (latLng: google.maps.LatLng | null) => {
    if (latLng) {
      const res = await getGeocode({ location: latLng });
      setMarker(latLng);
      markerAddress(res[0].formatted_address);
    }
  };

  return (
    <div className="mapContainer" style={{ width: "80%" }}>
      <div className="map" style={{ width: "100%", height: "100%" }}>
        <GoogleMap
          center={mapCenter}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
          id="map"
          onClick={(e) => {
            createMarker(e.latLng);
          }}
        >
          {mapCenter && <Circle options={circleOptions} />}
          {marker && (
            <Marker
              position={marker}
              draggable={true}
              onDragEnd={(e) => draggedMarker(e.latLng)}
            />
          )}
          {checkInMarkers &&
            checkInMarkers.map((check: ICheckIn) => {
              return (
                <div key={check.id}>
                  <CheckInMarker
                    checkIn={check}
                    setCheckInInfo={(info: ICheckIn) => ""}
                  />
                </div>
              );
            })}
          {missions && missionInfo && missionId
            ? missions.map((marker: IMission) => {
                return (
                  <div key={marker.id}>
                    <MissionMarker
                      missionmarker={marker}
                      setInfo={(info: IMissionInfo) => {
                        missionInfo(info);
                      }}
                      setId={(id: number) => {
                        missionId(id);
                      }}
                    />
                  </div>
                );
              })
            : ""}
        </GoogleMap>
      </div>
    </div>
  );
};
//skapas två circles
export default CreateMarkerMap;
