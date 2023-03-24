import { InfoWindow } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";

type LatLngLiteral = google.maps.LatLngLiteral;

type Props = {
  position: LatLngLiteral;
  markerInfo: any;
  onClose: (close: undefined) => void;
};

const InfoWindowMap = ({ position, markerInfo, onClose }: Props) => {
  const handelClose = () => {
    onClose(undefined);
  };

  return (
    <InfoWindow
      position={position}
      onCloseClick={handelClose}
      options={{ pixelOffset: new google.maps.Size(0, -20) }}
    >
      <div>
        {markerInfo.name && <h3>{markerInfo.name}</h3>}
        <p>Start date: {markerInfo.startDate}</p>
        <p>End date: {markerInfo.endDate}</p>
      </div>
    </InfoWindow>
  );
};
export default InfoWindowMap;