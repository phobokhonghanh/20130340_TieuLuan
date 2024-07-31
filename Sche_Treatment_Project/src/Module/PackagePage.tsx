import CardInfo from "../Component/CardInfo";
import Footer from "../Component/Footer";
import Slides from "../Component/Slides";
import { Package, PackageInfo } from "../Component/Package";
import PaginationCustom from "../Component/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/style.css";
import { useEffect, useState } from "react";
import { PackageEntity } from "../Models/Model";
import { API_ENDPOINTS } from "../apiConfig";
import { ErrorNotifi } from "../Component/Notification";
import "../assets/css/Filter.css";
import useDebounce from "../Utils/Debounce";

function ListPackage() {
  const [listPackage, setListPackage] = useState<PackageEntity[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<PackageEntity>();

  const [currentPage, setCurrentPage] = useState<number>(1); // State để lưu trang hiện tại
  const [totalPages, setTotalPages] = useState<number>(1); // State để lưu tổng số trang
  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search.trim(), 500);

  const [sort, setSort] = useState("asc");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchListPackage = async (page: number) => {
      try {
        window.scrollTo({ top: 900, behavior: "smooth" });
        const response = await fetch(
          `${API_ENDPOINTS.GET_PACKAGE_CALENDAR}?page=${page}&search=${searchDebounce}&sort=${sort}&filter=package_price`
        );
        const data = await response.json();
        const packages = data.content;
        setListPackage(packages);
        if (packages) {
          setSelectedPackage(packages[0]);
        }
        setCurrentPage(data.number + 1);
        setTotalPages(data.totalPages);
      } catch (e: any) {
        console.error(e);
        setError(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    fetchListPackage(currentPage);
  }, [currentPage, searchDebounce, sort]);
  return (
    <>
      {/* <HeaderNav /> */}
      <Slides />
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
              {listPackage.map((pack) => (
                <div
                  key={pack.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedPackage(pack)}
                >
                  <Package packageEntity={pack} />
                </div>
              ))}
            </div>
            <div className="row-right">
              {selectedPackage && (
                <PackageInfo packageEntity={selectedPackage} />
              )}
            </div>
          </div>
          <div className="row-bottom">
            <PaginationCustom
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
export default ListPackage;
