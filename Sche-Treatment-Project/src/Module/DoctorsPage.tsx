import { useState } from "react";
import Preloader from "../Component/Preloader";
import HeaderNav from "../Component/HeaderNav";
import CardInfo from "../Component/CardInfo";
import Footer from "../Component/Footer";
import { Slide } from "../Component/Slides";
import Pagination from "../Component/Pagination";
import { Doctor, DoctorInfo } from "../Component/Doctors";
import { Option, SelectWithSearch } from "../Component/SelectWithSearch";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/style.css";
function ListDoctors() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [dataDepartments] = useState<Option[]>([
    { value: "dermatology", label: "Da liễu" },
    { value: "internal", label: "Nội khoa" },
    { value: "surgery", label: "Ngoại khoa" },
  ]);
  return (
    <>
      <Preloader />
      <HeaderNav />
      <section className="slider">
        <div className="hero-slider">
          <Slide
            backgroundImage="url('/src/assets/img/bg.png')"
            title="Bác Sĩ "
            subtitle="Là Người Bạn Có Thể Tin Tưởng!"
            children={
              <div className="button-div">
                <input
                  type="text"
                  className="search-input"
                  placeholder={`Tìm kiếm bác sĩ...`}
                />
                <SelectWithSearch
                  label=""
                  options={dataDepartments}
                  value={selectedDepartment}
                  style={3}
                  onSelectChange={setSelectedDepartment}
                  placeholder={"Chọn khoa"}
                />
                <a href="#" className="btn">
                  Tìm kiếm
                </a>
              </div>
            }
          />
        </div>
      </section>
      <CardInfo />
      <section className="package pricing-table">
        <div className="container">
          <div className="container-package">
            <div className="row-left">
              <Doctor
                hinhAnh="/src/assets/img/doctor.jpg"
                hocVi="Ts"
                hocHam="PGS"
                ten="Nguyễn Đăng Khoa"
                chuyenKhoa="Khoa Nội"
              />
            </div>
            <div className="row-right">
              <DoctorInfo
                hinhAnh="/src/assets/img/doctor.jpg"
                hocVi="Ts"
                hocHam="PGS"
                ten="Nguyễn Đăng Khoa"
                chuyenKhoa="Khoa Nội"
                time={
                  <>
                    <li>Lorem ipsum dolor sit</li>
                    <li>Cubitur sollicitudin fentum</li>
                    <li>Nullam interdum enim</li>
                    <li>Donec ultricies metus</li>
                    <li>Pellentesque eget nibh</li>
                  </>
                }
              />
            </div>
          </div>
          <div className="row-bottom">
            <Pagination totalItems={120} itemsPerPage={10} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
export default ListDoctors;
