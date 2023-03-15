import { useEffect, useState } from "react";
import { getListOfGames } from "../api/apiCalls";
import AdminGameCard from "../components/adminPage/AdminGameCard";
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

  return (
    <div>
      <h4>Admin Page </h4>
      {games.map((game: Game) => {
        return (
          <div key={game.id}>
            <AdminGameCard game={game} />
          </div>
        );
      })}
    </div>
  );
};

export default AdminPage;
