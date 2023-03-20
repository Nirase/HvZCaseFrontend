export interface Squad {
  id: number;
  name: string;
  players: [];
  squadCheckIns: [];
}

export interface AddSquad {
  name: string;
  gameId: number;
  creatorId: number;
}
