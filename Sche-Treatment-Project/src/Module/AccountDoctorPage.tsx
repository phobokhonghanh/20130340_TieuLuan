import Footer from "../Component/Footer";
import HeaderNav from "../Component/HeaderNav";
import { ProfileDoctorDetails } from "../Component/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/style.css";
export function AccountDoctorDetails() {
  return (
    <>
      <HeaderNav />
      <ProfileDoctorDetails />
      <Footer />
    </>
  );
}
