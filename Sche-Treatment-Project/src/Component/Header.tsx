import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/esm/Navbar";
import { Link } from "react-router-dom";
import { checkRoleAdmin } from "../Authentication/Authentication";
function Header() {
  return (
    <header>
      <div className="container">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <div className="logo">
              <Link
                to={checkRoleAdmin() ? "/admin/account" : "/"}
                className="logo-image logo-text"
              >
                ESSAY
              </Link>
            </div>
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
