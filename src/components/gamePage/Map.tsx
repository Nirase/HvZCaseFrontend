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

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

const Map = () => {
  let bounds: google.maps.LatLngBounds;
  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 55.790473, lng: 13.122525 }),
    []
  );
  const [mapCenter, setMapCenter] = useState<LatLngLiteral>(center);

  //restriction
  const cirkel = new google.maps.Circle({
    center: mapCenter,
    radius: 1000,
  });
  const newBounds = cirkel.getBounds();
  bounds = newBounds as google.maps.LatLngBounds;
  console.log("bounds", newBounds);

  const options = useMemo<MapOptions>(
    () => ({
      zoom: 15,
      mapId: "a20415a885e17d09",
      disableDefaultUI: true,
      clickableIcons: false,
      restriction: {
        latLngBounds: bounds,
        strictBounds: false,
      },
    }),
    [bounds]
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

  const missons = {
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

  const humanMisson = {
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

  const zombieMisson = {
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
            <Circle
              center={mapCenter}
              radius={1000}
              options={{ fillColor: "" }}
            />
          )}

          <Marker
            position={{ lat: 55.795811, lng: 13.116458 }}
            icon={humanMisson}
          />
          <Marker
            position={{ lat: 55.79633, lng: 13.115525 }}
            icon={zombieMisson}
          />
          <Marker position={{ lat: 55.7956, lng: 13.113658 }} icon={checkIn} />
          <Marker
            position={{ lat: 55.795763, lng: 13.115728 }}
            icon={missons}
          />
          <Marker position={{ lat: 55.796101, lng: 13.115021 }} icon={scull} />
        </GoogleMap>
      </div>
    </div>
  );
};
export default Map;
