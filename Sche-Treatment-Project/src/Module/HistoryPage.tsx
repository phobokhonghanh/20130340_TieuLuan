import { HistoryAppointment } from "../Component/Appointment";
import Footer from "../Component/Footer";
import HeaderNav from "../Component/HeaderNav";
import Preloader from "../Component/Preloader";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/style.css";
export function History() {
  return (
    <>
      <Preloader />
      <HeaderNav />
      <HistoryAppointment />
      <Footer />
    </>
  );
}
