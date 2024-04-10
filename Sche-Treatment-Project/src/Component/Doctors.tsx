import "../assets/css/Package.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface DoctorProps {
  hinhAnh: string;
  hocVi: string;
  hocHam: string;
  ten: string;
  chuyenKhoa: string;
  time?: React.ReactNode;
}

export const Doctor: React.FC<DoctorProps> = ({
  hinhAnh,
  hocVi,
  hocHam,
  ten,
  chuyenKhoa,
}) => {
  // const [modalShow, setModalShow] = useState(false);
  return (
    <div className="col-md-12 col-12 custom-slider">
      {/* <div className="single-table">
      <div className="icon center-image">
      </div> */}
      <div className="single-table package-list">
        <div className="image image-custom center-image">
          <img className="image-custom" src={`${hinhAnh}`} alt="" />
        </div>
        {/* <!-- Table Head --> */}
        <div className="table-head">
          <h4 className="title-package">
            {hocVi}.{hocHam} {ten}
          </h4>
          <div className="price">
            <p className="amount">{chuyenKhoa}</p>
          </div>
          <div className="btn-detail">
            <a className="btn">Xem chi tiết</a>
            {/* <Modals
              title="bác sĩ"
              show={modalShow}
              onHide={() => setModalShow(false)} obj={undefined} /> */}
          </div>
          <div className="btn-package">
            <a className="btn" href="#">
              Đặt lịch
            </a>
          </div>
        </div>
        {/* <!-- Table Bottom --> */}
      </div>
    </div>
  );
};
export const DoctorInfo: React.FC<DoctorProps> = ({
  hinhAnh,
  hocVi,
  hocHam,
  ten,
  chuyenKhoa,
  time,
}) => (
  <div className="col-md-12 col-12 custom-slider">
    <div className="single-table">
      {/* <!-- Table Head --> */}
      <div className="table-head">
        <div className="icon center-image">
          <img className="image-custom" src={`${hinhAnh}`} alt="" />
        </div>
        <h4 className="title">
          {hocVi}.{hocHam} {ten}
        </h4>
        <div className="price">
          <p className="amount">{chuyenKhoa}</p>
        </div>
        <ul className="table-list">{time}</ul>
      </div>
      <div className="table-bottom">
        <a className="btn" href="#">
          Đặt lịch
        </a>
      </div>
      {/* <!-- Table Bottom --> */}
    </div>
  </div>
);
const settings = {
  // dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  loop: true,
  autoplay: true,
  smartSpeed: 10000,
  autoplayTimeout: 10000,
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
export const DoctorSlider = () => (
  <>
    <section className="pricing-table section padbt-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-about">
              <h2>Các Bác Sĩ Giỏi Nhất</h2>
              <img src="src/assets/img/section-img.png" alt="#" />
              <p>
                Đội ngũ bác sĩ có chuyên môn cao, nhiều năm kinh nghiệm và tâm
                huyết với nghề
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          {/* <!-- Single Table --> */}
          <Slider {...settings} className="custom-slider">
            <DoctorInfo
              hinhAnh="/src/assets/img/doctor.jpg"
              hocVi="Ts"
              hocHam="PGS"
              ten="Nguyễn Đăng Khoa"
              chuyenKhoa="Khoa Nội"
            />
            <DoctorInfo
              hinhAnh="/src/assets/img/doctor.jpg"
              hocVi="Ts"
              hocHam="PGS"
              ten="Phạm Kiều"
              chuyenKhoa="Khoa Ngoại"
            />
            <DoctorInfo
              hinhAnh="/src/assets/img/doctor.jpg"
              hocVi="Ts"
              hocHam="PGS"
              ten="Lê Nhất"
              chuyenKhoa="Khoa Nhi"
            />
          </Slider>
          {/* <!-- End Single Table--> */}
        </div>
      </div>
    </section>
    {/* <!--/ End Pricing Table --> */}
  </>
);
