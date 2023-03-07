export interface Game {
  id: number;
  Name: string;
  Description: string;
  GameState?: "Registration" | "In progress" | "Completed";
  players: [];
  kill: [];
}
