import { Button, TextField } from "@mui/material";
import { maxWidth } from "@mui/system";
import { useLoadScript } from "@react-google-maps/api";
import React, { useState } from "react";
import { createAGame } from "../../../api/apiCalls";
import { ICreateGame, IGame } from "../../../interfaces/game";
import DatePickerComponent from "../../DatePicker";
import Places from "../../Places";

type Props = {
  allGames: Array<IGame> | undefined;
  setAddGames: (games: Array<IGame>) => void;
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

const CreateGame = ({
  allGames,
  setAddGames,
  setSnackbarRes,
  setSnackbarFrom,
}: Props) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [address, setAddress] = useState("");
  const [mapRadius, setRadius] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const newGame: ICreateGame = {
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    radius: 0,
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY as string,
    libraries: libraries,
  });
  const [warningText, setWarningText] = useState("");

  const handleCreate = async () => {
    setWarningText("");
    newGame.name = name;
    newGame.description = desc;
    newGame.startDate = startDate;
    newGame.endDate = endDate;
    newGame.location = address;
    newGame.radius = mapRadius;
    if (name && desc && startDate && endDate && address && mapRadius) {
      const createdGame = await createAGame(newGame);
      setSnackbarFrom("created a game");
      setSnackbarRes(createdGame);
      if (allGames) {
        const newAllGames = [...allGames, createdGame];
        setAddGames(newAllGames);
      }
    } else {
      setSnackbarRes("enter all fields");
    }
  };
  return (
    <div>
      <h3>
        Create game <b style={{ color: "red" }}>{warningText}</b>
      </h3>
      <TextField
        id="create-name-input"
        label="Name"
        variant="standard"
        required={true}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: 20 }}
      />
      <TextField
        id="create-desc-input"
        label="Description"
        variant="standard"
        style={{ marginRight: 20 }}
        required={true}
        onChange={(e) => setDesc(e.target.value)}
      />
      <br></br>
      <div
        style={{
          maxWidth: 400,
          marginTop: 20,
          marginBottom: 10,
          marginRight: 20,
        }}
      >
        {!isLoaded ? (
          <p></p>
        ) : (
          <Places setPosition={(position: string) => setAddress(position)} />
        )}
      </div>
      <TextField
        type={"number"}
        id="create-radius-input"
        label="Map radius (m)"
        variant="standard"
        style={{ marginLeft: 0 }}
        required={true}
        onChange={(e) => setRadius(+e.target.value)}
      />
      <br></br>
      <div className="datePicker">
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
      <br></br>
      <Button
        id="create-game-button"
        variant="contained"
        style={{ marginTop: 10, backgroundColor: "#360568" }}
        onClick={handleCreate}
      >
        Create Game
      </Button>
    </div>
  );
};

export default CreateGame;
