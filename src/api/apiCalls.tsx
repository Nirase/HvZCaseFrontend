import { ICreateGame, IGame } from "../interfaces/game";
import { ICreateMission } from "../interfaces/marker";
import { IAddPlayer, IPlayer } from "../interfaces/player";
import { IAddSquad } from "../interfaces/squad";
import { IAddUser } from "../interfaces/user";
import {
  deleteApiData,
  getApiData,
  patchApiData,
  postApiData,
  putApiData,
} from "./api";

const getAnything = async (path: string) => {
  const res = await getApiData(path);

  if (!res) {
    return undefined;
  }

  return await res;
};

// Game
const getListOfGames = async () => {
  const res = await getApiData(`api/v1/game`);

  if (!res) {
    return undefined;
  }

  return await res;
};

const getListOfGAmesWithDetails = async () => {
  const res = await getApiData("api/v1/game/withdetails");

  if (!res) {
    return undefined;
  }

  return await res;
};

const getOneGame = async (id: number) => {
  const res = await getApiData(`api/v1/game/${id}`);

  if (!res) {
    return undefined;
  }

  return await res;
};

const getOneGameWithDetails = async (id: number) => {
  const res = await getApiData(`api/v1/game/${id}/withdetails`);

  if (!res) {
    return undefined;
  }

  return await res;
};

const updateGame = async (id: number, game: IGame) => {
  const res = await patchApiData(`api/v1/game/${id}`, game);

  if (!res) {
    return undefined;
  }

  return await res;
};

const createAGame = async (game: ICreateGame) => {
  const res = await postApiData(`api/v1/game`, game);

  if (!res) {
    return undefined;
  }

  return await res;
};

const deleteGame = async (id: number) => {
  const res = await deleteApiData(`api/v1/game?id=${id}`);

  if (!res) {
    return undefined;
  }

  return await res;
};

// player
const getPlayersFromGame = async (id: number) => {
  const res = await getApiData(`api/v1/game/${id}/player`);

  if (!res) {
    return undefined;
  }

  return await res;
};
const getPlayersFromGameWithDetails = async (id: number) => {
  const res = await getApiData(`api/v1/game/${id}/player/withdetails`);

  if (!res) {
    return undefined;
  }

  return await res;
};
const getOnePlayerFromGame = async (gameId: number, playerId: number) => {
  const res = await getApiData(`api/v1/game/${gameId}/player/${playerId}`);

  if (!res) {
    return undefined;
  }

  return await res;
};

const AddPlayerToGame = async (gameId: number, player: IAddPlayer) => {
  const res = await postApiData(`api/v1/game/${gameId}/player`, player);
  if (!res) {
    return undefined;
  }

  return await res;
};

const updatePlayerToGame = async (id: number, player: IPlayer) => {
  const res = await patchApiData(
    `api/v1/game/${id}/player/${player.id}`,
    player
  );

  if (!res) {
    return undefined;
  }

  return await res;
};

const deletePlayer = async (id: number, playerId: number) => {
  const res = await deleteApiData(
    `api/v1/game/${id}/player?playerId=${playerId}`
  );

  if (!res) {
    return undefined;
  }

  return await res;
};

//User
const addUser = async (user: IAddUser) => {
  const res = await postApiData("api/v1/user", user);
  if (!res) return undefined;
  return await res;
};

const getUserById = async (id: number) => {
  const res = await getApiData(`api/v1/user/${id}`);

  if (!res) {
    return undefined;
  }

  return await res;
};

const getUserByKeyCloakId = async (keyCloackId: string) => {
  const res = await getApiData(`api/v1/user/keycloak/${keyCloackId}`);

  if (!res) {
    return undefined;
  }

  return await res;
};

const getUsers = async () => {
  const res = await getApiData(`api/v1/user`);

  if (!res) {
    return undefined;
  }

  return await res;
};

// Squad
const getSquads = async (gameId: number) => {
  const res = await getApiData(`api/v1/game/${gameId}/squad`);

  if (!res) {
    return undefined;
  }

  return await res;
};

const getOneSquadById = async (gameId: number, squadId: number) => {
  const res = await getApiData(`api/v1/game/${gameId}/squad/${squadId}`);

  if (!res) {
    return undefined;
  }

  return await res;
};

const getOneSquadByIdWithDetails = async (gameId: number, squadId: number) => {
  const res = await getApiData(
    `api/v1/game/${gameId}/squad/${squadId}/withdetails`
  );

  if (!res) {
    return undefined;
  }

  return await res;
};

const addSquad = async (gameId: number, squad: IAddSquad) => {
  const res = await postApiData(`api/v1/game/${gameId}/squad`, squad);
  if (!res) {
    return undefined;
  }

  return await res;
};

const addSquadCheckIn = async (
  gameId: number,
  squadId: number,
  checkIn: any
) => {
  const res = await postApiData(
    `api/v1/game/${gameId}/squad/${squadId}/squadcheckin`,
    checkIn
  );
  if (!res) {
    return undefined;
  }

  return await res;
};

const AddPlayerToSquad = async (
  gameId: number,
  squadId: number,
  playerId: number
) => {
  const res = await patchApiData(
    `api/v1/game/${gameId}/squad/${squadId}/join`,
    playerId
  );

  if (!res) {
    return undefined;
  }

  return await res;
};

const removePlayerFromSquad = async (
  gameId: number,
  squadId: number,
  playerId: number
) => {
  const res = await patchApiData(
    `api/v1/game/${gameId}/squad/${squadId}/leave`,
    playerId
  );

  if (!res) {
    return undefined;
  }

  return await res;
};

// kill
const addKill = async (gameId: number, body: any) => {
  const res = await postApiData(`api/v1/game/${gameId}/kill`, body);

  if (!res) {
    return undefined;
  }

  return await res;
};

//mission
const getAllMissionsInGame = async (gameId: number) => {
  const res = await getApiData(`api/v1/game/${gameId}/mission`);

  if (!res) {
    return undefined;
  }

  return await res;
};

const createMission = async (gameId: number, mission: ICreateMission) => {
  const res = await postApiData(`api/v1/game/${gameId}/mission`, mission);
  if (!res) {
    return undefined;
  }

  return await res;
};
const deleteMission = async (gameId: number, missionId: number) => {
  const res = await deleteApiData(
    `api/v1/game/${gameId}/mission?id=${missionId}`
  );
  if (!res) {
    return undefined;
  }

  return await res;
};

//chat
const addMessage = async (gameId: number, body: any) => {
  const res = await postApiData(`api/v1/chat`, body);

  if (!res) {
    return undefined;
  }

  return await res;
};

export {
  getAnything,
  getListOfGames,
  getListOfGAmesWithDetails,
  getOneGame,
  getOneGameWithDetails,
  updateGame,
  createAGame,
  deleteGame,
  getPlayersFromGame,
  getPlayersFromGameWithDetails,
  getOnePlayerFromGame,
  AddPlayerToGame,
  updatePlayerToGame,
  deletePlayer,
  getUserById,
  getUserByKeyCloakId,
  getUsers,
  addUser,
  getSquads,
  getOneSquadById,
  getOneSquadByIdWithDetails,
  addSquad,
  addSquadCheckIn,
  AddPlayerToSquad,
  removePlayerFromSquad,
  addKill,
  getAllMissionsInGame,
  createMission,
  deleteMission,
  addMessage,
};
