import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/esm/Navbar";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header>
      <div className="container">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Link to="/home">
              <div className="div-logo">
                <img
                  src="http://myhealthdemo.benhvienkhuvucthuduc.vn/admin/assets/img/logo.png"
                  alt="logo"
                  className="logo-image"
                />
              </div>
            </Link>
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
