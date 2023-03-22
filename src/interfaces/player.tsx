export interface IPlayer {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  isHuman: boolean;
  isPatientZero: boolean;
  biteCode: string;
  squadId: number | null;
}

export interface IAddPlayer {
  userId: number;
  isHuman: boolean;
  isPatientZero: boolean;
  biteCode: string;
  gameId: number;
}
