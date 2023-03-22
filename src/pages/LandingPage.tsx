import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getListOfGames } from "../api/apiCalls";
import GameCard from "../components/landingPage/GameCard";
import { IGame } from "../interfaces/game";

const Home = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    const fetchGames = async () => {
      const data = await getListOfGames();
      setGames(data);
    };
    fetchGames();
  }, []);
  if (games) {
    return (
      <>
        <h1 style={{ marginLeft: 20 }}>Landing Page</h1>
        {games.map((game: IGame) => {
          return (
            <div key={game.id}>
              <GameCard game={game} />
            </div>
          );
        })}
      </>
    );
  } else {
    <h3>Loading games...</h3>;
  }
};

export default Home;
