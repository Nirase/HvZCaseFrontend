export interface IMissionInfo {
  startDate: string;
  endDate: string;
  description: string;
  name: string;
}

export interface IMission extends IMissionInfo {
  id: number;
  visibleToHumans: boolean;
  visibleToZombies: boolean;
  location: string;
}

export interface IKill {
  timeOfDeath: string;
  victimId: number;
  location: string;
  description: string;
}

export interface ICreateKill {
  timeOfDeath: string;
  biteCode: string;
  killerId: number;
  description: string;
  location: string;
  gameId: number;
}

export interface ICheckIn {
  id?: number;
  squad: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface ICreateCheckIn {
  squadId: number;
  location: string;
  startDate: string;
  endDate: string;
}
