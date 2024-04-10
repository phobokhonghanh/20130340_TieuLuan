import CardInfo from "../Component/CardInfo";
import Footer from "../Component/Footer";
import HeaderNav from "../Component/HeaderNav";
import Preloader from "../Component/Preloader";
import { DoctorDetails } from "../Component/Profile";
import Slides from "../Component/Slides";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/style.css";
export function DoctorInfor() {
  return (
    <>
      <Preloader />
      <HeaderNav />
      <Slides />
      <CardInfo />
      <DoctorDetails />
      <Footer />
    </>
  );
}
