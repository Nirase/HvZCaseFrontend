import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Game } from "../../interfaces/game";
import AdminMap from "./AdminMap";
import { useLoadScript } from "@react-google-maps/api";
import { margin } from "@mui/system";

type Props = {
  game: Game;
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
          {!isLoaded ? <p>Loading map....</p> : <AdminMap game={game} />}
        </div>
      </Accordion>
    </AccordionDetails>
  );
};
//<AdminMap game={game} />;
//{!isLoaded ? <p>Loading map....</p> : <AdminMap game={game} />}
export default AdminGCMission;
