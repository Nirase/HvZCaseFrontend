export interface Game {
  id: number;
  name: string;
  description: string;
  gameState?: "Registration" | "In progress" | "Completed";
  players: [];
  kills: [];
}
