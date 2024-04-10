import HeaderNav from "../Component/HeaderNav";
import Preloader from "../Component/Preloader";
import Slides from "../Component/Slides";
import CardInfo from "../Component/CardInfo";
import Footer from "../Component/Footer";
import GoogleMap from "../Component/Map";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/style.css";
function AboutUsPage() {
  return (
    <>
      <Preloader />
      <HeaderNav />
      <Slides />
      <CardInfo />
      <GoogleMap />
      <Footer />
    </>
  );
}
export default AboutUsPage;
