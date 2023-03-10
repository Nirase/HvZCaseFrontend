import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getListOfGames } from "../api/apiCalls";
import GameCard from "../components/landingPage/GameCard";
import { Game } from "../interfaces/game";
import keycloak from "../keycloak";

const Home = () => {
  const [games, setGames] = useState([]);
  //implement this in navbar
  useEffect(() => {
    const fetchGames = async () => {
      const data = await getListOfGames();
      console.log(data);
      setGames(data);
    };
    fetchGames();
  }, []);

  return (
    <>
      <h1>Landing Page</h1>
      {games.map((game: Game) => {
        return (
          <div key={game.id}>
            <GameCard game={game} />
          </div>
        );
      })}
      {keycloak.token && (
        <div>
          <h4>Token</h4>
          <pre>{keycloak.token}</pre>
        </div>
      )}
    </>
  );
};

export default Home;
