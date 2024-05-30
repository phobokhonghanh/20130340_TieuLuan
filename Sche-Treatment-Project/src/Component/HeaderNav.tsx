import { Navbar, Nav, Container, Row, Col, Button } from "react-bootstrap";
import "../assets/css/HeaderNav.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../apiConfig";
import { PackageEntity } from "../Models/Model";
import {
  checkRoleAdmin,
  checkRoleDoctor,
  getIdAccount,
  getNameAccount,
  removeToken,
} from "../Authentication/Authentication";
import { checkDoctor } from "../Utils/Utils";

function HeaderNav() {
  const [sliderMobile, setSliderMobile] = useState(false);
  const handleNavbarToggle = () => {
    setSliderMobile(!sliderMobile);
  };
  const [packageEntity, setPackage] = useState<PackageEntity>();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken("benhviendakhoathuduc");
    navigate("/");
  };
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.GET_PACKAGE_DEFAULT);
        const data = await response.json();
        setPackage(data);
      } catch (e: any) {
        console.error(e);
      }
    };
    fetchPackage();
  }, []);
  return (
    <>
      {/* Header Area */}
      <header className="header">
        {/* Topbar */}
        <div className=""></div>
        {/* End Topbar */}
        {/* Header Inner */}
        <div className="topbar">
          <Container className="containerNav">
            <div className="inner">
              <Row>
                <Col lg={3} style={{ width: "25%" }}>
                  {/* Start Logo */}
                  <div className="logo">
                    <Link to="/">
                      <img
                        src="http://myhealthdemo.benhvienkhuvucthuduc.vn/admin/assets/img/logo.png"
                        alt="logo"
                        className="logo-image"
                      />
                    </Link>
                  </div>
                  {/* End Logo */}
                </Col>
                <Col lg={6} className="center">
                  {/* Main Menu */}
                  <div className="main-menu">
                    <Navbar expand="lg">
                      <Navbar.Toggle
                        onClick={handleNavbarToggle}
                        aria-controls="basic-navbar-nav"
                      />
                      <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="font-nav">
                          <Link to="/" className="nav-link p-right-15">
                            Trang chủ
                          </Link>
                          <Link to="/doctors" className="nav-link p-right-15">
                            Bác sĩ
                          </Link>
                          <Link to="/packages" className="nav-link p-right-15">
                            Gói khám
                          </Link>
                          <Link to="/services" className="nav-link p-right-15">
                            Dịch vụ
                          </Link>
                          <Link to="/about-us" className="nav-link p-right-15">
                            Về chúng tôi
                          </Link>
                        </Nav>
                      </Navbar.Collapse>
                    </Navbar>
                  </div>
                  {/* / End Main Menu */}
                </Col>
                <Col lg={2} xs={2} style={{ width: "11%" }} className="center">
                  <div className="get-quote">
                    <Link
                      to="/appointment"
                      state={{
                        packageState: packageEntity,
                      }}
                      className="btn"
                    >
                      Đặt lịch hẹn
                    </Link>
                  </div>
                </Col>
                <Col lg={1} xs={2} className="center">
                  <div className="get-quote">
                    <div
                      className="btn hover"
                      style={{
                        padding: "5px",
                        background: "none",
                        color: "#048dbb",
                        border: "1px solid #048dbb",
                        borderRadius: "25px",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        width: "150px",
                      }}
                    >
                      <Link
                        to="/account"
                        style={{
                          color: "#048dbb",
                        }}
                      >
                        <i
                          className="fa fa-user icon-cus"
                          aria-hidden="true"
                        ></i>
                        {!getNameAccount() ? (
                          <span
                            style={{
                              paddingRight: "10px",
                            }}
                          >
                            Tài khoản
                          </span>
                        ) : (
                          <>
                            <span
                              style={{
                                paddingRight: "10px",
                              }}
                            >
                              {getNameAccount()}
                            </span>
                          </>
                        )}
                      </Link>
                    </div>
                  </div>
                </Col>
                {getIdAccount() && (
                  <Col
                    lg={1}
                    xs={2}
                    className="center"
                    style={{ width: "3%", cursor: "pointer" }}
                  >
                    {checkRoleAdmin() ? (
                      <Link to={"/admin/home"}>
                        <i
                          className="fa fa-reply-all icon-cus"
                          aria-hidden="true"
                        >
                          {" "}
                          ADMIN
                        </i>
                      </Link>
                    ) : (
                      <>
                        {checkRoleDoctor() && (
                          <Link to={"/admin/appointments"}>
                            <i
                              className="fa fa-reply-all icon-cus"
                              aria-hidden="true"
                            >
                              {" "}
                              Doctor
                            </i>
                          </Link>
                        )}
                        <span onClick={handleLogout}>
                          <i
                            className="fa fa-sign-out icon-cus"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </>
                    )}
                  </Col>
                )}
              </Row>
            </div>
          </Container>
        </div>
        {/* / End Header Inner */}
        <div className={`${sliderMobile ? "mobile" : ""}`}></div>
      </header>
      {/* End Header Area */}
    </>
  );
}

export default HeaderNav;
