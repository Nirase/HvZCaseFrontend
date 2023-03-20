import { addPlayer, Player } from "../interfaces/player";
import { AddSquad } from "../interfaces/squad";
import { deleteApiData, getApiData, postApiData, putApiData } from "./api";

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

// player
const getPlayersFromGame = async (id: number) => {
  const res = await getApiData(`api/v1/game/${id}/player`);

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

const addPlayerToGame = async (gameId: number, player: addPlayer) => {
  const res = await postApiData(`api/v1/game/${gameId}/player`, player);
  if (!res) {
    return undefined;
  }

  return await res;
};

const updatePlayerToGame = async (id: number, player: Player) => {
  const res = await putApiData(`api/v1/game/${id}/player/${player.id}`, player);

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
const getUser = async (id: number) => {
  const res = await getApiData(`api/v1/user/${id}`);

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

const addSquad = async (gameId: number, squad: AddSquad) => {
  const res = await postApiData(`api/v1/game/${gameId}/squad`, squad);
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

const addMessage = async(gameId: number, body: any) => {
  const res = await postApiData(`api/v1/chat`, body);

  if (!res) {
    return undefined;
  }

  return await res;

}

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
  addSquad,
  addKill,
  addMessage,
};
