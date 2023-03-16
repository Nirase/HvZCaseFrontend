import { getApiData, postApiData } from "./api";

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
  getUsers,
  getSquads,
  addKill,
};
