import { LoginResponse } from "../Models/Model";

const localStorageKey = "response";
const ROLE_ADMIN = "ROLE_ADMIN";
const ROLE_DOCTOR = "ROLE_DOCTOR";

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

export const removeToken = (): void => {
  localStorage.removeItem(localStorageKey);
};
export const checkToken = (): boolean => {
  return getToken() ? true : false;
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
