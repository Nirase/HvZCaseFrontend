import { Game } from "../../interfaces/game";

type Props = {
  game: Game;
};

const Info = ({ game }: Props) => {
  return (
    <>
      <h1>{game.name}</h1>
      <p>{game.description}</p>
      <p>Total players in game: {game.players.length}</p>
      <p>Number of kills: {game.kills.length}</p>
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
      </ul>
    </>
  );
};
export default Info;
