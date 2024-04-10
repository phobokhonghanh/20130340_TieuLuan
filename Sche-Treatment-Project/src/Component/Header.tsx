import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/esm/Navbar";
function Header() {
  return (
    <header>
      <div className="container">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">
              <div className="div-logo">
                <img
                  src="http://myhealthdemo.benhvienkhuvucthuduc.vn/admin/assets/img/logo.png"
                  alt="logo"
                  className="logo-image"
                />
              </div>
            </Navbar.Brand>
            <label htmlFor="">
              Tổng đài CSKH: <b>19006080</b>
            </label>
          </Container>
        </Navbar>
      </div>
    </header>
  );
}
export default Header;
