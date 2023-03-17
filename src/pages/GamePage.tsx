import Container from "@mui/material/Container";
import { useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAnything,
  getOneGameWithDetails,
  getSquads,
  getUsers,
} from "../api/apiCalls";
import BiteCode from "../components/gamePage/BiteCode";
import BiteCodeEntry from "../components/gamePage/BiteCodeEntry";
import GameRegistration from "../components/gamePage/GameRegistration";
import Info from "../components/gamePage/Info";
import Map from "../components/gamePage/map/Map";
import PlayerList from "../components/gamePage/PlayerList";
import SquadList from "../components/gamePage/SquadList";
import { Game } from "../interfaces/game";
import "../styles/gamepage.css";
import keycloak from "../keycloak";
import { ROLES } from "../roles/roles";
import { User } from "../interfaces/user";
import { Player } from "../interfaces/player";
import SquadRegistration from "../components/gamePage/SquadRegistration";
import { Squad } from "../interfaces/squad";

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
  const [playerString, setPlayerString] = useState<any>();
  const [player, setPlayer] = useState<Player>();
  const [squads, setSquads] = useState<Array<Squad>>();

  const admin = keycloak.hasRealmRole(ROLES.Admin);

  useEffect(() => {
    if (gameId) {
      const fetchOneGame = async () => {
        const data = await getOneGameWithDetails(+gameId);
        setGame(data);
      };
      fetchOneGame();
      const fetchUser = async () => {
        const data = await getUsers();
        const theUser: User = data.find(
          (user: User) =>
            user.firstName === keycloak.tokenParsed?.name.split(" ")[0] // change to sub value to check id insted
        );

        const player = theUser.players.find(
          (player: string) => player.split("/")[3] === gameId
        );
        setPlayerString(player);
      };
      fetchUser();

      const fetchSquads = async () => {
        const data = await getSquads(+gameId);
        setSquads(data);
      };
      fetchSquads();
    }
  }, []);

  useEffect(() => {
    if (playerString) {
      const fetchPlayer = async () => {
        const data = await getAnything(playerString);
        setPlayer(data);
      };

      fetchPlayer();
    }
  }, [playerString]);

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
        {!admin && (
          <>
            {!player ? (
              <>
                {game.gameState === "Registration" && (
                  <GameRegistration game={game} />
                )}
              </>
            ) : (
              <>
                <div className="biteCode">
                  {player.isHuman && <BiteCode player={player} />}
                  {!player.isHuman && <BiteCodeEntry player={player} />}
                </div>
              </>
            )}
          </>
        )}
        {!isLoaded ? (
          <p>Loading map....</p>
        ) : (
          <Map game={game} player={player} squads={squads} />
        )}

        <div className="lists">
          <div style={{ width: "30%" }}>
            {squads && <SquadList players={game.players} squads={squads} />}
            {player && (
              <SquadRegistration
                player={player}
                squads={squads}
                setSquad={(squad: Array<Squad>) => {
                  setSquads(squad);
                }}
              />
            )}
          </div>

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
