import "../assets/css/Modals.css";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { FC, useEffect, useState } from "react";
import { EvaluateDTO, ResultDTO } from "../Models/Model";
import {
  API_ENDPOINTS,
  createAppointmentResult,
  createEvaluate,
} from "../apiConfig";
import { ErrorNotifi, Notifi } from "./Notification";
import { v4 as uuidv4 } from "uuid";
import { checkRoleDoctor } from "../Authentication/Authentication";

interface ResultProps {
  appointmentId: string;
  doctorId: string;
  show: boolean;
  onHide: () => void;
  refeshDetails: () => void;
}
export const ModalResult: React.FC<ResultProps> = ({
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
                {checkRoleDoctor() ? (
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
                {checkRoleDoctor() ? (
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
                {checkRoleDoctor() ? (
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
                {checkRoleDoctor() ? (
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
interface ThankYouProps {
  show: boolean;
  onHide: () => void;
}
export const ModalThankYou: React.FC<ThankYouProps> = ({ show, onHide }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        style={{ padding: "0px " }}
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Mẹo nhỏ
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="grid-example"
          style={{ fontFamily: "Arial, sans-serif", fontSize: "16px" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Bạn sẽ được khám sớm hơn nếu như người khác hủy lịch. Vậy nên hãy
            đến sớm hơn 15 phút nhé!
          </Modal.Title>
        </Modal.Body>
      </Modal>
    </>
  );
};

