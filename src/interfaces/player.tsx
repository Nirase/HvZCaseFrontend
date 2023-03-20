export interface Player {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  isHuman: boolean;
  isPatientZero: boolean;
  biteCode: string;
  squadId: number;
}

export interface addPlayer {
  userId: number;
  isHuman: boolean;
  isPatientZero: boolean;
  biteCode: string;
  gameId: number;
}
