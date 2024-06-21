import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import "../assets/css/HeaderNav.css";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { API_ENDPOINTS } from "../apiConfig";
import { PackageEntity } from "../Models/Model";
import useLogout, {
  checkRoleAdmin,
  checkRoleDoctor,
  checkTokenRealtime,
  getIdAccount,
  getNameAccount,
  getToken,
} from "../Authentication/Authentication";
import { Notifi } from "./Notification";
import { isActive } from "../Utils/Header";

function HeaderNav() {
  const [message, setMessage] = useState("");
  const [levelMessage, setLevelMessage] = useState<"danger" | "success">(
    "danger"
  );
  const [showMess, setShowMess] = useState(false);
  const [sliderMobile, setSliderMobile] = useState(false);
  const handleNavbarToggle = () => {
    setSliderMobile(!sliderMobile);
  };
  const [packageEntity, setPackage] = useState<PackageEntity>();
  const logout = useLogout();

  const handleLogout = () => {
    setMessage("Bạn đã đăng xuất");
    setLevelMessage("success");
    setShowMess(true);
    logout();
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = getToken();
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

    checkToken();
  }, []);

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
      {showMess && (
        <Notifi
          message={message}
          variant={levelMessage}
          onClose={() => setShowMess(false)}
        />
      )}
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
                    <Link to="/" className="logo-image logo-text">
                      ESSAY
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
                          <Link
                            to="/"
                            className={`nav-link p-right-15 ${
                              isActive("/") && "active"
                            }`}
                          >
                            Trang chủ
                          </Link>
                          <Link
                            to="/doctors"
                            className={`nav-link p-right-15 ${
                              isActive("/doctors") && "active"
                            }`}
                          >
                            Bác sĩ
                          </Link>
                          <Link
                            to="/packages"
                            className={`nav-link p-right-15 ${
                              isActive("/packages") && "active"
                            }`}
                          >
                            Gói khám
                          </Link>
                          <Link
                            to="/services"
                            className={`nav-link p-right-15 ${
                              isActive("/services") && "active"
                            }`}
                          >
                            Dịch vụ
                          </Link>
                          <Link
                            to="/about-us"
                            className={`nav-link p-right-15 ${
                              isActive("/about-us") && "active"
                            }`}
                          >
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
                            Đăng nhập
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
