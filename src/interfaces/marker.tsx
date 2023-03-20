export interface MissionInfo {
  startDate: string;
  endDate: string;
  description: string;
  name: string;
}

export interface Mission extends MissionInfo {
  id: number;
  visibleToHumans: boolean;
  visibleToZombies: boolean;
  location: string;
}

export interface Kill {
  timeOfDeath: string;
  victimId: number;
  location: string;
  description: string;
}

export interface CreateKill {
  timeOfDeath: string;
  biteCode: string;
  killerId: number;
  description: string;
  location: string;
  gameId: number;
}

export interface CheckIn {
  id?: number;
  squad: string;
  location: string;
  startDate: string;
  endDate: string;
}
