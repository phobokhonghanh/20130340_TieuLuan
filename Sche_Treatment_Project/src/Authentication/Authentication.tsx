import { useNavigate } from "react-router-dom";
import { LoginResponse } from "../Models/Model";
import { refreshToken } from "../apiConfig";

const localStorageKey = "essaymedical";

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
export const checkRoleOnlyDoctor = (): boolean => {
  const token = getToken();
  if (token) {
    try {
      return token.roles
        ? token.roles[0] === ROLE_DOCTOR
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
export const headerAuthImage = (): any => {
  const token = getToken();
  const requestOptions = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `${token ? `Bearer ${token.token}` : ""}`,
    },
  };
  return requestOptions;
};
export const checkTokenRealtime = (token: LoginResponse): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    refreshToken(token)
      .then((response: any) => {
        if (response.status === 200) {
          const responseData: LoginResponse = response.data;
          setToken(JSON.stringify(responseData));
          resolve(true);
        }
        if (response.status === 204) {
          resolve(true);
        }
      })
      .catch((error: any) => {
        if (error.response.status === 403) {
          resolve(false);
        } else {
          reject(error);
        }
      });
  });
};
const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    removeToken("essaymedical");
    const timer = setTimeout(() => {
      navigate("/");
    }, 500);
    return () => clearTimeout(timer);
  };

  return logout;
};

export default useLogout;
