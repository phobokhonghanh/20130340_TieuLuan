import Preloader from "../Component/Preloader";
import HeaderNav from "../Component/HeaderNav";
import CardInfo from "../Component/CardInfo";
import Footer from "../Component/Footer";
import Slides from "../Component/Slides";
import Pagination from "../Component/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/style.css";
import { useEffect, useState } from "react";
import { ServiceEntity } from "../Models/Model";
import { API_ENDPOINTS } from "../apiConfig";
import { Service, ServiceInfo } from "../Component/Service";
function ListService() {
  const [listService, setListService] = useState<ServiceEntity[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceEntity>();

  const [currentPage, setCurrentPage] = useState<number>(1); // State để lưu trang hiện tại
  const [totalPages, setTotalPages] = useState<number>(1); // State để lưu tổng số trang

  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListService = async (page: number) => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_ENDPOINTS.GET_SERVICE_CALENDAR}?page=${page}`
        );
        const data = await response.json();
        const packages = data.content;
        setListService(packages);
        if (packages) {
          setSelectedService(packages[0]);
        }
        setCurrentPage(data.number + 1);
        setTotalPages(data.totalPages);
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchListService(currentPage);
  }, [currentPage]);
  return (
    <>
      <Preloader />
      <HeaderNav />
      <Slides />
      <CardInfo />
      {isLoading && <div>Loading...</div>}
      {error && (
        <div
          style={{
            textAlign: "center",
            color: "rgb(116, 136, 151)",
            fontWeight: "bold",
            fontSize: "larger",
          }}
        >
          <i>&#9888;</i> Đang gặp sự cố kỹ thuật, xin vui lòng đợi trong giây
          lát !
        </div>
      )}{" "}
      <section className="package pricing-table">
        <div className="container">
          <div className="container-package">
            <div className="row-left">
              {listService &&
                listService.map((ser) => (
                  <div
                    key={ser.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedService(ser)}
                  >
                    <Service serviceEnity={ser} />
                  </div>
                ))}
            </div>
            <div className="row-right">
              {selectedService && (
                <ServiceInfo serviceEnity={selectedService} />
              )}
            </div>
          </div>
          <div className="row-bottom">
            <Pagination
              totalPage={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />{" "}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
export default ListService;
