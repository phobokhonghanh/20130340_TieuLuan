import "../assets/css/Modals.css";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { FC, useEffect, useState } from "react";
import { Dialog } from "./AdminDialog";
import { ChooseDoctor, ChooseServices } from "./SelectWithSearch";
import { EvaluateDTO, ResultDTO } from "../Models/Model";
import {
  API_ENDPOINTS,
  createAppointmentResult,
  createEvaluate,
} from "../apiConfig";
import { ErrorNotifi, Notifi } from "./Notification";
import { v4 as uuidv4 } from "uuid";

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
            <input
              className="custom-select-input"
              type="hidden"
              name="action"
              value="add"
            />
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="name"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Tên <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="custom-select-input"
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
                    className="custom-select-input"
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
            {/* {props.isPackage && (
              <div>
                <ChooseServices
                  dataSelected={formData.listServices}
                  data={formData.listServices}
                />
              </div>
            )} */}

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
            <input
              className="custom-select-input"
              type="hidden"
              name="action"
              value="add"
            />
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="phone"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Số điện thoại <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="custom-select-input"
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
                  className="custom-select-input"
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
                className="custom-select-input"
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
interface ResultProps {
  role: string;
  appointmentId: string;
  doctorId: string;
  show: boolean;
  onHide: () => void;
  refeshDetails: () => void;
}
export const ModalResult: React.FC<ResultProps> = ({
  role,
  appointmentId,
  doctorId,
  show,
  onHide,
  refeshDetails,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showMess, setShowMess] = useState(false);
  const [message, setMessage] = useState("");
  const [levelMessage, setLevelMessage] = useState<"danger" | "success">(
    "danger"
  );

  const [result, setResult] = useState<ResultDTO>();
  const [resultSymptom, setResultSymptom] = useState(
    result ? result.resultSymptom : ""
  );
  const [resultDiagnostic, setResultDiagnostic] = useState(
    result ? result.resultDiagnostic : ""
  );
  const [resultNote, setResultNote] = useState(result ? result.resultNote : "");

  useEffect(() => {
    // Kiểm tra xem result có giá trị không trước khi cập nhật các state phụ thuộc
    if (result) {
      setResultSymptom(result.resultSymptom);
      setResultDiagnostic(result.resultDiagnostic);
      setResultNote(result.resultNote);
    }
  }, [result]);

  const fetchResult = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_ENDPOINTS.GET_RESULT_APPOINTMENT(appointmentId)}`
      );
      if (response.status === 204) {
        return;
      }
      const data = await response.json();
      setResult(data);
    } catch (e: any) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResult();
  }, [appointmentId]);

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    switch (name) {
      case "resultSymptom":
        setResultSymptom(value);
        break;

      case "resultDiagnostic":
        setResultDiagnostic(value);
        break;

      case "resultNote":
        setResultNote(value);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMess(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [showMess]);

  const handleResultSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const resultSubmit: ResultDTO = {
      id: result ? result.id : uuidv4(),
      resultSymptom: resultSymptom,
      resultDiagnostic: resultDiagnostic,
      resultNote: resultNote,
      appointmentId: appointmentId,
    };
    if (resultSubmit) {
      createAppointmentResult(resultSubmit).then((response: any) => {
        if (response.status === 201) {
          onHide();
          refeshDetails();
        } else {
          setMessage("Gửi kết quả không thành công!");
          setLevelMessage("danger");
          setShowMess(true);
        }
      });
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Kết quả</Modal.Title>
          {isLoading && <div> Loading...</div>}
          {showMess && (
            <Notifi
              message={message}
              variant={levelMessage}
              onClose={() => setShowMess(false)}
            />
          )}
          <ErrorNotifi error={error} />
        </Modal.Header>
        <Modal.Body className="grid-example">
          <Container>
            <Form onSubmit={handleResultSubmit}>
              <Row style={{ textAlign: "left" }}>
                Triệu chứng:{" "}
                {role === "ADMIN" ? (
                  <input
                    className="custom-select-input"
                    type="text"
                    required
                    onChange={handleInputChange}
                    value={resultSymptom}
                    name="resultSymptom"
                  />
                ) : (
                  resultSymptom
                )}
              </Row>
              <Row style={{ textAlign: "left" }}>
                Chẩn đoán:{" "}
                {role === "ADMIN" ? (
                  <input
                    className="custom-select-input"
                    type="text"
                    onChange={handleInputChange}
                    value={resultDiagnostic}
                    name="resultDiagnostic"
                  />
                ) : (
                  resultDiagnostic
                )}
              </Row>
              <Row style={{ textAlign: "left" }}>
                Ghi chú:{" "}
                {role === "ADMIN" ? (
                  <input
                    className="custom-select-input"
                    type="text"
                    onChange={handleInputChange}
                    value={resultNote}
                    name="resultNote"
                  />
                ) : (
                  resultNote
                )}
              </Row>
              <Row>
                {role === "ADMIN" ? (
                  <Col>
                    <Button type="submit">Gửi kết quả</Button>
                  </Col>
                ) : (
                  <Col>
                    <Button onClick={() => setModalShow(true)}>Đánh giá</Button>
                  </Col>
                )}
              </Row>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
      {modalShow && (
        <ModalComment
          doctorId={doctorId}
          appointmentId={appointmentId}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )}
    </>
  );
};
interface CommentProps {
  doctorId: string;
  appointmentId: string;
  show: boolean;
  onHide: () => void;
}
export const ModalComment: React.FC<CommentProps> = ({
  doctorId,
  appointmentId,
  show,
  onHide,
}) => {
  const [evaluate, setEvaluate] = useState<EvaluateDTO>();
  const [evaluateContent, setEvaluateContent] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showMess, setShowMess] = useState(false);
  const [message, setMessage] = useState("");
  const [levelMessage, setLevelMessage] = useState<"danger" | "success">(
    "danger"
  );

  useEffect(() => {
    // Kiểm tra xem result có giá trị không trước khi cập nhật các state phụ thuộc
    if (evaluate) {
      setEvaluateContent(evaluate.evaluateContent);
    }
  }, [evaluate]);
  const fetchEvaluate = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_ENDPOINTS.GET_EVALUATE_APPOINTMENT(appointmentId)}`
      );
      if (response.status === 204) {
        return;
      }
      const data = await response.json();
      setEvaluate(data);
    } catch (e: any) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvaluate();
  }, [appointmentId]);

  const handleChange = (e: { target: { value: any } }) => {
    setEvaluateContent(e.target.value);
  };
  const handleEvaluateSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const evaluateDTO: EvaluateDTO = {
      id: evaluate ? evaluate.id : uuidv4(),
      evaluateContent: evaluateContent,
      doctorId: doctorId,
      appointmentId: appointmentId,
      createAt: "",
      updateAt: "",
    };
    if (evaluateDTO) {
      createEvaluate(evaluateDTO).then((response: any) => {
        if (response.status === 201) {
          onHide();
        } else {
          setMessage("Không thể đánh giá!");
          setLevelMessage("danger");
          setShowMess(true);
        }
      });
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        style={{ padding: "0px " }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Đánh giá</Modal.Title>
        </Modal.Header>
        {isLoading && <div> Loading...</div>}
        {showMess && (
          <Notifi
            message={message}
            variant={levelMessage}
            onClose={() => setShowMess(false)}
          />
        )}
        <ErrorNotifi error={error} />
        <Modal.Body className="grid-example">
          <Container>
            <Form onSubmit={handleEvaluateSubmit}>
              <Row>
                <textarea
                  placeholder="Đánh giá bác sĩ"
                  cols={30}
                  rows={5}
                  value={evaluateContent}
                  onChange={handleChange}
                  required
                />
              </Row>
              <Row>
                <Col>
                  <Button type="submit">Hoàn tất</Button>
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
