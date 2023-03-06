import { getApiData } from "./openApi";

const getListOfGames = async () => {
  const res = await getApiData("/");

  if (!res) {
    return undefined;
  }

  return await res;
};

export { getListOfGames };
