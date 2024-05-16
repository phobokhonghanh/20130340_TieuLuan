import { useEffect, useState } from "react";
import Preloader from "../Component/Preloader";
import HeaderNav from "../Component/HeaderNav";
import CardInfo from "../Component/CardInfo";
import Footer from "../Component/Footer";
import { Slide } from "../Component/Slides";
import Pagination from "../Component/Pagination";
import { Doctor, DoctorInfo } from "../Component/Doctors";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/style.css";
import { DoctorEntity } from "../Models/Model";
import { API_ENDPOINTS } from "../apiConfig";
function ListDoctors() {
  const [listDoctor, setListDoctor] = useState<DoctorEntity[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorEntity>();

  const [currentPage, setCurrentPage] = useState<number>(1); // State để lưu trang hiện tại
  const [totalPages, setTotalPages] = useState<number>(1); // State để lưu tổng số trang

  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListDoctor = async (page: number) => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_ENDPOINTS.GET_DOCTOR_CALENDAR}?page=${page}`
        );
        const data = await response.json();
        const doctors = data.content;

        setListDoctor(doctors);
        if (doctors) {
          setSelectedDoctor(doctors[0]);
        }
        setCurrentPage(data.number + 1);
        setTotalPages(data.totalPages);
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchListDoctor(currentPage);
  }, [currentPage]);
  return (
    <>
      {/* <Preloader /> */}
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
                {/* <SelectWithSearch
                  label=""
                  options={listDoctor}
                  value={selectedDepartment}
                  style={3}
                  onSelectChange={setSelectedDepartment}
                  placeholder={"Chọn khoa"}
                /> */}
                <a href="#" className="btn">
                  Tìm kiếm
                </a>
              </div>
            }
          />
        </div>
      </section>
      <CardInfo />
      {isLoading && <div>Loading...</div>}
      {error && (
        <div
          style={{
            textAlign: "center",
            color: "rgb(116, 136, 151)",
            fontWeight: "bold",
            fontSize: "larger"
          }}
        >
          <i>&#9888;</i> Đang gặp sự cố kỹ thuật, xin vui lòng đợi trong giây
          lát !
        </div>
      )}
      <section className="package pricing-table">
        <div className="container">
          <div className="container-package">
            <div className="row-left">
              {listDoctor.map((doc) => (
                <div
                  key={doc.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedDoctor(doc)}
                >
                  <Doctor doctorEntity={doc} />
                </div>
              ))}
            </div>
            <div className="row-right">
              {selectedDoctor ? (
                <DoctorInfo doctorEntity={selectedDoctor} />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="row-bottom">
            <Pagination
              totalPage={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
export default ListDoctors;
