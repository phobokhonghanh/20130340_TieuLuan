import "../assets/css/Package.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { API_ENDPOINTS } from "../apiConfig";
import { CalendarDTO, DoctorEntity } from "../Models/Model";
import { headerAuth } from "../Authentication/Authentication";
import { formatDate } from "../Utils/Utils";
import { DoctorResponse } from "../Models/Doctors/DoctorResponse";

export const DoctorSlider = () => {
  const [listDoctor, setListDoctor] = useState<DoctorEntity[]>([]);

  const settings = {
    infinite: listDoctor.length < 2 ? false : true,
    slidesToShow: 2,
    slidesToScroll: 1,
    loop: true,
    autoplayTimeout: 50000,
    nav: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const fetchListDoctor = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_ENDPOINTS.GET_DOCTOR_SLIDES);
        const data = (await response.json()) as DoctorEntity[];
        setListDoctor(data);
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchListDoctor();
  }, []);
  return (
    <>
      <section className="pricing-table section padbt-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-about">
                <h2>Bác Sĩ Của Chúng Tôi</h2>
                <img src="/img/section-img.png" alt="#" />
                <p>
                  Đội ngũ bác sĩ có chuyên môn cao, nhiều năm kinh nghiệm và tâm
                  huyết với nghề
                </p>
                {isLoading && <div>Loading...</div>}
                {error && <div>Không có dữ liệu</div>}{" "}
              </div>
            </div>
          </div>
          <div className="row">
            {/* <!-- Single Table --> */}
            <Slider {...settings} className="custom-slider">
              {listDoctor.map((doc) => (
                <DoctorInfo doctorEntity={doc} />
              ))}
            </Slider>
            {/* <!-- End Single Table--> */}
          </div>
        </div>
      </section>
      {/* <!--/ End Pricing Table --> */}
    </>
  );
};
interface DoctorProps {
  doctorEntity: DoctorEntity;
}
export const Doctor: React.FC<DoctorProps> = ({ doctorEntity }) => {
  return (
    <div
      className="col-md-12 col-12 custom-slider"
      style={{ marginBottom: "15px" }}
    >
      <div className="single-table package-list">
        <div className="image image-custom center-image">
          <img
            className="image-custom"
            style={{ height: "150px" }}
            src={`${
              doctorEntity.doctorImage
                ? doctorEntity.doctorImage
                : "/img/doctor.jpg"
            }`}
            alt=""
          />
        </div>
        <div className="table-head">
          <h4 className=" amount title-package price">
            {doctorEntity.doctorDegree} {doctorEntity.doctorRank}{" "}
            {doctorEntity.accountName}
          </h4>
          <div className="price">
            <p style={{ color: "black" }}>
              {" "}
              Chuyên khoa: {doctorEntity.doctorSpecialty}
            </p>
          </div>
          <div className="btn-detail">
            <Link
              className="btn"
              to={"/doctor-infor"}
              state={{ doctorState: doctorEntity }}
            >
              Xem chi tiết
            </Link>
          </div>
          <div className="btn-package">
            <Link
              className="btn"
              to="/appointmentDoctor"
              state={{ doctorState: doctorEntity }}
            >
              Đặt lịch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DoctorInfo: React.FC<DoctorProps> = ({ doctorEntity }) => {
  const [calendars, setCalendar] = useState<CalendarDTO[]>([]);
  useEffect(() => {
    const fetchListDoctor = async () => {
      try {
        const response = await fetch(
          API_ENDPOINTS.GET_CALENDAR_DOCTOR(doctorEntity.id),
          headerAuth()
        );
        const data = (await response.json()) as CalendarDTO[];
        setCalendar(data);
      } catch (e: any) {
        console.error(e);
      }
    };
    fetchListDoctor();
  }, [doctorEntity]);
  return (
    <div className="col-md-12 col-12 custom-slider" key={doctorEntity.id}>
      <div className="single-table">
        {/* <!-- Table Head --> */}
        <div className="table-head">
          <div className="icon center-image">
            <img
              className="image-custom"
              style={{ height: "150px" }}
              src={`${
                doctorEntity.doctorImage
                  ? doctorEntity.doctorImage
                  : "/img/doctor.jpg"
              }`}
              alt=""
            />
          </div>
          <h4 className="amount title-package price">
            {doctorEntity.doctorDegree} {doctorEntity.doctorRank}{" "}
            {doctorEntity.accountName}
          </h4>
          <div className="price">
            <p style={{ color: "black" }}>
              {" "}
              Chuyên khoa: {doctorEntity.doctorSpecialty}
            </p>
          </div>
          <div
            className="price time-container"
            style={{ overflowY: "auto", height: " 150px" }}
          >
            {calendars ? (
              calendars.map((calendar) => (
                <div key={calendar.id} style={{ borderBottom: "1px solid" }}>
                  <i className="far fa-calendar-check calendar"></i>
                  <span className="calendar">
                    {formatDate(calendar.calendarDate)}
                  </span>
                  <div className="calendar" style={{ margin: "15px" }}>
                    <i className="far fa-clock calendar"></i>
                    <span>
                      {calendar.idGroupTime === "1"
                        ? "07:00 - 11:30"
                        : "12:30 - 17:00"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="">"Không có lịch khám bệnh"</p>
            )}
          </div>
        </div>
        <div className="table-bottom">
          <Link
            className="btn"
            to="/appointmentDoctor"
            state={{ doctorState: doctorEntity }}
          >
            Đặt lịch
          </Link>
        </div>
        {/* <!-- Table Bottom --> */}
      </div>
    </div>
  );
};
interface DoctorListProps {
  doctor: DoctorResponse;
}
const DoctorItem: React.FC<DoctorListProps> = ({ doctor }) => {
  const genderText = doctor.accountGender === 1 ? "Nam" : "Nữ"; // Assuming accountGender is 1 for male and 2 for female

  return (
    <div className="doctor-info">
      <div
        className="doctor-details"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="doctor-name" style={{ fontStyle: "initial" }}>
          {doctor.doctorRank} {doctor.doctorDegree}
          {doctor.accountName}
        </div>
        <div>{genderText}</div>
      </div>
      <div
        className="doctor-specialty"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>{doctor.accountEmail ? doctor.accountEmail : "Chưa cập nhật"}</div>
        {doctor.doctorSpecialty ? doctor.doctorSpecialty : "Chưa cập nhật"}
      </div>
    </div>
  );
};

export default DoctorItem;
