import CardInfo from "../Component/CardInfo";
import Footer from "../Component/Footer";
import { DoctorDetails } from "../Component/Profile";
import Slides from "../Component/Slides";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/style.css";
import { useLocation } from "react-router-dom";
import { DoctorEntity } from "../Models/Model";
export function DoctorInfor() {
  const { state } = useLocation();
  const doctorState: DoctorEntity = state.doctorState;
  return (
    <>
      {/* <HeaderNav /> */}
      <Slides />
      <CardInfo />
      <DoctorDetails doctor={doctorState}/>
      <Footer />
    </>
  );
}
