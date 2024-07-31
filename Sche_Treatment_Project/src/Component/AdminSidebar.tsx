import "../assets/Admin/css/font-awesome.min.css";
import "../assets/Admin/css/styleAdmin.css";

import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import useLogout, {
  checkRoleAdmin,
  checkTokenRealtime,
  getNameAccount,
  getToken,
} from "../Authentication/Authentication";
import { useEffect, useState } from "react";
import { Notifi } from "./Notification";
import { isActive } from "../Utils/Header";

export const AdminSidebar = () => {
  const logout = useLogout();
  const [message, setMessage] = useState("");
  const [levelMessage, setLevelMessage] = useState<"danger" | "success">(
    "danger"
  );
  const [showMess, setShowMess] = useState(false);

  const handleLogout = () => {
    setMessage("Bạn đã đăng xuất");
    setLevelMessage("success");
    setShowMess(true);
    logout();
  };
  const token = getToken();
  const checkToken = async () => {
    if (token) {
      const isTokenValid = await checkTokenRealtime(token);
      if (!isTokenValid) {
        setMessage("Tài khoản đã bị khóa");
        setLevelMessage("danger");
        setShowMess(true);
        logout();
      }
    }
  };
  useEffect(() => {
    checkToken();
  }, [token]);
  return (
    <>
      {showMess && (
        <Notifi
          message={message}
          variant={levelMessage}
          onClose={() => setShowMess(false)}
          
        />
      )}
      <Navbar
        collapseOnSelect
        expand="lg"
        fixed="top"
        className="navbar-inverse"
        
      >
        <div className="navbar-header">
          <Link className="navbar-brand" to="/admin/home">
            ADMIN SIDE
          </Link>
        </div>
        <ul
          className="nav navbar-nav navbar-top-links"
          style={{ position: "absolute", right: "0", padding: "10px" }}
        >
          <li>
            <Link className="dropdown-toggle" data-toggle="dropdown" to="#">
              <i className="fa fa-user fa-fw"></i> {getNameAccount()}
            </Link>
            <ul>
              <li>
                <span
                  onClick={handleLogout}
                  style={{ cursor: "pointer", color: "white" }}
                >
                  Đăng xuất
                  <i className="fa fa-sign-out icon-cus" aria-hidden="true"></i>
                </span>
              </li>
            </ul>
          </li>
        </ul>
        <div className="navbar-default sidebar" role="navigation">
          <div className="sidebar-nav navbar-collapse">
            <ul className="nav" id="side-menu">
              <li className="sidebar-search">
                <div className="input-group custom-search-form">
                  <Link to="/home" className="form-control">
                    <i className="fa fa-home fa-fw"></i> Website
                  </Link>
                </div>
              </li>
              {checkRoleAdmin() && (
                <>
                  <li
                    className={
                      isActive("/admin/home") ? "sidebar-search active" : ""
                    }
                  >
                    <Link to="/admin/home" className="">
                      <i className="fa  fa-dashboard fa-fw"></i> Thống kê
                    </Link>
                  </li>
                  <li
                    className={
                      isActive("/admin/area") ? "sidebar-search active" : ""
                    }
                  >
                    <Link to="/admin/area">
                      <i className="fa fa-location fa-fw"></i> Khu vực khám
                    </Link>
                  </li>
                  <li
                    className={
                      isActive("/admin/clinic") ? "sidebar-search active" : ""
                    }
                  >
                    <Link to="/admin/clinic">
                      <i className="fa fa-home fa-fw"></i> Phòng khám
                    </Link>
                  </li>
                  <li
                    className={
                      isActive("/admin/packages") ? "sidebar-search active" : ""
                    }
                  >
                    <Link to="/admin/packages">
                      <i className="fa fa-pencil-square-o fa-fw"></i>Gói khám
                      bệnh
                    </Link>
                  </li>
                  <li
                    className={
                      isActive("/admin/services") ? "sidebar-search active" : ""
                    }
                  >
                    <Link to="/admin/services">
                      <i className="fa fa-calendar fa-fw"></i>Dịch vụ khám bệnh
                    </Link>
                  </li>
                  <li
                    className={
                      isActive("/admin/account") ? "sidebar-search active" : ""
                    }
                  >
                    <Link to="/admin/account">
                      <i className="fa  fa-user fa-fw"></i>Quản lý tài khoản
                    </Link>
                  </li>
                  <li
                    className={
                      isActive("/admin/bill") ? "sidebar-search active" : ""
                    }
                  >
                    <Link to="/admin/bill">
                      <i className="fa fa-shopping-cart fa-fw"></i> Quản lý hóa
                      đơn
                    </Link>
                  </li>
                  <li
                    className={
                      isActive("/admin/evaluate") ? "sidebar-search active" : ""
                    }
                  >
                    <Link to="/admin/evaluate">
                      <i className="fa fa-commenting-o"></i> Quản lý nhận xét
                    </Link>
                  </li>
                  <li
                    className={
                      isActive("/admin/log") ? "sidebar-search active" : ""
                    }
                  >
                    <Link to="/admin/log">
                      <i className="fa fa-bell-o"></i> Nhật ký hoạt động
                    </Link>
                  </li>
                </>
              )}
              <li
                className={
                  isActive("/admin/appointments") || !checkRoleAdmin()
                    ? "sidebar-search active"
                    : ""
                }
              >
                <Link to="/admin/appointments">
                  <i className="fa fa-newspaper-o fa-fw"></i> Lịch hẹn bệnh nhân
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Navbar>
      <div className="page-footer">
        <div className="page-footer-inner">
          EssayMedical - Website Đặt lịch hẹn khám bệnh
        </div>
      </div>
    </>
  );
};
