import { Outlet, matchPath, useLocation } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import Header from "./Header";
import { AdminSidebar } from "./AdminSidebar";

const Layout: React.FC = ({}) => {
  const location = useLocation();

  const header1Paths = [
    "/register",
    "/login",
    "/forgot-password",
    "/reset-password",
    "/otp",
    "/payment/success",
    "/payment/cancel",
  ];

  const isHeader1 = header1Paths.some(
    (path) =>
      matchPath(path, location.pathname) || location.pathname.startsWith(path)
  );

  return (
    <div>
      {isHeader1 ? <Header /> : <HeaderNav />}
      <main>
        {" "}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

export const LayoutAdmin: React.FC = ({}) => {
  return (
    <div>
      <AdminSidebar />
      <main>
        {" "}
        <Outlet />
      </main>
    </div>
  );
};
