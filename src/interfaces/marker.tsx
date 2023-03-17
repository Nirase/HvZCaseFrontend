export interface Info {
  startDate: string;
  endDate: string;
  description: string;
  name: string;
}

export interface Mission extends Info {
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
