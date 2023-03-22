import { useEffect, useState } from "react";
import { getListOfGames } from "../api/apiCalls";
import AdminGameCard from "../components/adminPage/AdminGameCard";
import CreateGame from "../components/adminPage/gameSection/CreateGame";
import ResponseSnackBar from "../components/ResponseSnackBar";
import { IGame } from "../interfaces/game";

const AdminPage = () => {
  const [games, setGames] = useState([]);
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

  const refreshGameList = async () => {
    const fetchGames = async () => {
      const data = await getListOfGames();
      setGames(data);
    };
    fetchGames();
  };
  if (games) {
    return (
      <div>
        <div style={{ marginLeft: 20 }}>
          <h1>Admin Page </h1>
          <CreateGame
            refreshList={refreshGameList}
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
                  refreshList={refreshGameList}
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
          refreshList={refreshGameList}
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
