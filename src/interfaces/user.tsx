export interface IUser {
  id: number;
  keycloakId: string;
  firstName: string;
  lastName: string;
  players: [];
}
export interface IAddUser {
  keycloakId: string;
  firstName: string;
  lastName: string;
}
