const Info = (Game: any) => {
  return (
    <>
      <h1>{Game.Game.name}</h1>
      <p>{Game.Game.description}</p>
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
