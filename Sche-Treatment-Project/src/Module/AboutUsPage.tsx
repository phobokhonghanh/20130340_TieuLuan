import Slides from "../Component/Slides";
import CardInfo from "../Component/CardInfo";
import Footer from "../Component/Footer";
import GoogleMap from "../Component/Map";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/style.css";
import Preloader from "../Component/Preloader";
import { useState } from "react";
function AboutUsPage() {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1500);
  return (
    <>
      {loading && <Preloader />}
      <Slides />
      <CardInfo />
      <GoogleMap />
      <Footer />
    </>
  );
}
export default AboutUsPage;
