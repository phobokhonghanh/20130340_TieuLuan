import { HistoryAppointment } from "../Component/Appointment";
import Footer from "../Component/Footer";
import HeaderNav from "../Component/HeaderNav";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/style.css";
export function History() {
  return (
    <>
      <HeaderNav />
      <HistoryAppointment />
      <Footer />
    </>
  );
}
