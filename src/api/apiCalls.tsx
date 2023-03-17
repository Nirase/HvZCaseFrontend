import { Player } from "../interfaces/player";
import { deleteApiData, getApiData, postApiData, putApiData } from "./api";

const getAnything = async (path: string) => {
  const res = await getApiData(path);

  if (!res) {
    return undefined;
  }

  return await res;
};

//open to all
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

const getPlayersFromGame = async (id: number) => {
  const res = await getApiData(`game/${id}/player`);

  if (!res) {
    return undefined;
  }

  return await res;
};
const getOnePlayerFromGame = async (id: number, playerId: number) => {
  const res = await getApiData(`game/${id}/player/${playerId}`);

  if (!res) {
    return undefined;
  }

  return await res;
};
const addPlayerToGame = async (id: number, player: Player) => {
  const res = await postApiData(`game/${id}/player`, player);
  if (!res) {
    return undefined;
  }

  return await res;
};
const updatePlayerToGame = async (id: number, player: Player) => {
  const res = await putApiData(`game/${id}/player/${player.id}`, player);

  if (!res) {
    return undefined;
  }

  return await res;
};
const deletePlayer = async (id: number, playerId: number) => {
  const res = await deleteApiData(`game/${id}/player?playerId=${playerId}`);

  if (!res) {
    return undefined;
  }

  return await res;
};

const getUser = async (id: number) => {
  const res = await getApiData(`user/${id}`);

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

const getSquads = async (gameId: number) => {
  const res = await getApiData(`api/v1/game/${gameId}/squad`);

  if (!res) {
    return undefined;
  }

  return await res;
};

const addKill = async (gameId: number, body: any) => {
  const res = await postApiData(`api/v1/game/${gameId}/kill`, body);

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
  getPlayersFromGame,
  getOnePlayerFromGame,
  addPlayerToGame,
  updatePlayerToGame,
  deletePlayer,
  getUser,
  getUsers,
  getSquads,
  addKill,
};
