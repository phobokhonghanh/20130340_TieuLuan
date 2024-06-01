import { LoginResponse } from "../Models/Model";
import { API_ENDPOINTS } from "../apiConfig";

const localStorageKey = "benhviendakhoathuduc";

const ROLE_ADMIN = "ROLE_ADMIN";
const ROLE_DOCTOR = "ROLE_DOCTOR";
const ROLE_PATIENT = "ROLE_PATIENT";

export const getToken = (): LoginResponse | null => {
  const token = localStorage.getItem(localStorageKey);
  if (token) {
    const json = JSON.parse(token) as LoginResponse;
    return json;
  }
  return null;
};
export const setToken = (token: string): void => {
  localStorage.setItem(localStorageKey, token);
};
export const removeToken = (name: string): void => {
  localStorage.removeItem(name);
};
export const checkToken = (): boolean => {
  return getToken() ? true : false;
};
export const getRole = (): string => {
  const token = getToken();
  return token ? (token.roles ? token.roles[0] : ROLE_PATIENT) : ROLE_PATIENT;
};
export const getIdAccount = (): string => {
  const token = getToken();
  return token ? (token.id ? token.id : "") : "";
};
export const getNameAccount = (): string => {
  const token = getToken();
  return token ? (token.username ? token.username : "") : "";
};
export const checkRoleAdmin = (): boolean => {
  const token = getToken();
  if (token) {
    try {
      return token.roles
        ? token.roles[0] === ROLE_ADMIN
          ? true
          : false
        : false;
    } catch (error) {
      console.error("Error parsing stored response", error);
      return false;
    }
  }
  return false;
};
export const checkRoleDoctor = (): boolean => {
  const token = getToken();
  if (token) {
    try {
      return token.roles
        ? token.roles[0] === ROLE_DOCTOR || token.roles[0] === ROLE_ADMIN
          ? true
          : false
        : false;
    } catch (error) {
      console.error("Error parsing stored response", error);
      return false;
    }
  }
  return false;
};
export const headerAuth = (): any => {
  const token = getToken();
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token ? `Bearer ${token.token}` : ""}`,
    },
  };
  return requestOptions;
};
export const handleLogout = (navigate: (path: string) => void) => {
  removeToken("benhviendakhoathuduc");
  navigate("/");
};

export const checkTokenRealtime = async (navigate: (path: string) => void) => {
  try {
    const token = getToken(); // Use await here
    if (!token) {
      return;
    }
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    };
    const response = await fetch(
      API_ENDPOINTS.GET_REFRESH_TOKEN(getIdAccount()),
      requestOptions
    );
    if (!response.ok) {
      console.error("Response token not OK", response.status);
      if (response.status == 403) {
        handleLogout(navigate);
      }
      return;
    }
    const data: LoginResponse = await response.json();
    setToken(JSON.stringify(data));
  } catch (e: any) {
    console.error("checkToken", e);
  }
};
