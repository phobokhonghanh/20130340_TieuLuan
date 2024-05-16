import Footer from "../Component/Footer";
import HeaderNav from "../Component/HeaderNav";
import { Profile } from "../Component/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/style.css";
export function Account() {
  return (
    <>
      <HeaderNav />
      <Profile />
      <Footer />
    </>
  );
}
