import { useEffect, useState } from "react";
import { getListOfGames } from "../api/apiCalls";
import GameCard from "../components/landingPage/GameCard";
import { IGame } from "../interfaces/game";
import keycloak from "../keycloak";

const Home = () => {
  const [games, setGames] = useState<Array<IGame>>();
  //fetches all games
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
        {!keycloak.authenticated && (
          <h4 style={{ marginLeft: 20 }}>
            Log in to get more info about the games
          </h4>
        )}
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
    return <h3>Loading games...</h3>;
  }
};

export default Home;
