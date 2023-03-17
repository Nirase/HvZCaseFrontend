import { Player } from "../interfaces/player";
import { deleteApiData, getApiData, postApiData, putApiData } from "./api";

const getListOfGames = async () => {
  const res = await getApiData("game");

  if (!res) {
    return undefined;
  }

  return await res;
};

const getListOfGAmesWithDetails = async () => {
  const res = await getApiData("game/withdetails");

  if (!res) {
    return undefined;
  }

  return await res;
};

const getOneGame = async (id: number) => {
  const res = await getApiData(`game/${id}`);

  if (!res) {
    return undefined;
  }

  return await res;
};

const getOneGameWithDetails = async (id: number) => {
  const res = await getApiData(`game/${id}/withdetails`);

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

export {
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
};
