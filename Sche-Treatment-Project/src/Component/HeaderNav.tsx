import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import "../assets/css/HeaderNav.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "../apiConfig";
import { PackageEntity } from "../Models/Model";
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
  const [packageEntity, setPackage] = useState<PackageEntity>();
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const fetchPackage = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_ENDPOINTS.GET_PACKAGE_DEFAULT);
        const data = await response.json();
        setPackage(data);
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
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
                <Col lg={2} xs={2}>
                  <div className="get-quote">
                    <Link
                      to="/appointment"
                      state={{
                        packageState: packageEntity,
                      }}
                      className="btn"
                    >
                      Đặt lịch khám bệnh
                    </Link>
                  </div>
                </Col>
                <Col lg={1} xs={2}>
                  <div className="icon">
                    <Link to="/account" className="icon-container">
                      <i className="fa fa-user icon-cus" aria-hidden="true"></i>
                      <span className="label">Tài khoản</span>
                    </Link>
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
