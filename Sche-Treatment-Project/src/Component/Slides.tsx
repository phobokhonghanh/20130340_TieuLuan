import "../assets/css/Slides.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState } from "react";
import { Option, SelectWithSearch } from "./SelectWithSearch";
import { Link } from "react-router-dom";

interface SlideProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}
export const Slide: React.FC<SlideProps> = ({
  backgroundImage,
  title,
  subtitle,
  children,
}) => (
  <div className="single-slider" style={{ backgroundImage }}>
    <div className="container">
      <div className="row">
        <div className="col-lg-7">
          <div className="text">
            <h1>
              {title}
              <span>{subtitle}</span>
            </h1>
            <p>{subtitle}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Slides = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [dataDepartments] = useState<Option[]>([
    { value: "dermatology", label: "Da liễu" },
    { value: "internal", label: "Nội khoa" },
    { value: "surgery", label: "Ngoại khoa" },
  ]);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    loop: true,
    autoplay: true,
    smartSpeed: 500,
    autoplayTimeout: 3500,
    singleItem: true,
    autoplayHoverPause: true,
    items: 1,
    nav: true,
  };

  return (
    <section className="slider">
      <div className="hero-slider">
        <Slider {...settings}>
          <Slide
            backgroundImage="url('/src/assets/img/bg.png')"
            title="Chúng Tôi Cung Cấp "
            subtitle="Dịch Vụ Y Tế Mà Bạn Có Thể Tin Cậy!"
            children={
              <div className="button-div">
                <Link
                  to="/appointment"
                  state={{
                    packageId: "44c79a43-5739-4cc2-89d9-5e48e145a0a0",
                  }}
                  className="btn"
                >
                  Đặt lịch ngay
                </Link>
                <Link to="/packages" className="btn primary">
                  Xem thêm
                </Link>
              </div>
            }
          />
          <Slide
            backgroundImage="url('/src/assets/img/bg.png')"
            title="Bác Sĩ "
            subtitle="Là Người Bạn Có Thể Tin Tưởng!"
            children={
              <div className="button-div">
                <Link
                  to="/doctos"
                  state={{
                    packageId: "44c79a43-5739-4cc2-89d9-5e48e145a0a0",
                  }}
                  className="btn"
                >
                  Đặt lịch ngay với bác sĩ
                </Link>
              </div>
            }
          />
          <Slide
            backgroundImage="url('/src/assets/img/bg.png')"
            title="Gói Khám Bệnh "
            subtitle="Giá Rẻ Không Tưởng!"
            children={
              <div className="button-div">
                <Link
                  to="/doctos"
                  state={{
                    packageId: "44c79a43-5739-4cc2-89d9-5e48e145a0a0",
                  }}
                  className="btn"
                >
                  Tìm kiếm gói khám
                </Link>
              </div>
            }
          />
        </Slider>
      </div>
    </section>
  );
};

export default Slides;
