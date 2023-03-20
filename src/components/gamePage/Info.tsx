import { Game } from "../../interfaces/game";
import "../../styles/gamepage.css";

type Props = {
  game: Game;
};

const Info = ({ game }: Props) => {
  return (
    <div className="infoContainer">
      <div>
        <h1>{game.name}</h1>
        <p>{game.description}</p>
        <p>Total players in game: {game.players.length}</p>
        <p>Number of Zombies: {game.kills.length + 1}</p>
        <p>
          Start date for the game:
          <span style={{ fontWeight: "bold" }}> {game.startDate}</span>
        </p>
        <p>
          the end date for the game:
          <span style={{ fontWeight: "bold" }}> {game.endDate}</span>
        </p>
        <p>
          GameStatus:
          <span style={{ fontWeight: "bold" }}> {game.gameState}</span>
        </p>
      </div>
      <div className="rules">
        <h3>Rules</h3>
        <ul>
          <li>
            Once tagged, a human becomes a zombie for the remainder of the game
          </li>
          <li>
            Human players are able to defend themselves against the zombie horde
            using Nerf weapons and clean, rolled-up socks which may be thrown to
            <span style={{ fontWeight: "bold" }}> stun</span> an unsuspecting
            zombie.
          </li>
          <li>
            When tagged, human players are required to provide a unique, secret
            bite code to the zombie. The bite codes should be randomly generated
            and appropriate for manual text entry
          </li>
          <li>
            Zombies that collect the bite code of a human must log their kill in
            the system to turn the human player into a zombie. Optionally the
            killer may specify location and a text description of their kill to
            create a gravestone marker on the map.
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Info;
