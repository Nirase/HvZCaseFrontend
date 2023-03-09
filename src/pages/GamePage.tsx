import Container from "@mui/material/Container";
import { useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { getListOfGames, getOneGame } from "../api/apiCalls";
import BiteCode from "../components/gamePage/BiteCode";
import BiteCodeEntry from "../components/gamePage/BiteCodeEntry";
import GameRegistration from "../components/gamePage/GameRegistration";
import Info from "../components/gamePage/Info";
import Map from "../components/gamePage/Map";
import SquadList from "../components/gamePage/SquadList";
import { Game } from "../interfaces/game";

const libraries: (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[] = ["places"];

const GamePage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY as string,
    libraries: libraries,
  });

  const [game, setGame] = useState<Game>();

  useEffect(() => {
    const fetchOneGame = async () => {
      const data = await getOneGame(1);
      setGame(data);
    };

    fetchOneGame();
  }, []);

  console.log(game);
  if (game) {
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
  } else {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
};
export default GamePage;
