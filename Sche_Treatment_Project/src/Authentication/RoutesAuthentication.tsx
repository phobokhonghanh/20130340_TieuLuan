import { Navigate, Outlet } from "react-router-dom";
import { checkRoleAdmin, checkRoleDoctor, checkToken } from "./Authentication";

export const UserRoutes = () => {
  return checkToken() ? <Outlet /> : <Navigate to="/login" />;
};

export const AdminRoutes = () => {
  return checkRoleAdmin() ? <Outlet /> : <Navigate to="/login" />;
};
export const DoctorRoutes = () => {
  return checkRoleDoctor() ? <Outlet /> : <Navigate to="/login" />;
};
