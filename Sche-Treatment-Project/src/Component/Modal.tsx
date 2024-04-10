import "../assets/css/Modals.css";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Dialog } from "./AdminDialog";
import { ChooseDoctor, ChooseServices } from "./SelectWithSearch";
import Calendar, { TileArgs } from "react-calendar";
import { CalendarModel, Timetables } from "../Models/Model";
import { format } from "date-fns";

interface Props {
  title: string;
  obj?: any;
  show: boolean;
  onHide?: () => void;
  handleCloseModal?: () => void;
}

interface InterfaceProps {
  title: string;
  isCreate: boolean;
  obj?: any;
  isPackage?: boolean;
}
type Service = {
  id: string;
  name: string;
  description: string;
  price: string;
  status: string;
};
const generateMockDataService = (length: number): Service[] => {
  const mockData: Service[] = [];
  for (let i = 1; i <= length; i++) {
    mockData.push({
      id: `ServiceID${i}`,
      name: `Service Number ${i}`,
      description: `Mô tả dịch vụ`,
      price: `1000$`,
      status: i % 2 === 0 ? "0" : "1",
    } as Service);
  }
  return mockData;
};
export const ModalInterface = (props: InterfaceProps) => {
  const [showDialog, setshowDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: props.obj?.name,
    description: props.obj?.description,
    price: props.obj?.price,
    status: props.obj?.status || "0",
    listServices: props.obj?.listServices || [],
  });
  // Hàm xử lý khi người dùng thay đổi thông tin
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setshowDialog(false);
  };

  // Hàm xử lý khi người dùng submit form
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setshowDialog(true);
    // Thực hiện gửi dữ liệu đã cập nhật lên server
    props.isCreate &&
      setFormData({
        name: "",
        description: "",
        price: "",
        status: "0",
        listServices: [],
      });
    // Gọi hàm cập nhật thông tin người dùng ở đây
  };
  return (
    <div
      className="modal-dialog"
      role="document"
      style={{ maxWidth: "500px", margin: "auto" }}
    >
      <div className="modal-content" style={{ borderRadius: "10px" }}>
        <div
          className="modal-header"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 15px",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true" style={{ color: "#fff" }}>
              &times;
            </span>
          </button>
          {props.isCreate ? (
            <h4>Thêm {props.title}</h4>
          ) : (
            <h4>Cập nhật {props.title}</h4>
          )}
          {showDialog && <Dialog />}
        </div>
        <div className="modal-body" style={{ padding: "20px" }}>
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="action" value="add" />
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="name"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Tên <span style={{ color: "red" }}>*</span>
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
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            {props.title !== "phòng khám" && (
              <>
                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="name"
                    style={{ display: "block", marginBottom: "5px" }}
                  >
                    Mô tả <span style={{ color: "red" }}>*</span>
                  </label>
                  <textarea
                    name="description"
                    rows={5}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="price"
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
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            {props.isPackage && (
              <div>
                <ChooseServices
                  dataSelected={formData.listServices}
                  data={generateMockDataService(7)}
                />
              </div>
            )}

            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="gender"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Trạng thái
              </label>
              <select
                name="status"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                value={formData.status === null ? "0" : formData.status}
                onChange={handleChange}
              >
                <option value="0">Mở</option>
                <option value="1">Tắt</option>
              </select>
            </div>
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
              >
                Đóng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const ModalAddAccount = (props: InterfaceProps) => {
  const [showDialog, setshowDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: props.obj ? props.obj.name : "",
    phone: props.obj ? props.obj.phone : "",
    gender: props.obj ? props.obj.gender || "0" : "0",
    role: props.obj ? props.obj.role || "0" : "0",
  });
  // Hàm xử lý khi người dùng thay đổi thông tin
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setshowDialog(false);
  };

  // Hàm xử lý khi người dùng submit form
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setshowDialog(true);
    // Thực hiện gửi dữ liệu đã cập nhật lên server
    props.isCreate &&
      setFormData({
        name: "",
        phone: "",
        gender: "0",
        role: "0",
      });
    // Gọi hàm cập nhật thông tin người dùng ở đây
  };
  return (
    <div
      className="modal-dialog"
      role="document"
      style={{ maxWidth: "500px", margin: "auto" }}
    >
      <div className="modal-content" style={{ borderRadius: "10px" }}>
        <div
          className="modal-header"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 15px",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true" style={{ color: "#fff" }}>
              &times;
            </span>
          </button>
          <h4 className="">{props.title}</h4>
          {showDialog && <Dialog />}
        </div>
        <div className="modal-body" style={{ padding: "20px" }}>
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="action" value="add" />
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="phone"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Số điện thoại <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="phone"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            {props.isCreate && (
              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="password"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Mật khẩu <span style={{ color: "red" }}>*</span>
                </label>

                <input
                  type="password"
                  name="password"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            )}
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="name"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Họ tên <span style={{ color: "red" }}>*</span>
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
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="gender"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Giới tính
              </label>
              <select
                name="gender"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                value={formData.gender === null ? "0" : formData.gender}
                onChange={handleChange}
              >
                <option value="0">Nam</option>
                <option value="1">Nữ</option>
              </select>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="level"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Chức vụ
              </label>
              <select
                name="level"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                value={formData.role}
                onChange={handleChange}
              >
                <option value="0">Admin</option>
                <option value="1">Quản lý</option>
                <option value="2">Bác sĩ</option>
                <option value="3">Bệnh nhân</option>
              </select>
            </div>
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
              >
                Đóng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export const ModalResult = (props: Props) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Kết quả</Modal.Title>
        </Modal.Header>
        <Modal.Body className="grid-example">
          <Container>
            <div>
              <Row>
                <b>Khoa Nội</b> <span>Bác sĩ Dương</span>
                <Col>
                  <Button>Đánh giá</Button>
                </Col>
              </Row>
              <Row>Triệu chứng lâm sàng:</Row>
              <Row>Chẩn đoán:</Row>
              <Row>Ghi chú:</Row>
            </div>
            <Row>
              <b>Khoa Nội</b> <span>Bác sĩ Dương</span>
              <Col>
                <Button onClick={() => setModalShow(true)}>Đánh giá</Button>
              </Col>
            </Row>
            <Row>Triệu chứng lâm sàng:</Row>
            <Row>Chẩn đoán:</Row>
            <Row>Ghi chú:</Row>
          </Container>
        </Modal.Body>
      </Modal>
      <ModalComment
        title=""
        obj={props.obj}
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleCloseModal={() => setModalShow(false)}
      />
    </>
  );
};

export const ModalComment = (props: Props) => {
  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        style={{ padding: "0px " }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Đánh giá</Modal.Title>
        </Modal.Header>
        <Modal.Body className="grid-example">
          <Container>
            <Form>
              <Row>
                <b>Khoa Nội</b> <span>Bác sĩ Dương</span>
              </Row>
              <Row>
                <textarea
                  placeholder="Đánh giá bác sĩ"
                  cols={30}
                  rows={5}
                ></textarea>
              </Row>
              <Row>
                <Col>
                  <Button onClick={props.handleCloseModal}>Hoàn tất</Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};
function Modals(props: Props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Chi tiết {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col xs={1} md={1} className="p-0">
              STT
            </Col>
            <Col xs={6} md={6}>
              Dịch vụ
            </Col>
            <Col xs={5} md={5}>
              Mô tả dịch vụ
            </Col>
          </Row>
          {props.obj.map((prop: any, index: any) => (
            <Row>
              <Col xs={1} md={1}>
                {++index}
              </Col>
              <Col xs={6} md={6}>
                {prop.name}
              </Col>
              <Col xs={5} md={5}>
                {prop.description}
              </Col>
            </Row>
          ))}
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default Modals;
