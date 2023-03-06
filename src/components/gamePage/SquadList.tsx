import SquadListItem from "./SquadListItem";

const SquadList = () => {
  const squads = [
    {
      squad: "sq1",
      members: [
        { name: "hej", alive: true },
        { name: "do", alive: false },
      ],
    },
    {
      squad: "sq2",
      members: [
        { name: "hej", alive: true },
        { name: "do", alive: false },
      ],
    },
  ];

  return (
    <>
      <p>hej</p>
      {squads.forEach((squad) => {
        <SquadListItem squad={squad} />;
      })}
    </>
  );
};
export default SquadList;
