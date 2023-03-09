import Container from "@mui/material/Container";
import { useLoadScript } from "@react-google-maps/api";
import BiteCode from "../components/gamePage/BiteCode";
import BiteCodeEntry from "../components/gamePage/BiteCodeEntry";
import GameRegistration from "../components/gamePage/GameRegistration";
import Info from "../components/gamePage/Info";
import Map from "../components/gamePage/Map";
import SquadList from "../components/gamePage/SquadList";
import { Game } from "../interfaces/game";

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

const GamePage = ({ game }: Props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY as string,
    libraries: libraries,
  });

  return (
    <Container
      maxWidth="lg"
      sx={{
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "#B96AC9",
        borderRadius: "10px",
      }}
    >
      <Info game={game} />
      <GameRegistration game={game} />
      <div>
        <BiteCode />
        <BiteCodeEntry />
      </div>
      <div>
        <SquadList />
      </div>
      {!isLoaded ? <p>Loading map....</p> : <Map />}
    </Container>
  );
};
export default GamePage;
