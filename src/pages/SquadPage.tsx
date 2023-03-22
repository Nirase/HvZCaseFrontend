import Container from "@mui/material/Container";
import { useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAnything, getOneSquadById, getUsers } from "../api/apiCalls";
import ResponseSnackBar from "../components/ResponseSnackBar";

import CheckIns from "../components/squadPage/CheckIns";
import Info from "../components/squadPage/Info";
import Members from "../components/squadPage/Members";

import { IPlayer } from "../interfaces/player";
import { ISquad } from "../interfaces/squad";
import { IUser } from "../interfaces/user";
import keycloak from "../keycloak";

const libraries: "places"[] = ["places"];

const SquadPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY as string,
    libraries: libraries,
  });
  const navigate = useNavigate();
  const { gameId, squadId }: any = useParams();
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarRes, setSnackbarRes] = useState<any>();
  const [snackbarFrom, setSnackbarFrom] = useState<string>();

  const [playerString, setPlayerString] = useState<any>();
  const [userPlayer, setUserPlayer] = useState<IPlayer>();

  const [squad, setSquad] = useState<ISquad>();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (squadId) {
      const fetchUser = async () => {
        const data = await getUsers();
        const theUser: IUser = data.find(
          (user: IUser) => user.keycloakId === keycloak.tokenParsed?.sub // change to sub value to check id insted
        );
        const player = theUser.players.find(
          (player: string) => player.split("/")[3] === gameId
        );
        setPlayerString(player);
      };
      fetchUser();

      const fetchSquad = async () => {
        const data = await getOneSquadById(+gameId, +squadId);
        setSquad(data);
      };
      fetchSquad();
    }
  }, []);

  useEffect(() => {
    if (playerString) {
      const fetchPlayer = async () => {
        const data = await getAnything(playerString);
        setUserPlayer(data);
      };

      fetchPlayer();
    }
  }, [playerString]);

  useEffect(() => {
    if (userPlayer) {
      if (squad) {
        const isMember = squad.players.find(
          (x: string) => +x.split("/")[5] === userPlayer.id
        );
        if (isMember) {
          setAllowed(true);
        } else {
          setAllowed(false);
          navigate("/game/" + gameId);
        }
      }
    }
  }, [userPlayer, squad]);

  if (isLoaded && allowed) {
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
        {squad && (
          <>
            <Info squad={squad} />
            <Members members={squad.players} />
            <CheckIns
              squad={squad}
              setSnackbarRes={(res: any) => {
                setSnackbarRes(res);
                setSnackbar(true);
              }}
              setSnackbarFrom={(from: string) => setSnackbarFrom(from)}
            />
          </>
        )}
        <ResponseSnackBar
          open={snackbar}
          res={snackbarRes}
          from={snackbarFrom}
          setClose={(show: boolean) => setSnackbar(show)}
        />
      </Container>
    );
  } else {
    return null;
  }
};
export default SquadPage;
