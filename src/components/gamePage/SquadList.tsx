import SquadListItem from "./SquadListItem";

const SquadList = () => {
  const squads = [
    {
      name: "sq1",
      members: [
        { name: "hej", is_alive: true },
        { name: "do", is_alive: true },
      ],
    },
    {
      name: "sq2",
      members: [
        { name: "hej", is_alive: true },
        { name: "do", is_alive: false },
      ],
    },
  ];

  return (
    <div>
      <h3>Squads active</h3>
      {squads.map((squad) => {
        return (
          <div key={squad.name} style={{ marginBottom: "10px" }}>
            <SquadListItem squad={squad} />
          </div>
        );
      })}
    </div>
  );
};
export default SquadList;
