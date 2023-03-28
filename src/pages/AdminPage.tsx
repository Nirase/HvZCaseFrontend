import { useEffect, useState } from "react";
import { getListOfGames } from "../api/apiCalls";
import AdminGameCard from "../components/adminPage/AdminGameCard";
import CreateGame from "../components/adminPage/gameSection/CreateGame";
import ResponseSnackBar from "../components/ResponseSnackBar";
import { IGame } from "../interfaces/game";

const AdminPage = () => {
  const [game, setGame] = useState<IGame>();
  const [games, setGames] = useState<Array<IGame>>([]);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarRes, setSnackbarRes] = useState<any>();
  const [snackbarFrom, setSnackbarFrom] = useState<string>();

  useEffect(() => {
    const fetchGames = async () => {
      const data = await getListOfGames();
      setGames(data);
    };
    fetchGames();
  }, []);

  const handleDeleteGame = (gameID: number) => {
    setGames((current) => current.filter((tempGame) => tempGame.id !== gameID));
  };
  const handleUpdateGame = (uGame: IGame) => {
    setGame(undefined);
    setGame(uGame);
  };

  useEffect(() => {
    const newGameList = [...games];
    for (let i = 0; i < games.length; i++) {
      if (games[i].id === game?.id) {
        newGameList[i] = game;
      }
    }
    setGames(newGameList);
  }, [game]);

  if (games) {
    return (
      <div>
        <div style={{ marginLeft: 20 }}>
          <h1>Admin Page </h1>
          <CreateGame
            allGames={games}
            setAddGames={(games: Array<IGame>) => {
              setGames(games);
            }}
            setSnackbarRes={(res: any) => {
              setSnackbarRes(res);
              setSnackbar(true);
            }}
            setSnackbarFrom={(from: string) => setSnackbarFrom(from)}
          />
        </div>
        <div style={{ marginLeft: 10 }}>
          <h2 style={{ marginLeft: 10 }}>Games</h2>
          {games.map((game: IGame) => {
            return (
              <div key={game.id} style={{ margin: 10 }}>
                <AdminGameCard
                  game={game}
                  updateGames={handleUpdateGame}
                  handleDeleteGame={handleDeleteGame}
                  setSnackbarRes={(res: any) => {
                    setSnackbarRes(res);
                    setSnackbar(true);
                  }}
                  setSnackbarFrom={(from: string) => setSnackbarFrom(from)}
                />
              </div>
            );
          })}
        </div>
        <ResponseSnackBar
          open={snackbar}
          res={snackbarRes}
          from={snackbarFrom}
          setClose={(show: boolean) => setSnackbar(show)}
        />
      </div>
    );
  } else {
    return (
      <div style={{ marginLeft: 20 }}>
        <h1>Admin Page </h1>
        <CreateGame
          allGames={games}
          setAddGames={(games: Array<IGame>) => {
            setGames(games);
          }}
          setSnackbarRes={(res: any) => {
            setSnackbarRes(res);
            setSnackbar(true);
          }}
          setSnackbarFrom={(from: string) => setSnackbarFrom(from)}
        />
        <h3>Loading games...</h3>
        <ResponseSnackBar
          open={snackbar}
          res={snackbarRes}
          from={snackbarFrom}
          setClose={(show: boolean) => setSnackbar(show)}
        />
      </div>
    );
  }
};

export default AdminPage;
