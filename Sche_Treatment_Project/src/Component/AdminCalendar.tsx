import "../assets/Admin/css/styleAdmin.css";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import Calendar, { TileArgs } from "react-calendar";
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { Area, CalendarDTO, Clinic, ClinicDTO } from "../Models/Model";
import { ErrorNotifi, Notifi } from "./Notification.tsx";
import { ChooseDoctor } from "./SelectWithSearch.tsx";
import { API_ENDPOINTS, createCalendar, createClinic } from "../apiConfig.ts";
import Preloader from "./Preloader.tsx";
import PaginationCustom from "./Pagination.tsx";
import { useModalContext } from "../hooks/ModalProvider.tsx";
import { DoctorResponse } from "../Models/Doctors/DoctorResponse.ts";
import { getDoctorByGroup, getListCalendarSelected } from "../Utils/Utils.tsx";
import { CalendarResponse } from "../Models/Calendars/CalendarResponse.ts";
import { headerAuth } from "../Authentication/Authentication.tsx";

// Quản lý lịch phòng
export const CalendarManager = () => {
  const [areaSelected, setAreaSelected] = useState<Area>(); // get/set value area selected
  const [showModalAddClinic, setShowModalAddClinic] = useState(false); // get / set show modal clinic (add and update)
  return (
    <div id="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="page-bar page-header">
              <ul className="page-breadcrumb">
                <li>
                  <i className="fa fa-home"></i>
                  <a href="/admin">Home</a>
                  <i className="fa fa-angle-right"></i>
                </li>
                <li>
                  <a href="/admin/clinic">Quản lý phòng khám</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">
              <div className="panel-heading d-flex">
                <div style={{ padding: "10px" }}>
                  <i className="fa fa-home fa-fw"></i>
                  Phòng khám
                </div>
                <a className="add" onClick={() => setShowModalAddClinic(true)}>
                  <div id="add" className="">
                    <i className="fa fa-plus"></i>
                    <span>Thêm mới</span>
                  </div>
                </a>
              </div>
              <ModalClinic // modal add Clinic
                title={"Thêm phòng khám"}
                clinic={undefined}
                add={true}
                area={areaSelected}
                show={showModalAddClinic}
                onHide={() => setShowModalAddClinic(false)}
              />
              <div className="panel-body">
                <div className="table-responsive">
                  <DataTableRoom // get Data Clinic
                    areaChoose={(area) => setAreaSelected(area)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
interface DataTableRoomProps {
  areaChoose: (area: Area) => void; // callback area
}
const itemsPerPage = 10; // 10 items one per page
// danh sách phòng
export const DataTableRoom: React.FC<DataTableRoomProps> = ({ areaChoose }) => {
  const { shouldRefreshFirstModal } = useModalContext();
  const [modalShow, setModalShow] = useState<{ [key: number]: boolean }>({}); // modal show calendar clinic
  const [showModalAddClinic, setShowModalAddClinic] = useState<{
    [key: number]: boolean;
  }>({}); // modal show update clinic
  const [filterText, setFilterText] = useState(""); // input search
  const [currentPage, setCurrentPage] = useState(1); // page currently selected
  const [areas, setArea] = useState<Area[]>([]); // get / set areas (fetch data)
  const [areaSelected, setAreaSelected] = useState<Area>(); // get / set areas selected
  const [filteredRows, setFilteredRows] = useState<Clinic[]>([]); // get clinic search
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  // gọi api - lấy danh sách khu vực khám
  // gán mặc định cho area đầu tiên
  // gán danh sách phòng khám
  const fetchArea = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.GET_AREA_ALL);
      const data = (await response.json()) as Area[];
      setArea(data);
      setAreaSelected(data[0]);
      areaChoose(data[0]);
      setFilteredRows(areaSelected ? areaSelected.clinics : []);
    } catch (e: any) {
      setError(true);
    } finally {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  };
  // fetch data khi response thay đổi
  useEffect(() => {
    fetchArea();
  }, [shouldRefreshFirstModal]);
  useEffect(() => {
    setFilteredRows(areaSelected ? areaSelected.clinics : []);
  }, [areaSelected]);
  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const handleAreaChange: React.ChangeEventHandler<HTMLSelectElement> = async (
    e
  ) => {
    const selectedAreaId = e.target.value;
    const selectedArea = areas.find((area) => area.id === selectedAreaId);
    if (selectedArea) {
      areaChoose(selectedArea);
      setAreaSelected(selectedArea);
      setFilteredRows(selectedArea.clinics);
    }
  };
  const handleFilterChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setFilterText(value);
    const filteredData = areaSelected?.clinics.filter((row: Clinic) =>
      Object.values(row).some((cell) =>
        String(cell).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredRows(filteredData ? filteredData : []);
    setCurrentPage(1);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredRows.length);
  const currentRows = filteredRows.slice(startIndex, endIndex);
  return (
    <>
      {isLoading && <Preloader />}
      <ErrorNotifi error={error} />
      <div>
        <Row style={{ padding: "10px", width: "100%" }}>
          <Col xs={4}>
            <input
              type="text"
              placeholder="Tìm kiếm ..."
              value={filterText}
              onChange={handleFilterChange}
              className="custom-select-input"
            />
          </Col>
          <Col xs={4}>
            <Form.Group controlId="formClinic">
              <select
                className="custom-select-input"
                value={areaSelected ? areaSelected.id : ""}
                onChange={handleAreaChange}
                required
              >
                <option value="">-- Chọn khu khám --</option>
                {areas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.areaName}
                  </option>
                ))}
              </select>
            </Form.Group>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr className="text-small">
              <th># </th>
              <th>Tên phòng</th>
              <th>Trạng thái</th>
              <th style={{ textAlign: "center" }}>Lịch</th>
              <th className="remove" style={{ textAlign: "center" }}>
                Sửa
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, rowIndex) => (
              <tr key={row.id}>
                <td>{++rowIndex}</td>
                <td>
                  <a
                    target="_blank"
                    href={`/admin/packages?clinicId=${row.id}`}
                  >
                    {row.clinicName}
                  </a>
                </td>
                <td>{row.supportStatus.supportValue}</td>
                <td style={{ textAlign: "center" }}>
                  <a
                    className="btn purple"
                    onClick={() =>
                      setModalShow({ ...modalShow, [rowIndex]: true })
                    }
                  >
                    <i className="fa fa-calendar"></i>
                  </a>
                  {modalShow && (
                    <ModalCalendar
                      id_clinic={row.id}
                      show={modalShow[rowIndex] || false}
                      onHide={() =>
                        setModalShow({ ...modalShow, [rowIndex]: false })
                      }
                    />
                  )}
                </td>
                <td style={{ textAlign: "center" }} key={row.id}>
                  <a
                    className="btn default btn-xs purple btn-edit"
                    onClick={() =>
                      setShowModalAddClinic({
                        ...showModalAddClinic,
                        [rowIndex]: true,
                      })
                    }
                  >
                    <i className="fa fa-edit"></i>
                  </a>
                  {showModalAddClinic && (
                    <ModalClinic
                      title={"Sửa phòng khám"}
                      clinic={row}
                      add={false}
                      area={areaSelected}
                      show={showModalAddClinic[rowIndex] || false}
                      onHide={() =>
                        setShowModalAddClinic({
                          ...showModalAddClinic,
                          [rowIndex]: false,
                        })
                      }
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>
          <PaginationCustom
            totalPage={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};
export function convertTime(
  data: CalendarResponse[]
): Map<string, Map<string, CalendarResponse[]>> {
  let info = new Map<string, Map<string, CalendarResponse[]>>();

  data.forEach((calendar) => {
    let listDoctor: CalendarResponse[] = []; // Khởi tạo mảng mới cho danh sách bác sĩ cho mỗi ca
    let ca = new Map<string, CalendarResponse[]>(); // Khởi tạo đối tượng Map mới cho các ca
    const dateKey = calendar.calendarDate; // ngay calendar
    const doctorName = calendar; // ten bac si
    const caName = calendar.groupTime.groupTimeDescription; // ten ca

    if (!info.has(dateKey as string)) {
      listDoctor.push(doctorName);
      ca.set(caName as string, listDoctor);
      info.set(dateKey as string, ca);
    } else {
      ca = info.get(dateKey as string) || new Map<string, CalendarResponse[]>(); // Lấy đối tượng ca từ info
      listDoctor = ca.get(caName as string) || []; // Lấy mảng listDoctor từ ca

      if (!ca.has(caName as string)) {
        listDoctor.push(doctorName);
        ca.set(caName as string, listDoctor);
      } else {
        listDoctor.push(doctorName);
        ca.set(caName as string, listDoctor);
      }
      info.set(dateKey as string, ca); // Cập nhật lại thông tin vào info
    }
  });
  return info;
}
interface CalendarProps {
  id_clinic: string;
  show: boolean;
  onHide: () => void;
}
// modal thêm lịch
export const ModalCalendar: React.FC<CalendarProps> = ({
  id_clinic,
  show,
  onHide,
}) => {
  const { shouldRefreshFirstModal } = useModalContext();
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState<CalendarResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          API_ENDPOINTS.GET_CALENDAR_ALL + `/${id_clinic}`,
          headerAuth()
        );
        const loadData = (await response.json()) as CalendarResponse[];
        setData(loadData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [shouldRefreshFirstModal]);

  const infoTime = ({ date }: TileArgs) => {
    const now = new Date();
    const nowDateString = format(now, "yyyy-MM-dd");
    const dateCalendar = format(date, "yyyy-MM-dd");
    const convertedData = convertTime(data);
    if (convertedData.has(dateCalendar)) {
      const caInfo = convertedData.get(dateCalendar);
      if (caInfo) {
        return (
          <div
            className={`${
              dateCalendar === nowDateString ? "react-calendar__tile--now" : ""
            }`}
          >
            {Array.from(caInfo.entries()).map(([key, value]) => (
              <div key={key}>
                <b>{key}:</b>{" "}
                <span
                  style={{ fontWeight: "600", color: "green", font: "initial" }}
                >
                  {value.map((calendar) => (
                    <div key={calendar.id}>
                      <span style={{ fontWeight: "bold" }}>BS: </span>
                      {calendar.doctor.accountName}
                    </div>
                  ))}
                </span>
              </div>
            ))}
          </div>
        );
      }
    }
  };
  const handleDateChange = (value: any) => {
    setShowModal(true);
    setDate(value);
  };
  const calendars = getListCalendarSelected(date, data);
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      style={{ opacity: "1" }}
      className="modalShow"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Lịch khám</Modal.Title>{" "}
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Calendar
          value={date}
          tileContent={infoTime}
          onChange={handleDateChange}
        />
        {showModal && (
          <ModalDoctorCalendar
            id_clinc={id_clinic}
            title={date.toDateString()}
            calendars={calendars}
            show={showModal}
            onHide={() => setShowModal(false)}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};
interface Props {
  id_clinc: string;
  title: string;
  calendars: Map<string, CalendarResponse[]>;
  show: boolean;
  onHide: () => void;
}
// modal danh sách bác sĩ
export const ModalDoctorCalendar: React.FC<Props> = ({
  id_clinc,
  title,
  calendars,
  show,
  onHide,
}) => {
  const { refreshFirstModal } = useModalContext();

  const [selectedDoctorOld, setSelectedDoctorOld] = useState<
    CalendarResponse[]
  >([]);
  const [selectedDoctorOld2, setSelectedDoctorOld2] = useState<
    CalendarResponse[]
  >([]);

  useEffect(() => {
    setSelectedDoctorOld(getDoctorByGroup("1", calendars));
    setSelectedDoctorOld2(getDoctorByGroup("2", calendars));
  }, [calendars]);

  const [selectedDoctor, setSelectedDoctor] = useState<DoctorResponse | null>(
    null
  ); // State để lưu thông tin về bác sĩ đã chọn
  const [selectedDoctor2, setSelectedDoctor2] = useState<DoctorResponse | null>(
    null
  ); // State để lưu thông tin về bác sĩ đã chọn
  const [showMess, setShowMess] = useState(false);
  const [message, setMessage] = useState("");
  const [levelMessage, setLevelMessage] = useState<"danger" | "success">(
    "danger"
  );
  const [listDoctor, setListDoctor] = useState<DoctorResponse[]>([]);
  const [error, setError] = useState(false);

  const form = (doctor: DoctorResponse, time: string) => {
    const formattedDate = format(new Date(title), "yyyy-MM-dd");
    const calendarForm: CalendarDTO = {
      id: uuidv4(),
      calendarDate: formattedDate,
      clinicId: id_clinc,
      accountId: doctor.id,
      idGroupTime: time,
    };
    return calendarForm;
  };
  const callApi = (calendarForm: CalendarDTO) => {
    createCalendar(calendarForm)
      .then((response) => {
        if (response.status === 201) {
          setMessage("Thêm ca trực thành công");
          setLevelMessage("success");
          setShowMess(true);
        }
      })
      .catch((error: any) => {
        // Xử lý lỗi khi request không thành công
        console.error("Error:", error);
        setMessage("Thêm ca trực không thành công!");
        setLevelMessage("danger");
        setShowMess(true);
      })
      .finally(() => {
        onHide();
        refreshFirstModal();
        setSelectedDoctor(null);
        setSelectedDoctor2(null);
      });
  };
  const handleCreateCalendar = async () => {
    if (selectedDoctor) {
      await callApi(form(selectedDoctor, "1"));
    }
    if (selectedDoctor2) {
      await callApi(form(selectedDoctor2, "2"));
    }
  };

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.GET_DOCTOR_ALL);
        const data = (await response.json()) as DoctorResponse[];
        setListDoctor(data);
      } catch (e: any) {
        console.error("Error:", e);
        setError(true);
      }
    };
    fetchDoctor();
  }, []);
  return (
    <>
      {showMess && (
        <Notifi
          message={message}
          variant={levelMessage}
          onClose={() => setShowMess(false)}
        />
      )}
      <ErrorNotifi error={error} />
      {show && (
        <>
          <div>
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                {title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-example">
              <Form>
                <Row style={{ textAlign: "left" }}>
                  <Col className="col-xs-6">
                    <b>Ca sáng</b>
                    <ChooseDoctor
                      dataSelected={selectedDoctorOld}
                      data={listDoctor}
                      onDoctorSelect={(doctor: DoctorResponse) =>
                        setSelectedDoctor(doctor)
                      }
                    />
                  </Col>
                  <Col className="col-xs-6">
                    <b>Ca chiều</b>
                    <ChooseDoctor
                      dataSelected={selectedDoctorOld2}
                      data={listDoctor}
                      onDoctorSelect={(doctor: DoctorResponse) =>
                        setSelectedDoctor2(doctor)
                      }
                    />
                  </Col>
                </Row>
                <Col style={{ textAlign: "center" }}>
                  <Button
                    style={{ margin: "5px" }}
                    onClick={() => handleCreateCalendar()}
                  >
                    Thêm ca trực
                  </Button>
                </Col>
              </Form>
            </Modal.Body>
          </div>
        </>
      )}
    </>
  );
};
interface ModalClinicProps {
  title: string;
  add: boolean;
  clinic: Clinic | undefined;
  area: Area | undefined;
  show: boolean;
  onHide: () => void;
}
// modal Create-Update phòng khám
export const ModalClinic: React.FC<ModalClinicProps> = ({
  title,
  add,
  clinic,
  area,
  show,
  onHide,
}) => {
  const { refreshFirstModal } = useModalContext();

  const [message, setMessage] = useState("");
  const [levelMessage, setLevelMessage] = useState<"danger" | "success">(
    "danger"
  );
  const [showMess, setShowMess] = useState(false);
  const [error, setError] = useState(false);
  const clinicId = clinic ? clinic.id : uuidv4();
  const [clinicName, setName] = useState(clinic ? clinic.clinicName : "");
  const [supportStatus, setSupportStatus] = useState("S1");

  useEffect(() => {
    if (clinic) {
      setName(clinic.clinicName);
      setSupportStatus(clinic.supportStatus.id);
    }
  }, [clinic]);

  // Hàm xử lý khi người dùng thay đổi thông tin
  const handleClinicChange = (e: { target: { name: any; value: any } }) => {
    const selected = e.target.value;
    setName(selected);
  };
  // Hàm xử lý khi người dùng thay đổi thông tin
  const handleSupportChange = (e: { target: { name: any; value: any } }) => {
    const selected = e.target.value;
    setSupportStatus(selected);
  };
  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formData: ClinicDTO = {
      id: clinicId,
      clinicName: clinicName,
      supportStatusId: supportStatus,
      medicalAreaId: area ? area : null,
    };
    if (formData) {
      createClinic(formData)
        .then((response: any) => {
          if (response.status === 201) {
            setMessage("Phòng khám đã được sửa");
            if (add) {
              setMessage("Phòng khám đã được thêm");
            }
            setLevelMessage("success");
            setShowMess(true);
            onHide();
          }
        })
        .catch((error: any) => {
          if (error.response.status === 400) {
            setMessage("Phòng khám đã tồn tại");
            setLevelMessage("danger");
            setShowMess(true);
          } else {
            setError(true);
          }
        })
        .finally(() => {
          refreshFirstModal();
          window.scrollTo({ top: 30, behavior: "smooth" });
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
      <ErrorNotifi error={error} />
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
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="name"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Khu khám
              </label>
              <input
                type="text"
                name="medicalAreaId"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                disabled
                value={area?.areaName}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="name"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Tên phòng khám <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="clinicName"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                value={clinicName}
                onChange={handleClinicChange}
                required
              />
            </div>
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
