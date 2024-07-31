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
  Clinic,
  PackageEntity,
  Support,
} from "../Models/Model";
import { ErrorNotifi, Notifi } from "../Component/Notification";
import { convertTime } from "../Component/AdminCalendar";

import { API_ENDPOINTS, createAppointment } from "../apiConfig";
import { ClinicSelected } from "../Component/Department";
import { getIdAccount, headerAuth } from "../Authentication/Authentication";
import Preloader from "../Component/Preloader";
import { formatDate } from "../Utils/Utils";
import { CalendarResponse } from "../Models/Calendars/CalendarResponse";

const AppointmentDoctor = () => {
  const { state } = useLocation();
  const { doctorState } = state;
  const account = getIdAccount();

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("0");

  const [areas, setArea] = useState<Area[]>([]);
  const [areaSelected, setAreaSelected] = useState<Area>();

  const [isUsingBHYT, setIsUsingBHYT] = useState(false);
  const [BHYTNumber, setBHYTNumber] = useState("");

  const [clinic, setClinic] = useState<Clinic>();
  const [listCalendar, setListCanlendar] = useState<CalendarResponse[]>([]);

  const [calendarModel, setCalendar] = useState<CalendarResponse | null>(null);
  const [time, setTime] = useState<string>();

  const [symptomDescription, setSymptomDescription] = useState<string>("");

  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [levelMessage, setLevelMessage] = useState<"danger" | "success">(
    "danger"
  );
  const [packageEntity, setPackage] = useState<PackageEntity>();

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.GET_PACKAGE_DEFAULT);
        const data = await response.json();
        setPackage(data);
      } catch (e: any) {
        console.error(e);
        setError(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    fetchPackage();
  }, []);
  useEffect(() => {
    const fetchArea = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.GET_AREA_ALL);
        const data = (await response.json()) as Area[];
        setArea(data);
      } catch (e: any) {
        console.error(e);
        setError(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    fetchArea();
  }, []);
  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        if (clinic) {
          const response = await fetch(
            API_ENDPOINTS.GET_CALENDAR_CLINIC(clinic.id)
          );
          const data = await response.json();
          setListCanlendar(data);
        }
      } catch (e: any) {
        console.error(e);
        setError(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    fetchCalendar();
  }, [clinic]);
  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    if (!calendarModel) {
      setMessage(
        "Không có lịch khám, vui lòng chọn lịch khám có hiển thị ca trực của bác sĩ !"
      );
      setLevelMessage("danger");
      setShow(true);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });

      return;
    }
    if (!time) {
      setMessage(
        "Vui lòng chọn thời gian khám bệnh trong ca trực của bác sĩ !"
      );
      setLevelMessage("danger");
      setShow(true);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });

      return;
    }
    const appointment: AppointmentDTO = {
      id: uuidv4(),
      appointmentFullname: fullName,
      appointmentPhone: phoneNumber,
      appointmentGender: gender,
      appointmentBhyt: BHYTNumber,
      appointmentSymptom: symptomDescription,
      accountId: account,
      packageId: packageEntity ? packageEntity.id : "",
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
          }
        })
        .catch(() => {
          setMessage("Đã có người đặt lịch!");
          setLevelMessage("danger");
          setShow(true);
        })
        .finally(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          const timer = setTimeout(() => {
            setLoading(false);
          }, 1000);
          return () => clearTimeout(timer);
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

  const handleDivClick = (value: CalendarResponse) => {
    setCalendar(value);
    setShowModal(true);
  };
  interface Calendar {
    calendarDate: string;
  }

  function getClinicDoctor(area: Area): Clinic[] {
    return area.clinics.filter((clinic) =>
      clinic.calendars.some(
        (calendar) =>
          !isDateExpired(calendar) && calendar.doctor.id == doctorState.id
      )
    );
  }

  function isDateExpired(calendar: Calendar): boolean {
    const calendarDate = new Date(calendar.calendarDate);
    const now = new Date();
    const calendarDateString = calendarDate.toISOString().split("T")[0];
    const nowDateString = now.toISOString().split("T")[0];
    if (
      calendarDateString < nowDateString ||
      (calendarDateString === nowDateString && now.getHours() >= 18)
    ) {
      return true;
    }
    if (calendarDate === now && now.getHours() >= 18) {
      return true;
    }

    return false;
  }
  const infoTime = ({ date }: TileArgs) => {
    const now = new Date();
    const nowDateString = format(now, "yyyy-MM-dd");

    const dateCalendar = format(date, "yyyy-MM-dd");
    const convertedData = convertTime(listCalendar ?? []);
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
                  {value.map(
                    (calendar) =>
                      calendar.doctor.id === doctorState.id && (
                        <>
                          <b>{key}:</b>{" "}
                          <span style={{ fontWeight: "600", color: "green" }}>
                            <div
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "lightGray")
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
                          </span>
                        </>
                      )
                  )}{" "}
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
      {/* <Header /> */}
      {isLoading && <Preloader />}
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
                    data={areaSelected ? getClinicDoctor(areaSelected) : []}
                    onClinicSelected={(selectedClinic) =>
                      setClinic(selectedClinic)
                    }
                  />
                </Col>
                <Col xs={4}>
                  <Form.Label>
                    <b>Bác sĩ</b>
                  </Form.Label>
                  <div className="custom-select-wrapper">
                    <input
                      type="text"
                      value={
                        doctorState === null ? "" : doctorState.accountName
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
                  <Calendar tileContent={infoTime} />
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
export default AppointmentDoctor;

interface Props {
  calendar: CalendarResponse | null;
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
  const [error, setError] = useState(false);
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
          API_ENDPOINTS.GET_SUPPORT_ALL_TIME_APPOINTMENT(calendarId),
          headerAuth()
        );
        const data = await response.json();
        setSelectedTime(data);
      } catch (e: any) {
        console.error(e);
        setError(true);
      }
    };
    if (calendar) {
      fetchAppointmentByCalendarId(calendar.id);
    }
  }, [calendar]);

  return (
    <>
      <ErrorNotifi error={error} />
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
