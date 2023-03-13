import { Circle, GoogleMap, Marker } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../../styles/map.css";

import {
  faSkullCrossbones,
  faPoo,
  faBiohazard,
  faUsersRays,
  faSnowflake,
} from "@fortawesome/free-solid-svg-icons";
import MissionMarker from "./MissonMarker";
import { Info, Mission } from "../../interfaces/marker";
import { Game } from "../../interfaces/game";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import MissonInfo from "./MissonInfo";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

type Props = {
  game: Game;
};

const Map = ({ game }: Props) => {
  const [mapCenter, setMapCenter] = useState<LatLngLiteral>();
  const [missoinInfo, setMissonInfo] = useState<Info>();
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

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);
  useEffect(() => {
    const getPosition = async () => {
      const result = await getGeocode({ address: game.location });
      const { lat, lng } = await getLatLng(result[0]);
      setMapCenter({ lat, lng });
    };
    getPosition();
  }, []);

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

  return (
    <div className="mapContainer">
      <MissonInfo
        info={missoinInfo}
        clearInfo={(info: undefined) => setMissonInfo(info)}
      />

      <div className="map">
        <GoogleMap
          center={mapCenter}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
          id="map"
        >
          {mapCenter && (
            <>
              <Circle
                center={mapCenter}
                radius={game.radius}
                options={circleOptions}
              />
              {game.missions.map((marker: Mission) => {
                return (
                  <div key={marker.id}>
                    <MissionMarker
                      missionmarker={marker}
                      setInfo={(info: Info) => setMissonInfo(info)}
                    />
                  </div>
                );
              })}
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};
export default Map;
