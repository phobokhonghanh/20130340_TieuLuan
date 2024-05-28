import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";

import { Notifi } from "./Notification";
import { API_ENDPOINTS, createService } from "../apiConfig";
import { ClinicSelected } from "./Department";
import { Clinic, ServiceDTO, ServiceEntity } from "../Models/Model";

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
            <p style={{ color: "black" }}>
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
          <p style={{ color: "black" }}>
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
          {serviceEnity.clinic && serviceEnity.clinic.medicalAreaId.areaName}
        </p>
        <p>
          <b>Phòng: </b> {serviceEnity.clinic && serviceEnity.clinic.clinicName}
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
    </div>
  </div>
);
interface ModalServiceeProps {
  title: string;
  add: boolean;
  service: ServiceEntity | undefined;
  show: boolean;
  onHide: () => void;
  responseStatus: (status: number) => void;
}
export const ModalService: React.FC<ModalServiceeProps> = ({
  title,
  add,
  service,
  show,
  onHide,
  responseStatus,
}) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [showMess, setShowMess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [levelMessage, setLevelMessage] = useState<"danger" | "success">(
    "danger"
  );

  const serviceID = service ? service.id : uuidv4(); // id
  const [name, setName] = useState(service ? service.serviceName : ""); // name
  const [price, setPrice] = useState(service ? service.servicePrice : ""); // price
  const [description, setDescription] = useState(
    service ? service.serviceDescription : ""
  ); // description
  const [clinic, setClinic] = useState<Clinic | undefined>(service?.clinic); // clinic
  const [supportStatus, setSupportStatus] = useState(
    service ? service.supportStatusId.id : "S1"
  ); // status

  const [dataClinic, setDataClinic] = useState<Clinic[]>([]); // list clinic all

  const fetchClinic = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_ENDPOINTS.GET_CLINIC_ALL}`);
      const data = (await response.json()) as Clinic[];
      setDataClinic(data);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClinic();
  }, []);

  const handleNameChange = (e: { target: { name: any; value: any } }) => {
    const selected = e.target.value;
    setName(selected);
  }; // set name change
  const handlePriceChange = (e: { target: { name: any; value: any } }) => {
    let selected = e.target.value;
    selected = selected.replace(/[^0-9]/g, "");
    setPrice(selected);
  }; // set price change
  const handleClinicSelected = (selectedClinic: Clinic) => {
    setClinic(selectedClinic);
  }; // set clinic change
  const handleSupportChange = (e: { target: { name: any; value: any } }) => {
    const selected = e.target.value;
    setSupportStatus(selected);
  };
  const handleDescriptionChange = (e: {
    target: { name: any; value: any };
  }) => {
    const selected = e.target.value;
    setDescription(selected);
  };
  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    if (!clinic) {
      setLoading(false);
      return;
    }
    const formData: ServiceDTO = {
      id: serviceID,
      serviceName: name,
      servicePrice: price,
      serviceDescription: description,
      supportStatusId: supportStatus,
      clinic: clinic.id,
    };
    if (formData) {
      createService(formData)
        .then((response: any) => {
          if (response.status === 201) {
            setMessage("Dịch vụ đã được sửa");
            if (add) {
              setMessage("Dịch vụ đã được thêm");
            }
            setLevelMessage("success");
            setShowMess(true);
            onHide();
            responseStatus(response.status);
          }
        })
        .catch((error: any) => {
          if (error.status === 400) {
            setMessage("Dịch vụ đã tồn tại");
            setLevelMessage("danger");
            setShowMess(true);
          }
          console.error("Error:", error);
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <>
      {showMess && (
        <Notifi
          message={message}
          variant={levelMessage}
          onClose={() => setShowMess(false)}
        />
      )}
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        style={{ opacity: "1" }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="grid-example">
          <Form onSubmit={handleFormSubmit}>
            <Row style={{ textAlign: "left" }}>
              <Col xs={5}>
                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="name"
                    style={{ display: "block", marginBottom: "5px" }}
                  >
                    Tên dịch vụ<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                </div>
              </Col>
              <Col xs={5}>
                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="name"
                    style={{ display: "block", marginBottom: "5px" }}
                  >
                    Giá tiền <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="price"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    value={price}
                    onChange={handlePriceChange}
                    required
                  />
                </div>
              </Col>
              <Col xs={2}>
                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="gender"
                    style={{ display: "block", marginBottom: "5px" }}
                  >
                    Trạng thái
                  </label>
                  <select
                    name="supportStatus"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    value={supportStatus}
                    onChange={handleSupportChange}
                  >
                    <option value="S1">Mở</option>
                    <option value="S2">Khóa</option>
                  </select>
                </div>
              </Col>
            </Row>
            <Row style={{ textAlign: "left" }}>
              <Col xs={5}>
                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="name"
                    style={{ display: "block", marginBottom: "5px" }}
                  >
                    Khoa khám <span style={{ color: "red" }}>*</span>
                  </label>
                  <ClinicSelected
                    data={dataClinic}
                    onClinicSelected={handleClinicSelected}
                    clinicSelect={clinic}
                  />
                </div>
              </Col>
              <Col xs={7}>
                <div>
                  <label
                    htmlFor="name"
                    style={{ display: "block", marginBottom: "5px" }}
                  >
                    Mô tả dịch vụ <span style={{ color: "red" }}>*</span>
                  </label>
                  <Form.Control
                    rows={5}
                    as="textarea"
                    value={description}
                    placeholder="Mô tả dịch vụ"
                    onChange={handleDescriptionChange}
                  />
                </div>
              </Col>
            </Row>
            <div style={{ textAlign: "center" }}>
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Hoàn tất
              </button>
              <button
                type="button"
                className="btn btn-secondary ml-2"
                data-dismiss="modal"
                style={{
                  marginLeft: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#ccc",
                  color: "#333",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={onHide}
              >
                Đóng
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
