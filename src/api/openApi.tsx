export const apiFetch = async (endpoint: string, options: object) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
      ...options,
    });
    return await res.json();
  } catch {
    return undefined;
  }
};

export const getApiData = async (endpoint: string) => {
  return apiFetch(endpoint, { method: "GET" });
};
