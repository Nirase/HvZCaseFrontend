export interface Game {
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
