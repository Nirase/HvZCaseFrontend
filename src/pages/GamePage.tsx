import Container from "@mui/material/Container";
import { useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAnything,
  getOneGameWithDetails,
  getSquads,
  getUserByKeyCloakId,
} from "../api/apiCalls";
import BiteCode from "../components/gamePage/BiteCode";
import BiteCodeEntry from "../components/gamePage/BiteCodeEntry";
import GameRegistration from "../components/gamePage/GameRegistration";
import Info from "../components/gamePage/Info";
import Map from "../components/gamePage/map/Map";
import PlayerList from "../components/gamePage/PlayerList";
import SquadList from "../components/gamePage/SquadList";
import { IGame } from "../interfaces/game";
import "../styles/gamepage.css";
import keycloak from "../keycloak";
import { ROLES } from "../roles/roles";
import { IUser } from "../interfaces/user";
import { IPlayer } from "../interfaces/player";
import SquadRegistration from "../components/gamePage/SquadRegistration";
import { ISquad } from "../interfaces/squad";
import ResponseSnackBar from "../components/ResponseSnackBar";
import Messenger from "../components/gamePage/chat/Messenger";
import { Grid } from "@mui/material";

const libraries: "places"[] = ["places"];

const GamePage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY as string,
    libraries: libraries,
  });
  const { gameId } = useParams();

  const [game, setGame] = useState<IGame>();
  const [allPlayers, setAllPlayers] = useState<Array<IPlayer>>();
  const [playerString, setPlayerString] = useState<any>();
  const [player, setPlayer] = useState<IPlayer>();
  const [user, setUser] = useState<IUser>();
  const [squads, setSquads] = useState<Array<ISquad>>();

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarRes, setSnackbarRes] = useState<any>();
  const [snackbarFrom, setSnackbarFrom] = useState<string>();

  const admin = keycloak.hasRealmRole(ROLES.Admin);

  useEffect(() => {
    if (gameId) {
      const fetchOneGame = async () => {
        const theGame = await getOneGameWithDetails(+gameId);
        setGame(theGame);
        setAllPlayers(theGame.players);
      };
      fetchOneGame();
      const id: string | undefined = keycloak.tokenParsed?.sub;
      if (id) {
        const fetchUser = async () => {
          const data = await getUserByKeyCloakId(id);

          setUser(data);
          const player = data.players.find(
            (player: string) => player.split("/")[3] === gameId
          );
          setPlayerString(player);
        };
        fetchUser();
      }

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

  if (game && user) {
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
                  <GameRegistration
                    gameName={game.name}
                    user={user}
                    players={allPlayers}
                    setPlayer={(newPlayer: IPlayer) => setPlayer(newPlayer)}
                    addToAllPlayers={(allPlayers: IPlayer[]) =>
                      setAllPlayers(allPlayers)
                    }
                    setSnackbarRes={(res: any) => {
                      setSnackbarRes(res);
                      setSnackbar(true);
                    }}
                    setSnackbarFrom={(from: string) => setSnackbarFrom(from)}
                  />
                )}
              </>
            ) : (
              <Grid
                container
                spacing={2}
                justifyContent="space-around"
                alignItems="center"
              >
                <Grid item xs={12} md={6} minWidth="250px">
                  <Messenger game={game} player={player}></Messenger>
                </Grid>
                <Grid item xs={12} md={6}>
                  {player.isHuman && <BiteCode player={player} />}
                  {!player.isHuman && isLoaded ? (
                    <BiteCodeEntry
                      player={player}
                      setSnackbarRes={(res: any) => {
                        setSnackbarRes(res);
                        setSnackbar(true);
                      }}
                      setSnackbarFrom={(from: string) => setSnackbarFrom(from)}
                    />
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
            )}
          </>
        )}
        {!isLoaded ? (
          <p>Loading map....</p>
        ) : (
          <Map game={game} player={player} squads={squads} />
        )}
        <div className="lists">
          <div className="squadList">
            {squads && (
              <SquadList
                players={game.players}
                squads={squads}
                player={player}
                updatePlayer={(player: IPlayer) => setPlayer(player)}
                setSnackbarRes={(res: any) => {
                  setSnackbarRes(res);
                  setSnackbar(true);
                }}
                setSnackbarFrom={(from: string) => setSnackbarFrom(from)}
              />
            )}
            {player && !player.squadId ? (
              <SquadRegistration
                player={player}
                squads={squads}
                setSquad={(squad: Array<ISquad>) => {
                  setSquads(squad);
                }}
                setSnackbarRes={(res: any) => {
                  setSnackbarRes(res);
                  setSnackbar(true);
                }}
                setSnackbarFrom={(from: string) => setSnackbarFrom(from)}
              />
            ) : (
              ""
            )}
          </div>

          {allPlayers && <PlayerList players={allPlayers} />}
        </div>
        <ResponseSnackBar
          open={snackbar}
          res={snackbarRes}
          from={snackbarFrom}
          setClose={(show: boolean) => setSnackbar(show)}
        />
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
