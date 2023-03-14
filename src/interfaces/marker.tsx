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
  id: number;
  timeOfDeath: string;
  victimId: number;
  location: string;
  description: string;
}
