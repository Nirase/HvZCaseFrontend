import Container from "@mui/material/Container";
import { useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneGameWithDetails } from "../api/apiCalls";
import BiteCode from "../components/gamePage/BiteCode";
import BiteCodeEntry from "../components/gamePage/BiteCodeEntry";
import GameRegistration from "../components/gamePage/GameRegistration";
import Info from "../components/gamePage/Info";
import Map from "../components/gamePage/Map";
import PlayerList from "../components/gamePage/PlayerList";
import SquadList from "../components/gamePage/SquadList";
import { Game } from "../interfaces/game";
import "../styles/gamepage.css";

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
  const { gameId } = useParams();

  const [game, setGame] = useState<Game>();

  useEffect(() => {
    if (gameId) {
      const fetchOneGame = async () => {
        const data = await getOneGameWithDetails(+gameId);
        setGame(data);
      };

      fetchOneGame();
    }
  }, []);

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
        {!isLoaded ? <p>Loading map....</p> : <Map game={game} />}
        <div className="lists">
          <SquadList />
          <PlayerList players={game.players} />
        </div>
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
