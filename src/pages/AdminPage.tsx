import { useEffect, useState } from "react";
import { getListOfGames } from "../api/apiCalls";
import AdminGameCard from "../components/adminPage/AdminGameCard";
import CreateGame from "../components/adminPage/gameSection/CreateGame";
import { Game } from "../interfaces/game";

const AdminPage = () => {
  const [games, setGames] = useState([]);
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
          <CreateGame refreshList={refreshGameList} />
        </div>
        <div style={{ marginLeft: 10 }}>
          {games.map((game: Game) => {
            return (
              <div key={game.id} style={{ margin: 10 }}>
                <AdminGameCard game={game} refreshList={refreshGameList} />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ marginLeft: 20 }}>
        <h1>Admin Page </h1>
        <CreateGame refreshList={refreshGameList} />
        <h3>Loading games...</h3>
      </div>
    );
  }
};

export default AdminPage;
