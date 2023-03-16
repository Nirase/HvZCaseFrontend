import { getApiData } from "./api";

const apiPart = "api/v1/";

const getAnything = async (path: string) => {
  const res = await getApiData(path);

  if (!res) {
    return undefined;
  }

  return await res;
};

//open to all
const getListOfGames = async () => {
  const res = await getApiData(`${apiPart}game`);

  if (!res) {
    return undefined;
  }

  return await res;
};

const getListOfGAmesWithDetails = async () => {
  const res = await getApiData(apiPart + "game/withdetails");

  if (!res) {
    return undefined;
  }

  return await res;
};

const getOneGame = async (id: number) => {
  const res = await getApiData(`${apiPart}game/${id}`);

  if (!res) {
    return undefined;
  }

  return await res;
};

const getOneGameWithDetails = async (id: number) => {
  const res = await getApiData(`${apiPart}game/${id}/withdetails`);

  if (!res) {
    return undefined;
  }

  return await res;
};

const getUsers = async () => {
  const res = await getApiData(`${apiPart}user`);

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
};
