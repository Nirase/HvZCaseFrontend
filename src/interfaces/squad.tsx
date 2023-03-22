export interface ISquad {
  id: number;
  name: string;
  players: [];
  squadCheckIns: [];
}

export interface IAddSquad {
  name: string;
  gameId: number;
  creatorId: number;
}
