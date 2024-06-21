import { useLocation } from "react-router-dom";

export const isActive = (path: string) => {
  const location = useLocation();
  return location.pathname === path;
};
