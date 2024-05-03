import "../assets/css/Package.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { API_ENDPOINTS } from "../apiConfig";
import { formatDate } from "../Module/AppointmentPage";
import { CalendarDTO, DoctorEntity } from "../Models/Model";

const settings = {
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  loop: true,
  autoplay: true,
  smartSpeed: 50000,
  autoplayTimeout: 50000,
  singleItem: true,
  autoplayHoverPause: true,
  items: 1,
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
export const DoctorSlider = () => {
  const [listDoctor, setListDoctor] = useState<DoctorEntity[]>([]);
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
                <img src="src/assets/img/section-img.png" alt="#" />
                <p>
                  Đội ngũ bác sĩ có chuyên môn cao, nhiều năm kinh nghiệm và tâm
                  huyết với nghề
                </p>
                {isLoading && <div>Loading...</div>}
                {error && <div>Không có data</div>}{" "}
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
                : "/src/assets/img/doctor.jpg"
            }`}
            alt=""
          />
        </div>
        <div className="table-head">
          <h4 className=" amount title-package price">
            {doctorEntity.doctorRank}. {doctorEntity.doctorDegree}{" "}
            {doctorEntity.accountName}
          </h4>
          <div className="price">
            <p className="title-package price">
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
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const fetchListDoctor = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          API_ENDPOINTS.GET_CALENDAR_DOCTOR(doctorEntity.id)
        );
        const data = (await response.json()) as CalendarDTO[];
        setCalendar(data);
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchListDoctor();
  }, [doctorEntity]);
  return (
    <div className="col-md-12 col-12 custom-slider">
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
                  : "/src/assets/img/doctor.jpg"
              }`}
              alt=""
            />
          </div>
          <h4 className=" amount title-package price">
            {doctorEntity.doctorRank}. {doctorEntity.doctorDegree}{" "}
            {doctorEntity.accountName}
          </h4>
          <div className="price">
            <p className="title-package price">
              {" "}
              Khoa: {doctorEntity.doctorSpecialty}
            </p>
          </div>
          <div
            className="price"
            style={{ overflowY: "auto", height: " 150px" }}
          >
            {isLoading && <p>"Loading....</p>}
            {error && <p>"Không có data"</p>}
            {calendars ? (
              calendars.map((calendar) => (
                <div key={calendar.id}>
                  <i className="far fa-calendar-check calendar"></i>
                  <span className="calendar">
                    {formatDate(calendar.calendarDate)}
                  </span>
                  <span className="calendar" style={{ margin: "15px" }}>
                    <i className="far fa-clock calendar"></i>
                    <span>
                      {calendar.idGroupTime === "1"
                        ? "07:00 - 11:30"
                        : "12:30 - 17:00"}
                    </span>
                  </span>
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
