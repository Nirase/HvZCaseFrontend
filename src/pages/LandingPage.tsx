import { useEffect, useState } from "react";
import { getListOfGames } from "../api/apiCalls";
import Protected from "../components/landingPage/Protected";
import Public from "../components/landingPage/Public";
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
      <section className="actions">
        {!keycloak.authenticated && <Public />}
        {keycloak.authenticated && <Protected />}
      </section>
      <p>123</p>
      {games.map((game: Game) => {
        return (
          <div key={game.id}>
            <h4>{game.name}</h4>
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
