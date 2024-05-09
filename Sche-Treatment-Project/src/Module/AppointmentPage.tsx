import "../assets/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import Calendar, { TileArgs } from "react-calendar";
import { useEffect, useRef, useState } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import {
  AppointmentDTO,
  Area,
  CalendarModel,
  Clinic,
  PackageEntity,
  Support,
} from "../Models/Model";
import Header from "../Component/Header";
import { Notifi } from "../Component/Notification";
import { convertTime } from "../Component/AdminCalendar";
import { API_ENDPOINTS, createAppointment } from "../apiConfig";
import { ClinicSelected } from "../Component/Department";

export function formatDate(date: string) {
  return format(new Date(date), "dd/MM/yyyy");
}
interface Calendar {
  calendarDate: string;
}
export function isDateExpired(calendar: Calendar): boolean {
  const calendarDate = new Date(calendar.calendarDate);
  const now = new Date();
  const calendarDateString = calendarDate.toISOString().split("T")[0];
  const nowDateString = now.toISOString().split("T")[0];
  if (
    calendarDateString < nowDateString ||
    (calendarDateString === nowDateString && now.getHours() >= 17)
  ) {
    return true;
  }
  if (calendarDate === now && now.getHours() >= 17) {
    return true;
  }

  return false;
}
const AppointmentForm = () => {
  const { state } = useLocation();
  // const { packageState } = state;
  const packageState: PackageEntity = state?.packageState;

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("0");

  const [areas, setArea] = useState<Area[]>([]);
  const [areaSelected, setAreaSelected] = useState<Area>();

  const [isUsingBHYT, setIsUsingBHYT] = useState(false);
  const [BHYTNumber, setBHYTNumber] = useState("");

  const [clinic, setClinic] = useState<Clinic>();
  const [calendarModel, setCalendar] = useState<CalendarModel | null>(null);
  const [time, setTime] = useState<string>();

  const [symptomDescription, setSymptomDescription] = useState<string>("");

  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [levelMessage, setLevelMessage] = useState<"danger" | "success">(
    "danger"
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [show]);

  useEffect(() => {
    const messageFromStorage = localStorage.getItem("message");
    if (messageFromStorage !== null) {
      const message = JSON.parse(messageFromStorage);
      setMessage(message.message);
      setLevelMessage(message.level);
      setShow(message.show);
    }
    localStorage.removeItem("message");
  }, []);

  useEffect(() => {
    const fetchArea = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_ENDPOINTS.GET_AREA_ALL);
        const data = (await response.json()) as Area[];
        setArea(data);
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchArea();
  }, []);

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!calendarModel) {
      setMessage(
        "Không có lịch khám, vui lòng chọn lịch khám có hiển thị ca trực của bác sĩ !"
      );
      setLevelMessage("danger");
      setShow(true);
      return;
    }
    if (!time) {
      setMessage(
        "Vui lòng chọn thời gian khám bệnh trong ca trực của bác sĩ !"
      );
      setLevelMessage("danger");
      setShow(true);
      return;
    }
    const appointment: AppointmentDTO = {
      id: uuidv4(),
      appointmentFullname: fullName,
      appointmentPhone: phoneNumber,
      appointmentGender: gender,
      appointmentBhyt: BHYTNumber,
      appointmentSymptom: symptomDescription,
      accountId: "ea283c62-f825-11ee-87e1-847beb19aaf6",
      packageId: packageState.id,
      calendarId: calendarModel.id,
      supportTimeId: time,
      supportStatusId: "S1",
    };

    if (appointment) {
      createAppointment(appointment)
        .then((response: any) => {
          if (response.status === 201) {
            setMessage("Đặt lịch thành công!");
            setLevelMessage("success");
            setShow(true);
            const timer = setTimeout(() => {
              setShow(false);
              window.location.href = "/history";
            }, 3000);
            return () => clearTimeout(timer);
          } else {
            setMessage("Đã có người đặt lịch!");
            setLevelMessage("danger");
            setShow(true);
          }
        })
        .catch((error: any) => {
          // Xử lý lỗi khi request không thành công
          console.error("Error:", error);
          setMessage("Đã có người đặt lịch!");
          setLevelMessage("danger");
          setShow(true);
        });
    }
  };

  const handleBHYTCheckboxChange = () => {
    setIsUsingBHYT(!isUsingBHYT);
  };

  const handleAreaChange: React.ChangeEventHandler<HTMLSelectElement> = async (
    e
  ) => {
    const selectedAreaId = e.target.value;
    const selectedArea = areas.find((area) => area.id === selectedAreaId);
    if (selectedArea) {
      setAreaSelected(selectedArea);
    }
  };

  const handleDivClick = (value: CalendarModel) => {
    setCalendar(value);
    setShowModal(true);
  };

  const infoTime = ({ date, view }: TileArgs) => {
    const now = new Date();
    const nowDateString = format(now, "yyyy-MM-dd");

    const dateCalendar = format(date, "yyyy-MM-dd");
    const convertedData = convertTime(clinic ? clinic.calendars : []);
    if (dateCalendar >= nowDateString) {
      if (convertedData.has(dateCalendar)) {
        const caInfo = convertedData.get(dateCalendar);
        if (caInfo) {
          return (
            <div
              className={`${
                dateCalendar === nowDateString
                  ? "react-calendar__tile--now"
                  : ""
              }`}
            >
              {Array.from(caInfo.entries()).map(([key, value]) => (
                <div key={key}>
                  <b>{key}:</b>{" "}
                  <span style={{ fontWeight: "600", color: "green" }}>
                    {value.map((calendar) => (
                      <div
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "lightGray")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "")
                        }
                        style={{
                          cursor: isDateExpired(calendar)
                            ? "not-allowed"
                            : "pointer",
                          borderRadius: "1px",
                        }}
                        key={calendar.id}
                        onClick={() =>
                          isDateExpired(calendar)
                            ? null
                            : handleDivClick(calendar)
                        }
                      >
                        {calendar.doctor.accountName}
                      </div>
                    ))}{" "}
                  </span>
                </div>
              ))}
            </div>
          );
        }
      }
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Row className="justify-content-center m-25">
          <Col md={8} className="width">
            <h2 className="text-center mb-4">Đăng ký khám bệnh</h2>
            {show && (
              <Notifi
                message={message}
                variant={levelMessage}
                onClose={() => setShow(false)}
              />
            )}
            <Form onSubmit={handleFormSubmit}>
              <Row>
                <Col xs={4}>
                  <Form.Group controlId="formFullName">
                    <Form.Label>
                      <b>Họ và tên</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Họ và tên"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group controlId="formPhoneNumber">
                    <Form.Label>
                      <b>Số điện thoại</b>
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      pattern="[0-9]*"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Số điện thoại"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={2}>
                  <Form.Group controlId="formGender">
                    <Form.Label>
                      <b>Giới tính</b>
                    </Form.Label>
                    <Row>
                      <Col>
                        <Form.Check
                          type="radio"
                          label="Nam"
                          name="gender"
                          id="male"
                          checked={gender === "0"}
                          onChange={() => setGender("0")}
                        />
                      </Col>
                      <Col>
                        <Form.Check
                          type="radio"
                          label="Nữ"
                          name="gender"
                          id="female"
                          checked={gender === "1"}
                          onChange={() => setGender("1")}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                {" "}
                <Col xs={4}>
                  <Form.Group controlId="formClinic">
                    <Form.Label>
                      <b>Chọn khu khám bệnh</b>
                    </Form.Label>
                    <select
                      className="custom-select-input"
                      value={areaSelected ? areaSelected.id : ""}
                      onChange={handleAreaChange}
                      required
                    >
                      {isLoading && <option>Loading...</option>}
                      {error && <option>Không có data</option>}
                      <option value="">-- Chọn khu khám --</option>
                      {areas.map((area) => (
                        <option key={area.id} value={area.id}>
                          {area.areaName}
                        </option>
                      ))}
                    </select>
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Label>
                    <b>Khoa khám</b>
                  </Form.Label>
                  <ClinicSelected
                    clinicSelect={clinic}
                    data={areaSelected ? areaSelected.clinics : []}
                    onClinicSelected={(selectedClinic) =>
                      setClinic(selectedClinic)
                    }
                  />
                </Col>
                <Col xs={4}>
                  <Form.Label>
                    <b>Gói khám</b>
                  </Form.Label>
                  <div className="custom-select-wrapper">
                    <input
                      type="text"
                      value={
                        packageState.packageName === null
                          ? ""
                          : packageState.packageName
                      }
                      className="custom-select-input"
                      disabled
                      style={{ cursor: "default" }}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col style={{ margin: "5px" }}>
                  <i
                    className="far fa-question-circle"
                    style={{ color: "blue", fontSize: "1em", padding: "3px" }}
                  ></i>
                  <span style={{ color: "blue", fontSize: "0.95em" }}>
                    Hướng dẫn:{" "}
                  </span>
                  <span style={{ fontStyle: "italic", fontSize: "0.95em" }}>
                    Trong phần "Khoa Khám", hãy chọn "Phòng tiếp nhận gói khám
                    bệnh". Điều này giúp chúng tôi chỉ định cho bạn phòng khám
                    thích hợp khi bạn đến cơ sở y tế.
                  </span>
                </Col>
              </Row>
              {areaSelected?.id === "156f8735-f826-11ee-87e1-847beb19aaf6" && (
                <Form.Group controlId="formBHYT">
                  <Form.Check
                    type="checkbox"
                    label="Sử dụng BHYT"
                    checked={isUsingBHYT}
                    onChange={handleBHYTCheckboxChange}
                  />
                  {isUsingBHYT && (
                    <Form.Control
                      type="text"
                      placeholder="Nhập số BHYT"
                      value={BHYTNumber}
                      onChange={(e) => setBHYTNumber(e.target.value)}
                      required
                    />
                  )}
                </Form.Group>
              )}
              {/* <Department
                dataListClinic={areaSelected ? areaSelected.clinics : []}
                onClinicSelected={(selectedClinic) => setClinic(selectedClinic)}
                onDoctorSelected={(selectedCalendar) =>
                  setCalendar(selectedCalendar)
                }
              /> */}
              <Row>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>
                    <b>Mô tả triệu chứng bệnh</b>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={symptomDescription}
                    onChange={(e) => setSymptomDescription(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Form.Group controlId="exampleForm.ControlTime">
                  <Form.Label>
                    <b>Lịch khám bệnh</b>
                    <Col style={{ marginLeft: "5px" }}>
                      <i
                        className="far fa-question-circle"
                        style={{
                          color: "blue",
                          fontSize: "1em",
                          padding: "3px",
                        }}
                      ></i>
                      <span style={{ color: "blue", fontSize: "0.95em" }}>
                        Hướng dẫn:{" "}
                      </span>
                      <span style={{ fontStyle: "italic", fontSize: "0.95em" }}>
                        Hãy chọn Bác Sĩ đang trực trong ngày bạn muốn đến khám.
                        Khi bạn chọn xong Bác Sĩ, bạn sẽ thấy thời gian mà Bác
                        Sĩ đó có thể tiếp nhận bạn. Sau khi chọn thời gian phù
                        hợp, nhấn nút "Đăng ký" để hoàn tất việc đăng ký khám
                        bệnh.
                      </span>
                    </Col>
                  </Form.Label>
                  <Calendar
                    tileContent={infoTime}
                    // onChange={handleDateChange}
                  />
                  <TimeTable
                    calendar={calendarModel}
                    title={
                      calendarModel
                        ? formatDate(calendarModel.calendarDate)
                        : "Vui lòng chọn bác sĩ khám bệnh"
                    }
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    timeChoose={(support) => setTime(support)}
                  />
                </Form.Group>
              </Row>
              <div className="text-center" style={{ marginTop: "15px" }}>
                <Button variant="primary" type="submit">
                  Đăng ký
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default AppointmentForm;

interface Props {
  calendar: CalendarModel | null;
  title: string;
  show: boolean;
  onHide: () => void;
  timeChoose: (support: string) => void;
}

export const TimeTable: React.FC<Props> = ({
  calendar,
  title,
  show,
  onHide,
  timeChoose,
}) => {
  const [time, setSelectedTime] = useState<Support[]>([]);
  const [selectedValues, setSelectedValues] = useState<string>("");
  const [error, setError] = useState();
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = async (
    e
  ) => {
    setSelectedValues(e.target.value);
  };
  useEffect(() => {
    if (selectedValues) {
      timeChoose(selectedValues);
    }
  }, [selectedValues]);

  useEffect(() => {
    const fetchAppointmentByCalendarId = async (calendarId: string) => {
      try {
        const response = await fetch(
          API_ENDPOINTS.GET_SUPPORT_ALL_TIME_APPOINTMENT(calendarId)
        );
        const data = await response.json();
        setSelectedTime(data);
      } catch (e: any) {
        setError(e);
      }
    };
    if (calendar) {
      fetchAppointmentByCalendarId(calendar.id);
    }
  }, [calendar]);

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        style={{ opacity: "1" }}
        className="modalShow modalShowDoctor"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="grid-example" style={{ width: "500px" }}>
          <Form>
            <Row style={{ textAlign: "left" }}>
              <Col className="col-xs-6">
                <Form.Group controlId="form">
                  <div className="custom-select-wrapper">
                    <select
                      className="custom-select-input"
                      value={selectedValues}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Chọn thời gian --</option>
                      {time.map((support) => (
                        <option key={support.id} value={support.id}>
                          {support.supportValue}
                        </option>
                      ))}
                    </select>
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

interface ChooseSupportProps {
  dataSelected: Support | null;
  data: Support[];
  onSupportSelect: (support: Support) => void;
}

export const ChooseSupport: React.FC<ChooseSupportProps> = ({
  data,
  dataSelected,
  onSupportSelect,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValues, setSelectedValues] = useState<Support | null>(
    dataSelected
  );
  const [inputValue, setInputValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectChange = (selectedOption: Support) => {
    setSelectedValues(selectedOption);
    onSupportSelect(selectedOption);
    setShowDropdown(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const filter = inputValue
    ? data?.filter((support) =>
        support.supportValue.toLowerCase().includes(inputValue.toLowerCase())
      )
    : data;

  return (
    <Col>
      <Form.Group controlId="form">
        <div className="custom-select-wrapper" ref={dropdownRef}>
          <input
            type="text"
            value={selectedValues?.supportValue || inputValue}
            className="custom-select-input"
            placeholder={`Chọn thời gian`}
            onFocus={() => setShowDropdown(true)}
            onChange={handleInputChange}
          />
          {showDropdown && (
            <div className="custom-select-dropdown">
              <ul>
                {filter?.map((support) => (
                  <li
                    key={support.id}
                    onClick={() => handleSelectChange(support)}
                  >
                    {support.supportValue}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Form.Group>
    </Col>
  );
};
