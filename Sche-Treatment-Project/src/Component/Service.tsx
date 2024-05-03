import { Link } from "react-router-dom";
import { ServiceEntity } from "../Models/Model";

interface ServiceProps {
  serviceEnity: ServiceEntity;
}
export const Service: React.FC<ServiceProps> = ({ serviceEnity }) => {
  return (
    <div className="col-md-12 col-12 " style={{ marginBottom: "15px" }}>
      <div className="single-table package-list">
        <div className="image image-custom center-image">
          <img src="src/assets/img/package.png" alt="#" />
        </div>
        <div className="table-head">
          <h4 className=" amount title-package price">
            {serviceEnity.serviceName}
          </h4>
          <div className="price" style={{ float: "left", padding: "15px" }}>
            <p className="title-package price">
              Giá:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(parseFloat(serviceEnity.servicePrice))}
            </p>
          </div>
          <div className="btn-detail">
            <a className="btn">Xem chi tiết</a>
          </div>
          <div className="btn-package">
            <Link className="btn" to="/appointment" state={{ serviceEnity }}>
              Đặt lịch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export const ServiceInfo: React.FC<ServiceProps> = ({ serviceEnity }) => (
  <div className="col-md-12 col-12">
    <div className="single-table">
      <div className="table-head">
        <h4 className=" amount title-package price">
          {serviceEnity.serviceName}
        </h4>
        <div className="price">
          <p className="title-package price">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(parseFloat(serviceEnity.servicePrice))}
          </p>
        </div>
      </div>
      <div style={{ textAlign: "left" }}>
        <p>
          <b>Khu vực: </b>
          {serviceEnity.clinicId &&
            serviceEnity.clinicId.medicalAreaId.areaName}
        </p>
        <p>
          <b>Phòng: </b>{" "}
          {serviceEnity.clinicId && serviceEnity.clinicId.clinicName}
        </p>
      </div>

      <div
        className="table-list"
        style={{ marginTop: "0px", overflowY: "auto", height: " 350px" }}
      >
        <b>Mô tả dịch vụ:</b>{" "}
        {serviceEnity.serviceDescription
          ? serviceEnity.serviceDescription
          : "Sẽ được giải thích khi đến cơ sở y tế."}
      </div>
      <div className="table-bottom">
        <Link className="btn" to="/appointment" state={{ serviceEnity }}>
          Đặt lịch
        </Link>
      </div>
    </div>
  </div>
);
