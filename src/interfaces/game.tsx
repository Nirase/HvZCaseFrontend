export interface Game {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  gameState?: "Registration" | "In progress" | "Completed";
  players: [];
  kills: [];
}
