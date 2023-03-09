import { GoogleMap, Marker } from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState } from "react";
import "../../styles/map.css";
import Places from "./Places";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

const Map = () => {
  const [office, setOffice] = useState<LatLngLiteral>();
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

  const gravestone =
    "M64,12a37.89,37.89,0,0,0-25.3,9.65L39,22l4,12L26,59.5V99h76V50A38,38,0,0,0,64,12ZM50,49H60V39h8V49H78v8H68V76H60V57H50Z";

  const missons =
    "M22.507,37.18c-1.821,0-3.207,0.455-4.159,1.365c-0.953,0.91-1.431,2.255-1.431,4.031    c0,1.716,0.488,3.046,1.462,3.986c0.974,0.943,2.349,1.414,4.128,1.414c1.736,0,3.091-0.482,4.065-1.444    c0.974-0.964,1.46-2.282,1.46-3.956c0-1.733-0.482-3.067-1.443-4C25.624,37.646,24.264,37.18,22.507,37.18z";

  const humanMisson = "";

  const zombieMisson = "";

  const checkIn = "";

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  return (
    <div className="mapContainer">
      <div className="mapInfo">
        <h2>info</h2>
        <Places
          setOffice={(position: LatLngLiteral) => {
            setOffice(position);
            mapRef.current?.panTo(position);
          }}
        />
      </div>
      <div className="map">
        <GoogleMap
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          {office && (
            <Marker
              position={office}
              icon={{
                path: gravestone,
                fillColor: "grey",
                fillOpacity: 0.9,
                scale: 0.3,
                strokeColor: "black",
                strokeWeight: 2,
              }}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  );
};
export default Map;
