import "../assets/css/Package.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Col, Form } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";

import { API_ENDPOINTS } from "../apiConfig";
import { PackageEntity } from "../Models/Model";
import { formatPrice } from "../Utils/Utils";

export const PackageSlider = () => {
  const [listPackage, setListPackage] = useState<PackageEntity[]>([]);
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);
  const settings = {
    dots: true,
    infinite: listPackage.length < 3 ? false : true,
    slidesToShow: 3,
    slidesToScroll: 1,
    loop: true,
    autoplay: false,
    smartSpeed: 10000,
    autoplayTimeout: 10000,
    singleItem: true,
    autoplayHoverPause: true,
    items: 2,
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
  useEffect(() => {
    const fetchListPackage = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_ENDPOINTS.GET_PACKAGE_SLIDES);
        const data = (await response.json()) as PackageEntity[];
        setListPackage(data);
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchListPackage();
  }, []);
  return (
    <>
      <section className="pricing-table">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-about">
                <h2>Gói Khám Sức Khỏe</h2>
                <img src="src/assets/img/section-img.png" alt="#" />
                <p>
                  Chúng tôi cung cấp cho bạn các gói khám tốt nhất với giá cả
                  hợp lý
                </p>
                {isLoading && <div>Loading...</div>}
                {error && <div>Không có data</div>}{" "}
              </div>
            </div>
          </div>
          <div className="row">
            {/* <!-- Single Table --> */}
            <Slider {...settings} className="custom-slider">
              {listPackage.map((pack) => (
                  <PackageInfo packageEntity={pack} />
              ))}
            </Slider>
            {/* <!-- End Single Table--> */}
          </div>
        </div>
      </section>
    </>
  );
};
interface PackageProps {
  packageEntity: PackageEntity;
}
export const Package: React.FC<PackageProps> = ({ packageEntity }) => {
  return (
    <div className="col-md-12 col-12 " style={{ marginBottom: "15px" }}>
      <div className="single-table package-list">
        <div className="image image-custom center-image">
          <img src="src/assets/img/package.png" alt="#" />
        </div>
        {/* <!-- Table Head --> */}
        <div className="table-head">
          <h4 className=" amount title-package price">
            {packageEntity.packageName}
          </h4>
          <div className="price" style={{ float: "left", padding: "15px" }}>
            <p style={{ color: "black" }}>
              Giá:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(parseFloat(packageEntity.packagePrice))}
            </p>
          </div>
          <div className="btn-detail">
            <a className="btn">Xem chi tiết</a>
          </div>
          <div className="btn-package">
            <Link
              className="btn"
              to="/appointmentPackageForm"
              state={{ packageEntity }}
            >
              Đặt lịch
            </Link>
          </div>
        </div>
        {/* <!-- Table Bottom --> */}
      </div>
    </div>
  );
};
export const PackageInfo: React.FC<PackageProps> = ({ packageEntity }) => (
  <div className="col-md-12 col-12 custom-slider" key={packageEntity.id}>
    <div className="single-table">
      {/* <!-- Table Head --> */}
      <div className="table-head">
        <h4 className="amount title-package price">
          {packageEntity.packageName}
        </h4>
        <div className="price">
          <p style={{ color: "black" }}>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(parseFloat(packageEntity.packagePrice))}
          </p>
        </div>
      </div>
      {/* <!-- Table List --> */}
      <div style={{ textAlign: "left" }}>
        <p>
          <b>Khu vực: </b>
          {packageEntity.clinicId.medicalAreaId
            ? packageEntity.clinicId.medicalAreaId.areaName
            : ""}
        </p>
        <p>
          <b>Phòng: </b>{" "}
          {packageEntity.clinicId.clinicName
            ? packageEntity.clinicId.clinicName
            : ""}
        </p>
      </div>
      <div style={{ textAlign: "left" }}>
        <p>
          <b>Dịch vụ trong gói khám: </b>
        </p>
      </div>
      <ul
        className="table-list"
        style={{ marginTop: "0px", overflowY: "auto", height: " 250px" }}
      >
        {packageEntity.packageServices.length ? (
          packageEntity.packageServices.map((services) => (
            <li key={services.medicalService.id}>
              {services.medicalService.serviceName}
            </li>
          ))
        ) : (
          <li>Dịch vụ chuyên khoa</li>
        )}
      </ul>
      <div className="table-bottom">
        <Link
          className="btn"
          to="/appointmentPackageForm"
          state={{ packageEntity }}
        >
          Đặt lịch
        </Link>
      </div>
      {/* <!-- Table Bottom --> */}
    </div>
  </div>
);
interface PackageSelectedProps {
  data: PackageEntity[];
  packageSelected: PackageEntity;
  onPackageSelected: (selectedPackage: PackageEntity) => void;
}
export function PackageSelected({
  data,
  packageSelected,
  onPackageSelected,
}: PackageSelectedProps) {
  const [selectedPackage, setSelectedPackage] = useState(
    packageSelected.packageName
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectChange = (value: PackageEntity) => {
    setSelectedPackage(value.packageName);
    onPackageSelected(value);
    setShowDropdown(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelectedPackage("");
  };

  const filteredOptions = inputValue
    ? data.filter((option) =>
        option.packageName.toLowerCase().includes(inputValue.toLowerCase())
      )
    : data;
  return (
    <Col xs={0}>
      <Form.Group controlId={`formPackage`}>
        <Form.Label>Gói khám</Form.Label>
        <div className="custom-select-wrapper" ref={dropdownRef}>
          <input
            type="text"
            value={selectedPackage || inputValue}
            className="custom-select-input"
            placeholder={`Tìm kiếm gói khám...`}
            onFocus={() => setShowDropdown(true)}
            onChange={handleInputChange}
          />
          {showDropdown && (
            <div className="custom-select-dropdown">
              <ul>
                {filteredOptions.map((option) => (
                  <li
                    key={option.id}
                    onClick={() => handleSelectChange(option)}
                  >
                    {option.packageName} - {formatPrice(option.packagePrice)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Form.Group>
    </Col>
  );
}
