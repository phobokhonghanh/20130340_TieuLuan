import "../assets/css/Package.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Option, SelectWithSearch } from "./SelectWithSearch";
import { useState } from "react";
import Modals from "./Modal";
// import { Modal } from "./Modal";
interface PackageProps {
  name: string;
  price: string;
  service?: React.ReactNode;
}
const settings = {
  // dots: true,
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  loop: false,
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
export const PackageSlider = () => (
  <>
    <section className="pricing-table">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-about">
              <h2>Các Gói Khám Tốt Nhất</h2>
              <img src="src/assets/img/section-img.png" alt="#" />
              <p>
                Chúng tôi cung cấp cho bạn các gói khám tốt nhất với giá cả hợp
                lý
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          {/* <!-- Single Table --> */}
          <Slider {...settings} className="custom-slider">
            <PackageInfo
              name="Gói khám 1"
              price="1.000.000"
              service={
                <>
                  <li>Lorem ipsum dolor sit</li>
                  <li>Cubitur sollicitudin fentum</li>
                  <li>Nullam interdum enim</li>
                  <li>Donec ultricies metus</li>
                  <li>Pellentesque eget nibh</li>
                </>
              }
            />
            <PackageInfo
              name="Gói khám 2"
              price="1.000.000"
              service={
                <>
                  <li>Lorem ipsum dolor sit</li>
                  <li>Cubitur sollicitudin fentum</li>
                  <li>Nullam interdum enim</li>
                  <li>Donec ultricies metus</li>
                  <li>Pellentesque eget nibh</li>
                </>
              }
            />
            <PackageInfo
              name="Gói khám 3"
              price="1.000.000"
              service={
                <>
                  <li>Lorem ipsum dolor sit</li>
                  <li>Cubitur sollicitudin fentum</li>
                  <li>Nullam interdum enim</li>
                  <li>Donec ultricies metus</li>
                  <li>Pellentesque eget nibh</li>
                </>
              }
            />
          </Slider>
          {/* <!-- End Single Table--> */}
        </div>
      </div>
    </section>
  </>
);

export const PackageInfo: React.FC<PackageProps> = ({
  name,
  price,
  service,
}) => (
  <div className="col-md-12 col-12 custom-slider">
    <div className="single-table">
      {/* <!-- Table Head --> */}
      <div className="table-head">
        <h4 className="title">{name}</h4>
        <div className="price">
          <p className="amount">
            {price}
            <span>vnđ</span>
          </p>
        </div>
      </div>
      {/* <!-- Table List --> */}
      <ul className="table-list">{service}</ul>
      <div className="table-bottom">
        <a className="btn" href="#">
          Đặt lịch
        </a>
      </div>
      {/* <!-- Table Bottom --> */}
    </div>
  </div>
);
const service = [{ name: "Nguyên", description: "Mô tả" },{ name: "Nguyên2", description: "Mô tả2" }];
export const Package: React.FC<PackageProps> = ({ name, price }) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div className="col-md-12 col-12">
      <div className="single-table package-list">
        <div className="image image-custom center-image">
          <img src="src/assets/img/package.png" alt="#" />
        </div>
        {/* <!-- Table Head --> */}
        <div className="table-head">
          <h4 className="title-package">{name}</h4>
          <div className="price">
            <p className="price">
              Giá tiền: {price}
              <span>vnđ</span>
            </p>
          </div>
          <div className="btn-detail">
            <a className="btn" onClick={() => setModalShow(true)}>
              Xem chi tiết
            </a>
            <Modals
              title="gói khám"
              obj={service}
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
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

export const PackageDetails = () => {};

export const PackageSelected: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState("");
  const [dataPackage] = useState<Option[]>([
    { value: "A", label: "Gói khám A" },
    { value: "B", label: "Gói khám B" },
    { value: "C", label: "Gói khám C" },
    { value: "D", label: "Gói khám D" },
    { value: "E", label: "Gói khám E" },
  ]);
  return (
    <SelectWithSearch
      label="Gói khám"
      options={dataPackage}
      value={selectedPackage}
      onSelectChange={setSelectedPackage}
      placeholder={""}
      style={0}
    />
  );
};
