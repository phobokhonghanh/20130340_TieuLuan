import { useEffect, useState } from "react";
import CardInfo from "../Component/CardInfo";
import Footer from "../Component/Footer";
import { Slide } from "../Component/Slides";
import PaginationCustom from "../Component/Pagination";
import { Doctor, DoctorInfo } from "../Component/Doctors";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/style.css";
import { DoctorEntity } from "../Models/Model";
import { API_ENDPOINTS } from "../apiConfig";
import { ErrorNotifi } from "../Component/Notification";
import { Link } from "react-router-dom";
import "../assets/css/Filter.css";
import useDebounce from "../Utils/Debounce";

function ListDoctors() {
  const [listDoctor, setListDoctor] = useState<DoctorEntity[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorEntity>();

  const [currentPage, setCurrentPage] = useState<number>(1); // State để lưu trang hiện tại
  const [totalPages, setTotalPages] = useState<number>(1); // State để lưu tổng số trang

  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search.trim(), 500);

  const [sort, setSort] = useState("asc");

  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchListDoctor = async (page: number) => {
      window.scrollTo({ top: 900, behavior: "smooth" });
      try {
        const response = await fetch(
          `${API_ENDPOINTS.GET_DOCTOR_CALENDAR}?page=${page}&search=${searchDebounce}&sort=${sort}&filter=account_name`
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
        console.log(e);
        setError(true);
      }
    };
    fetchListDoctor(currentPage);
  }, [currentPage, searchDebounce, sort]);
  return (
    <>
      {/* <HeaderNav /> */}
      <section className="slider">
        <div className="hero-slider">
          <Slide
            backgroundImage="url('/img/bg.png')"
            title="Bác Sĩ "
            subtitle="Là Người Bạn Có Thể Tin Tưởng!"
            children={
              <div className="button-div">
                <Link to="/doctors" className="btn">
                  Tìm kiếm
                </Link>
              </div>
            }
          />
        </div>
      </section>
      <CardInfo />
      <ErrorNotifi error={error} />
      <section className="package pricing-table">
        <div className="container">
          <div className="filter-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Tìm kiếm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="asc">Giá từ thấp đến cao</option>
              <option value="desc">Giá từ cao đến thấp</option>
            </select>
          </div>
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
            <PaginationCustom
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
