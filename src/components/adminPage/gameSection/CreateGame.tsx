import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { createAGame } from "../../../api/apiCalls";
import { createGame } from "../../../interfaces/game";
import Places from "../../gamePage/Places";

type Props = {
  refreshList: Function;
};

const CreateGame = ({ refreshList }: Props) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [address, setAddress] = useState("");
  const [mapRadius, setRadius] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const newGame: createGame = {
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    radius: 0,
  };
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
      await createAGame(newGame);
      await refreshList();
    } else {
      setWarningText("- Enter all fields");
    }
  };
  return (
    <div>
      <b>Create game {warningText}</b>
      <br></br>
      <TextField
        id="create-name-input"
        label="Name"
        variant="standard"
        required={true}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="create-desc-input"
        label="Description"
        variant="standard"
        style={{ marginLeft: "20px" }}
        required={true}
        onChange={(e) => setDesc(e.target.value)}
      />
      <br></br>
      <div style={{ maxWidth: 400, marginTop: 20 }}>
        <Places setPosition={(position: string) => setAddress(position)} />
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
      <label>Start Date</label>
      <TextField
        type="date"
        id="create-start-date-input"
        label=" "
        variant="standard"
        style={{ marginLeft: "-70px" }}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <label style={{ marginLeft: "20px" }}>End Date</label>
      <TextField
        type="date"
        id="create-end-date-input"
        label=" "
        variant="standard"
        style={{ marginLeft: "-65px" }}
        onChange={(e) => setEndDate(e.target.value)}
      />
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
