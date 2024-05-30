// import "../assets/Admin/css/bootstrap.min.css";
// import "../assets/Admin/css/metisMenu.min.css";
// import "../assets/Admin/css/timeline.css";
// import "../assets/Admin/css/startmin.css";
import "../assets/Admin/css/font-awesome.min.css";
// import "../assets/Admin/js/aos-animation/aos.css";
import "../assets/Admin/css/styleAdmin.css";

import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { getNameAccount, removeToken } from "../Authentication/Authentication";

export const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken("benhviendakhoathuduc");
    navigate("/");
  };
  return (
    <>
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
              <li className="sidebar-search">
                <Link to="/admin/home" className="active">
                  <i className="fa  fa-dashboard fa-fw"></i> Thống kê
                </Link>
              </li>
              <li>
                <Link to="/admin/clinic">
                  <i className="fa fa-home fa-fw"></i> Phòng khám
                </Link>
              </li>

              <li>
                <Link to="/admin/packages">
                  <i className="fa fa-pencil-square-o fa-fw"></i>Gói khám bệnh
                </Link>
              </li>
              <li className="sidebar-search">
                <Link to="/admin/account">
                  <i className="fa  fa-user fa-fw"></i>Quản lý tài khoản
                </Link>
              </li>
              <li className="sidebar-search">
                <Link to="/admin/bill">
                  <i className="fa fa-shopping-cart fa-fw"></i> Quản lý hóa đơn
                </Link>
              </li>
              <li>
                <Link to="/admin/services">
                  <i className="fa fa-calendar fa-fw"></i>Dịch vụ khám bệnh
                </Link>
              </li>
              <li>
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
          ADMIN - Website Đăng Ký Khám Bệnh Trực Tuyến
        </div>
      </div>
    </>
  );
};
