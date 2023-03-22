export interface User {
  id: number;
  keycloakId: string;
  firstName: string;
  lastName: string;
  players: [];
}
export interface AddUser{
  keycloakId: string;
  firstName: string;
  lastName: string;
}