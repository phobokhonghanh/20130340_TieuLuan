import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import "../assets/css/HeaderNav.css";
import { useState } from "react";
import { Link } from "react-router-dom";
// function HeaderNav({
//   onNavbarToggle,
// }: {
//   onNavbarToggle: (event: React.SyntheticEvent) => void;
// }) {
function HeaderNav() {
  const [sliderMobile, setSliderMobile] = useState(false);
  const handleNavbarToggle = () => {
    setSliderMobile(!sliderMobile);
  };
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
                <Col lg={3}>
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
                <Col lg={2} xs={2}>
                  <div className="get-quote">
                    <a href="appointment.html" className="btn">
                      Đặt lịch khám bệnh
                    </a>
                  </div>
                </Col>
                <Col lg={1} xs={2}>
                  <div className="icon">
                    <a href="#" className="icon-container">
                      <i className="fa fa-user icon-cus" aria-hidden="true"></i>
                      <span className="label">Tài khoản</span>
                    </a>
                    <a href="#" className="icon-container">
                      <i className="fa fa-bell icon-cus" aria-hidden="true"></i>
                      <span className="label">Thông báo</span>
                    </a>
                  </div>
                </Col>
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
