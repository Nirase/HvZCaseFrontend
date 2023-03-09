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
    <>
      <p>Squads active</p>
      {squads.map((squad) => {
        return (
          <div key={squad.name}>
            <SquadListItem squad={squad} />
          </div>
        );
      })}
    </>
  );
};
export default SquadList;
