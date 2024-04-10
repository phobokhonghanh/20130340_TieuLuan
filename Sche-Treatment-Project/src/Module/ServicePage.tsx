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
function ListService() {
  return (
    <>
      <Preloader />
      <HeaderNav />
      <Slides />
      <CardInfo />
      <section className="package pricing-table">
        <div className="container">
          <div className="container-package">
            <div className="row-left">
              <Package name={"Dịch vụ xét nghiệm máu"} price={"1.000.000"} />
            </div>
            <div className="row-right">
              <PackageInfo
                name="Dịch vụ xét nghiệm máu"
                price="1.000.000"
                service={
                  <>
                    <h4>Mô tả Dịch vụ:</h4>
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Accusantium, autem, consequuntur corporis delectus dolore
                      doloremque earum eos expedita facere fugit harum impedit
                      inventore itaque libero magni maxime minima nam nemo nihil
                      numquam officia optio quaerat quasi quidem quisquam
                      recusandae repellendus repudiandae soluta tempora tenetur
                      totam unde ut voluptates.
                    </span>
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
export default ListService;
