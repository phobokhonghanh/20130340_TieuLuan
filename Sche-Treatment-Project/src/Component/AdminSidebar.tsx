import "../assets/Admin/css/bootstrap.min.css";
import "../assets/Admin/css/metisMenu.min.css";
import "../assets/Admin/css/timeline.css";
import "../assets/Admin/css/startmin.css";
import "../assets/Admin/css/font-awesome.min.css";
import "../assets/Admin/js/aos-animation/aos.css";

import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";

export const AdminSidebar = () => {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        fixed="top"
        className="navbar-inverse"
      >
        <div className="navbar-header">
          <Link className="navbar-brand" to="/Admin/AdminHomePage">
            ADMIN
          </Link>
        </div>
        <button
          type="button"
          className="navbar-toggle"
          data-toggle="collapse"
          data-target=".navbar-collapse"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <ul className="nav navbar-nav navbar-left navbar-top-links">
          <li>
            <Link to="/Home/Index">
              <i className="fa fa-home fa-fw"></i> Website
            </Link>
          </li>
        </ul>

        <ul className="nav navbar-right navbar-top-links">
          <li className="dropdown navbar-inverse">
            <Link className="dropdown-toggle" data-toggle="dropdown" to="#">
              <i className="fa fa-bell fa-fw"></i> <b className="caret"></b>
            </Link>
            <ul className="dropdown-menu dropdown-alerts">
              <li>
                <Link to="#">
                  <div>
                    <i className="fa fa-comment fa-fw"></i> Bình luận mới
                    <span className="pull-right text-muted small">
                      4 minutes ago
                    </span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <div>
                    <i className="fa fa-users fa-fw"></i> Thành viên mới
                    <span className="pull-right text-muted small">
                      12 minutes ago
                    </span>
                  </div>
                </Link>
              </li>
            </ul>
          </li>
          <li className="dropdown">
            <Link className="dropdown-toggle" data-toggle="dropdown" to="#">
              <i className="fa fa-user fa-fw"></i>ADMIN
              <b className="caret"></b>
            </Link>
            <ul className="dropdown-menu dropdown-user">
              <li>
                <Link to="#Login">
                  <i className="fa fa-sign-out fa-fw"></i> Logout
                </Link>
              </li>
            </ul>
          </li>
        </ul>
        <div className="navbar-default sidebar" role="navigation">
          <div className="sidebar-nav navbar-collapse">
            <ul className="nav" id="side-menu">
              <li className="sidebar-search">
                <div className="input-group custom-search-form">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                  <span className="input-group-btn">
                    <button className="btn btn-primary" type="button">
                      <i className="fa fa-search"></i>
                    </button>
                  </span>
                </div>
              </li>
              <li>
                <Link to="index.html" className="active">
                  <i className="fa  fa-dashboard fa-fw"></i> Thống kê
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="fa fa-bar-chart-o fa-fw"></i> Danh mục
                  <span className="fa arrow"></span>
                </Link>
                <ul className="nav nav-second-level">
                  <li>
                    <Link to="/Producer/Producer">
                      <i className="fa fa-home fa-fw"></i>Dịch vụ khám bệnh
                    </Link>
                  </li>
                  <li>
                    <Link to="/Product/Product_manage">
                      <i className="fa fa-pencil-square-o fa-fw"></i>Gói khám
                      bệnh
                    </Link>
                  </li>
                  <li>
                    <Link to="/Comment/Comment_manage">
                      <i className="fa fa-comments fa-fw"></i>Quản lý bình luận
                    </Link>
                  </li>
                  <li>
                    <Link to="/News/News_Manage">
                      <i className="fa fa-newspaper-o fa-fw"></i> Lịch hẹn bệnh
                      nhân
                    </Link>
                  </li>
                  <li>
                    <Link to="/News/News_Manage">
                      <i className="fa fa-calendar fa-fw"></i> Lịch làm việc
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/Revenue/Revenue">
                  <i className="fa fa-table fa-fw"></i>Doanh thu
                </Link>
              </li>
              <li>
                <Link to="/Order/Order_Manage">
                  <i className="fa  fa-shopping-cart fa-fw"></i> Quản lý đơn
                  hàng
                </Link>
              </li>
              <li>
                <Link to="/Account/Account_Manage">
                  <i className="fa  fa-user fa-fw"></i>Quản lý tài khoản
                </Link>
              </li>
              <li>
                <Link to="/Member/Member">
                  <i className="fa fa-users fa-fw"></i>Thành viên
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
      <Helmet>
        <script src="/src/assets/Admin/js/jquery.min.js"></script>
        <script src="/src/assets/Admin/js/bootstrap.min.js"></script>
        <script src="/src/assets/Admin/js/metisMenu.min.js"></script>
        <script src="/src/assets/Admin/js/metisMenu.min.js"></script>
        <script src="/src/assets/Admin/js/raphael.min.js"></script>
        <script src="/src/assets/Admin/js/startmin.js"></script>
        <script src="/src/assets/Admin/js/aos-animation/bs-animation.js"></script>
        <script src="/src/assets/Admin/js/aos-animation/aos.js"></script>

        {/* <script src="/src/assets/Admin/js/dataTables/jquery.dataTables.min.js"></script> */}
        {/* <script src="/src/assets/Admin/js/dataTables/dataTables.bootstrap.min.js"></script> */}
      </Helmet>

      {/* <script src="/Content/assets/ckfinder/ckfinder.js"></script>
        <script src="/Content/assets/ckeditor/ckeditor.js"></script>
        <script src="/Content/Admin/js/form-style.js"></script>
        <script src="/Content/Admin/js/validation-form/vali-form.js"></script> */}
    </>
  );
};
