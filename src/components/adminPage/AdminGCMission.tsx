import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IGame } from "../../interfaces/game";
import CreateMarkerMap from "../CreateMarkerMap";
import { useLoadScript } from "@react-google-maps/api";
import { margin } from "@mui/system";
import MissonInfo from "../gamePage/map/MissonInfo";
import {
  ICreateMission,
  IMission,
  IMissionInfo,
} from "../../interfaces/marker";
import {
  createMission,
  deleteMission,
  getAllMissionsInGame,
} from "../../api/apiCalls";
import DatePickerComponent from "../DatePicker";

type Props = {
  game: IGame;
  refreshList: Function;
  setSnackbarRes: (res: any) => void;
  setSnackbarFrom: (from: string) => void;
};
const libraries: (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[] = ["places"];

const AdminGCMission = ({ game, setSnackbarRes, setSnackbarFrom }: Props) => {
  const newMission: ICreateMission = {
    gameId: game.id,
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    visibleToHumans: false,
    visibleToZombies: false,
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY as string,
    libraries: libraries,
  });

  const [missions, setMissions] = useState<Array<IMission>>([]);
  const [missionInfo, setMissionInfo] = useState<IMissionInfo>();

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [address, setAddress] = useState("");

  const [humanChecked, setHumanChecked] = useState(false);
  const [zombieChecked, setZombieChecked] = useState(false);

  useEffect(() => {
    const fetchMissions = async () => {
      const res = await getAllMissionsInGame(game.id);
      setMissions(res);
    };
    fetchMissions();
  }, []);

  const handleCreate = async () => {
    newMission.name = name;
    newMission.description = desc;
    newMission.startDate = startDate;
    newMission.endDate = endDate;
    newMission.location = address;
    newMission.visibleToHumans = humanChecked;
    newMission.visibleToZombies = zombieChecked;

    if (name && desc && startDate && endDate && address) {
      const createdMission = await createMission(game.id, newMission);
      setSnackbarFrom("created a mission");
      setSnackbarRes(createdMission);
      setMissions([...missions, createdMission]);
    } else {
      setSnackbarRes("enter all fields");
    }
  };

  const handleDelete = async () => {
    const deleteMissionRes = await deleteMission(game.id, id);
    setSnackbarFrom(" mission: " + id);
    setSnackbarRes(deleteMissionRes);
    handleRemoveMission();
  };

  const handleRemoveMission = () => {
    setMissions((current) => current?.filter((m) => m.id !== id));
  };

  return (
    <AccordionDetails>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h3>Mission</h3>
        </AccordionSummary>
        <div className="createMissionContainer">
          <section style={{ margin: 20 }}>
            <p>
              Choose a location by clicking on the map, you can move the red
              marker by dragging it if you want another location
            </p>
            <TextField
              id="create-mission-name-input"
              label="Name"
              variant="standard"
              required={true}
              onChange={(e) => setName(e.target.value)}
              style={{ marginRight: 20 }}
            />
            <TextField
              id="create-mission-desc-input"
              label="Description"
              variant="standard"
              required={true}
              onChange={(e) => setDesc(e.target.value)}
              style={{ marginRight: 20 }}
            />
            <br></br>
            <TextField
              id="create-mission-address-input"
              label="Address"
              variant="standard"
              required={true}
              value={address}
              style={{ marginRight: 20 }}
              inputProps={{ readOnly: true }}
            />
            <br></br>
            <div className="datePickerMission">
              <label style={{ fontWeight: "bold", marginTop: "8px" }}>
                Start Date*
              </label>

              <DatePickerComponent
                sendSelectedDate={(Date: string) => setStartDate(Date)}
              />
              <label style={{ fontWeight: "bold", marginTop: "8px" }}>
                End Date*
              </label>

              <DatePickerComponent
                sendSelectedDate={(Date: string) => setEndDate(Date)}
              />
            </div>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={humanChecked}
                    onClick={() => setHumanChecked(!humanChecked)}
                  />
                }
                label="Visable to humans"
                style={{ maxWidth: 200 }}
              />
              <FormControlLabel
                id="zomb-check"
                control={
                  <Checkbox
                    checked={zombieChecked}
                    onClick={() => setZombieChecked(!zombieChecked)}
                  />
                }
                label="Visable to zombies"
                style={{ maxWidth: 200 }}
              />
            </FormGroup>
            <br></br>
            <Button
              id="create-game-button"
              variant="contained"
              style={{
                marginTop: 10,
                marginRight: 20,
                backgroundColor: "#360568",
              }}
              onClick={handleCreate}
            >
              Create marker
            </Button>
            <Button
              id="create-game-button"
              variant="contained"
              style={{ marginTop: 10, backgroundColor: "#360568" }}
              onClick={handleDelete}
            >
              Delete marker
            </Button>
          </section>
          {!isLoaded ? (
            <p>Loading map....</p>
          ) : (
            <CreateMarkerMap
              key={game.id}
              game={game}
              missionMarkers={missions}
              markerAddress={(address: string) => setAddress(address)}
              missionInfo={(selectedmission: IMissionInfo) =>
                setMissionInfo(selectedmission)
              }
              missionId={(selectedMissionId: number) =>
                setId(selectedMissionId)
              }
              page={"admin"}
            />
          )}
        </div>
      </Accordion>
    </AccordionDetails>
  );
};
//<AdminMap game={game} />;
//{!isLoaded ? <p>Loading map....</p> : <AdminMap game={game} />}
export default AdminGCMission;
