import Container from "@mui/material/Container";
import { useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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

  const location = useLocation();
  const [pathName, setPathName] = useState("");
  useEffect(() => {
    if (location) {
      let tmp = location.pathname.slice(
        location.pathname.lastIndexOf("/") + 1,
        location.pathname.length
      );
      setPathName(tmp);
    }
  }, [location]);

  const [game, setGame] = useState<Game>();

  useEffect(() => {
    const fetchOneGame = async () => {
      const data = await getOneGameWithDetails(parseInt(pathName));
      setGame(data);
    };

    fetchOneGame();
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
        {!isLoaded ? <p>Loading map....</p> : <Map />}
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
