import { Circle, GoogleMap } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../../../styles/map.css";

import MissionMarker from "./MissonMarker";
import {
  IMissionInfo,
  IKill,
  IMission,
  ICheckIn,
} from "../../../interfaces/marker";
import { IGame } from "../../../interfaces/game";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import MissonInfo from "./MissonInfo";
import KillMarker from "./KillMarker";
import { Paper } from "@mui/material";
import KillInfo from "./KillInfo";
import { IPlayer } from "../../../interfaces/player";
import { ISquad } from "../../../interfaces/squad";
import CheckInInfo from "./CheckInInfo";
import { getAllMissionsInGame, getAnything } from "../../../api/apiCalls";
import CheckInMarker from "./CheckInMarker";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

type Props = {
  game: IGame;
  player: IPlayer | undefined;
  squads: Array<ISquad> | undefined;
};

const Map = ({ game, player, squads }: Props) => {
  const [mapCenter, setMapCenter] = useState<LatLngLiteral>();
  const [missions, setMissions] = useState<Array<IMission>>();
  const [missionInfo, setMissionInfo] = useState<IMissionInfo>();
  const [killInfo, setKillInfo] = useState<IKill>();
  const [checkInInfo, setCheckInInfo] = useState<ICheckIn>();
  const [squadsCheckIn, setSquadsCheckIn] = useState<Array<ICheckIn>>();

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

    if (squads) {
      let fetchedSquads: any = [];
      const playerSquad = squads.find((squad) => squad.id === player?.squadId);

      const fetchCheckIn = async (path: string) => {
        const res = await getAnything(path);
        fetchedSquads.push(res);
        setSquadsCheckIn(fetchedSquads);
      };
      playerSquad?.squadCheckIns.forEach((check: string) => {
        fetchCheckIn(check);
      });
    }

    const fetchMissions = async () => {
      const res = await getAllMissionsInGame(game.id);

      setMissions(res);
    };
    fetchMissions();
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
      <Paper className="mapInfoContainer">
        <div className="mapInfo">
          {missionInfo === undefined &&
          killInfo === undefined &&
          checkInInfo === undefined ? (
            <h3>Map info</h3>
          ) : (
            ""
          )}

          <MissonInfo
            info={missionInfo}
            clearInfo={(info: undefined) => setMissionInfo(info)}
          />
          <KillInfo
            kill={killInfo}
            players={game.players}
            clearKillInfo={(info: undefined) => setKillInfo(info)}
          />
          <CheckInInfo
            checkIn={checkInInfo}
            clearCheckInInfo={(info: undefined) => setCheckInInfo(info)}
          />
        </div>
      </Paper>

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
              {player && missions
                ? missions.map((marker: IMission) => {
                    return (
                      <div key={marker.id}>
                        <MissionMarker
                          missionmarker={marker}
                          setInfo={(info: IMissionInfo) => {
                            setMissionInfo(info);
                            setKillInfo(undefined);
                            setCheckInInfo(undefined);
                          }}
                        />
                      </div>
                    );
                  })
                : ""}
              {game.kills.map((kill: IKill) => {
                return (
                  <div key={kill.victimId}>
                    <KillMarker
                      kill={kill}
                      setKillInfo={(info: IKill) => {
                        setKillInfo(info);
                        setMissionInfo(undefined);
                        setCheckInInfo(undefined);
                      }}
                    />
                  </div>
                );
              })}
              {squadsCheckIn &&
                squadsCheckIn.map((marker: ICheckIn) => {
                  return (
                    <div key={marker.id}>
                      <CheckInMarker
                        checkIn={marker}
                        setCheckInInfo={(info: ICheckIn) => {
                          setCheckInInfo(info);
                          setMissionInfo(undefined);
                          setKillInfo(undefined);
                        }}
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
