import { getApiData } from "./openApi";

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

export {
  getListOfGames,
  getListOfGAmesWithDetails,
  getOneGame,
  getOneGameWithDetails,
  getPlayersFromGame,
  getOnePlayerFromGame,
};
