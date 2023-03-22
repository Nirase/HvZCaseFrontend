export interface IGame {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  gameState?: "Registration" | "In progress" | "Completed";
  location: string;
  radius: number;
  players: [];
  kills: [];
  missions: [];
}

export interface ICreateGame {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  radius: number;
}
