import Preloader from "../Component/Preloader";
import HeaderNav from "../Component/HeaderNav";
import CardInfo from "../Component/CardInfo";
import Footer from "../Component/Footer";
import Slides from "../Component/Slides";
import { Package, PackageInfo } from "../Component/Package";
import Pagination from "../Component/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/style.css";
function ListPackage() {
  return (
    <>
      <Preloader />
      <HeaderNav />
      <Slides/>
      <CardInfo />
      <section className="package pricing-table">
        <div className="container">
          <div className="container-package">
            <div className="row-left">
              <Package
                name={"Gói Xét Nghiệm Cao Cấp Cho Nhân Viên Văn Phòng - Nữ"}
                price={"1.000.000"}
              />
            </div>
            <div className="row-right">
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
export default ListPackage;
