import HeaderNav from "../Component/HeaderNav";
import Preloader from "../Component/Preloader";
import Slides from "../Component/Slides";
import CardInfo from "../Component/CardInfo";
import AboutUs from "../Component/AboutUs";
import Footer from "../Component/Footer";
import { PackageSlider } from "../Component/Package";
import { DoctorSlider } from "../Component/Doctors";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/style.css";
function HomePage() {
  return (
    <>
      <Preloader />
      <HeaderNav />
      <Slides  />
      <CardInfo />
      <PackageSlider />
      <AboutUs />
      <DoctorSlider />
      <Footer />
    </>
  );
}
export default HomePage;
