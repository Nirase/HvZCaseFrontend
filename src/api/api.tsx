import keycloak from "../keycloak";

export const apiFetch = async (endpoint: string, options: object) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.status === 204) {
      return 204;
    }
    return await res.json();
  } catch {
    return undefined;
  }
};

export const getApiData = async (endpoint: string) => {
  return apiFetch(endpoint, { method: "GET" });
};

export const postApiData = async (endpoint: string, data: any) => {
  return apiFetch(endpoint, {
    method: "POST",
    body: data && JSON.stringify(data),
  });
};

export const putApiData = async (endpoint: string, data: any) => {
  return apiFetch(endpoint, {
    method: "PUT",
    body: data && JSON.stringify(data),
  });
};
export const patchApiData = async (endpoint: string, data: any) => {
  return apiFetch(endpoint, {
    method: "PATCH",
    body: data && JSON.stringify(data),
  });
};

export const deleteApiData = async (endpoint: string) => {
  return apiFetch(endpoint, {
    method: "DELETE",
  });
};
