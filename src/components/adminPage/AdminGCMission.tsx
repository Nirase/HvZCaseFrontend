import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IGame } from "../../interfaces/game";
import CreateMarkerMap from "../CreateMarkerMap";
import { useLoadScript } from "@react-google-maps/api";
import { margin } from "@mui/system";

type Props = {
  game: IGame;
};
const libraries: (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[] = ["places"];

const AdminGCMission = ({ game }: Props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY as string,
    libraries: libraries,
  });
  const [address, setAddress] = useState("");

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
        <div style={{ margin: -30 }}>
          {!isLoaded ? (
            <p>Loading map....</p>
          ) : (
            <CreateMarkerMap
              game={game}
              markerAddress={(address: string) => setAddress(address)}
              page={"Admin"}
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
