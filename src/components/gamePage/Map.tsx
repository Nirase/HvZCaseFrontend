import { GoogleMap } from "@react-google-maps/api";
import { useCallback, useMemo, useRef } from "react";
import "../../styles/map.css";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

const Map = () => {
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

  return (
    <div className="mapContainer">
      <div className="mapInfo">info</div>
      <div className="map">
        <GoogleMap
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        ></GoogleMap>
      </div>
    </div>
  );
};
export default Map;
