import { SetStateAction, useEffect, useState } from "react";
import { Dialog } from "./AdminDialog";
import { ModalInterface } from "./Modal";
import { CalendarModel, Clinic, Doctor } from "../Models/Model";
import { API_ENDPOINTS } from "../apiConfig.ts";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import Calendar, { TileArgs } from "react-calendar";
import { format } from "date-fns";
import { ChooseDoctor } from "./SelectWithSearch.tsx";

export const CalendarManager = () => {
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);
  const [clinic, setClinic] = useState<Clinic[]>([]);

  useEffect(() => {
    const fetchClinic = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_ENDPOINTS.GET_CLINIC_ALL);
        const data = (await response.json()) as Clinic[];
        setClinic(data);
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchClinic();
  }, []);
  return (
    <div id="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="page-bar page-header">
              <ul className="page-breadcrumb">
                <li>
                  <i className="fa fa-home"></i>
                  <a href="/Admin/Index_Admin">Home</a>
                  <i className="fa fa-angle-right"></i>
                </li>
                <li>
                  <a href="/Account/Account_Manage">Quản lý phòng khám</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">
              <Dialog />
              <div className="panel-heading d-flex">
                <div>
                  <i className="fa  fa-user fa-fw"></i>
                  Phòng khám
                </div>
                <a
                  className="add"
                  data-toggle="modal"
                  data-target="#myModal"
                  href="#"
                >
                  <div id="add" className="">
                    <i className="fa fa-plus"></i>
                    <span>Thêm mới</span>
                  </div>
                </a>
              </div>
              <div
                id="myModal"
                className="modal fade"
                tabIndex={-1}
                role="dialog"
              >
                <ModalInterface title={"phòng khám"} isCreate={true} />
              </div>
              <div className="panel-body">
                <div className="table-responsive">
                  {isLoading && <div>Loading...</div>}
                  {error && <div>Không có data</div>}
                  <DataTableRoom data={clinic} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const itemsPerPage = 10;
type DataTableRoomProps = {
  data: Clinic[];
};
export const DataTableRoom = (data: DataTableRoomProps) => {
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
  const handleChangePage = (pageIndex: SetStateAction<number>) => {
    setCurrentPage(pageIndex);
  };
  const [filteredRows, setFilteredRows] = useState<Clinic[]>(data.data);
  useEffect(() => {
    setFilteredRows(data.data); // Initialize filteredRows when data changes
  }, [data.data]);
  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);

  const handleFilterChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setFilterText(value);
    const filteredData = data.data.filter((row: Clinic) =>
      Object.values(row).some((cell) =>
        String(cell).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredRows(filteredData);
    setCurrentPage(0);
  };
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredRows.length);
  const currentRows = filteredRows.slice(startIndex, endIndex);
  const sortedRows = [...currentRows].sort((a, b) => {
    const columnA = a[sortColumn as keyof Clinic];
    const columnB = b[sortColumn as keyof Clinic];
    if (columnA < columnB) return sortDirection === "asc" ? -1 : 1;
    if (columnA > columnB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Tìm kiếm ..."
        value={filterText}
        onChange={handleFilterChange}
      />
      <Table striped bordered hover>
        <thead>
          <tr className="text-small">
            <th># </th>
            <th>ID</th>
            <th
              onClick={() => handleSort("name")}
              style={{ cursor: "pointer" }}
            >
              {sortColumn === "name" ? (
                <span>
                  {sortDirection === "asc" ? "Tên phòng ▲" : "Tên phòng ▼"}
                </span>
              ) : (
                "Tên phòng ▼"
              )}
            </th>
            <th
              onClick={() => handleSort("status")}
              style={{ cursor: "pointer" }}
            >
              {sortColumn === "status" ? (
                <span>
                  {sortDirection === "asc" ? "Trạng thái ▲" : "Trạng thái ▼"}
                </span>
              ) : (
                "Trạng thái ▼"
              )}
            </th>
            <th style={{ textAlign: "center" }}>Lịch</th>
            <th className="remove" style={{ textAlign: "center" }}>
              Sửa
            </th>
            <th className="remove" style={{ textAlign: "center" }}>
              Xóa
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, rowIndex) => (
            <tr key={row.id}>
              <td>{++rowIndex}</td>
              <td>{row.id}</td>
              <td>{row.clinicName}</td>
              <td>{row.supportStatus.supportValue}</td>
              <td style={{ textAlign: "center" }}>
                <a
                  data-toggle="modal"
                  data-target={"#Calendar" + Object.values(row)[0]}
                  className="btn default btn-xs purple btn-edit"
                >
                  <i className="fa fa-calendar"></i>
                </a>
                <div
                  style={{ textAlign: "left" }}
                  id={"Calendar" + Object.values(row)[0]}
                  className="modal fade"
                  tabIndex={-1}
                  role="dialog"
                >
                  <ModalCalendar data={row.calendars} />
                </div>
              </td>
              <td style={{ textAlign: "center" }}>
                <a
                  data-toggle="modal"
                  data-target={"#Update" + Object.values(row)[0]}
                  className="btn default btn-xs purple btn-edit"
                >
                  <i className="fa fa-edit"></i>
                </a>
                <div
                  style={{ textAlign: "left" }}
                  id={"Update" + Object.values(row)[0]}
                  className="modal fade"
                  tabIndex={-1}
                  role="dialog"
                >
                  <ModalInterface
                    title={"phòng khám"}
                    isCreate={false}
                    obj={row}
                    isPackage={false}
                  />
                </div>
              </td>
              <td style={{ textAlign: "center" }}>
                <a
                  data-toggle="modal"
                  data-target={"#Add" + rowIndex}
                  className="btn default btn-xs black btn-delete"
                >
                  <i className="fa fa-trash-o"></i>
                </a>
                <div
                  id={"Add" + rowIndex}
                  className="modal fade modal-confirm"
                  role="dialog"
                >
                  <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                      <div className="modal-body">
                        <p className="text-content">
                          Xác nhận xóa phòng khám
                          <em>{row.clinicName}</em>
                        </p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          onClick={() =>
                            (window.location.href =
                              "/Account/Account_Delete?userName=@member.UserName")
                          }
                          className="btn-cf"
                        >
                          Xác nhận
                        </button>
                        <button
                          type="button"
                          className="tbn-cancle"
                          data-dismiss="modal"
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <button
          onClick={() => handleChangePage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span>{`Page ${currentPage + 1} of ${totalPages}`}</span>
        <button
          onClick={() => handleChangePage(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};
interface CalendarProps {
  data: CalendarModel[];
}
export const ModalCalendar = (props: CalendarProps) => {
  const [showDialog, setshowDialog] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());

  function convertTime(
    data: CalendarModel[]
  ): Map<string, Map<string, string>> {
    let info = new Map<string, Map<string, string>>();

    data.forEach((calendar) => {
      calendar.timetables.forEach((timetable) => {
        const timetableDate = timetable.timetableDate;
        const startHour = parseInt(
          timetable.supportTime.supportValue.split(":")[0]
        );
        const doctorName = calendar.doctor.accountId.accountName;

        // Kiểm tra xem timetableDate đã tồn tại trong info chưa
        if (info.has(timetableDate)) {
          // Nếu đã tồn tại, thêm thông tin của doctor vào Map đã tồn tại
          const existingCa = info.get(timetableDate);
          if (existingCa) {
            if (startHour < 12) {
              existingCa.set("Sáng", doctorName);
            } else {
              existingCa.set("Chiều", doctorName);
            }
          }
        } else {
          // Nếu chưa tồn tại, tạo một Map mới và thêm thông tin của doctor vào đó
          const ca = new Map<string, string>();
          if (startHour < 12) {
            ca.set("Sáng", doctorName);
          } else {
            ca.set("Chiều", doctorName);
          }
          info.set(timetableDate, ca);
        }
      });
    });

    return info;
  }

  const infoTime = ({ date, view }: TileArgs) => {
    const dateCalendar = format(date, "yyyy-MM-dd");
    const convertedData = convertTime(props.data); // Giả sử `data` là một biến đại diện cho dữ liệu của bạn

    if (convertedData.has(dateCalendar)) {
      const caInfo = convertedData.get(dateCalendar);
      if (caInfo) {
        return (
          <div>
            {Array.from(caInfo.entries()).map(([key, value]) => (
              <div key={key}>
                <b>{key}:</b>{" "}
                <span style={{ fontWeight: "600", color: "green" }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        );
      }
    }
  };
  const handleDateClick = (value: any) => {
    setShowModal(true);
    setDate(value);
    console.log(date + " " + showModal);
  };
  const handleDateChange = (value: any) => {
    setShowModal(true);
    setDate(value);
    console.log(date + " " + showModal);
  };
  return (
    <div>
      <div className="modal-dialog" role="document">
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
            <h4 className="">Calendar</h4>
            {showDialog && <Dialog />}
          </div>
          <div className="modal-body" style={{ padding: "20px" }}>
            <Calendar
              value={date}
              tileContent={infoTime}
              onChange={handleDateChange}
            />
          </div>
        </div>
      </div>
      <div>
        <ModalDoctorCalendar
          title={date.toDateString()}
          doctor={null}
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      </div>
    </div>
  );
};

interface Props {
  title: string;
  doctor: Doctor | null;
  show: boolean;
  onHide?: () => void;
  handleCloseModal?: () => void;
}
export const ModalDoctorCalendar = (props: Props) => {
  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="grid-example">
          <Container>
            <Form>
              <Row>
                <b>Ca sáng</b>
                <Row>
                  <ChooseDoctor dataSelected={props.doctor} data={[]} />
                </Row>
              </Row>
              <Row>
                <Col>
                  <Button onClick={props.onHide}>Xong</Button>
                </Col>
              </Row>
              <Row>
                <b>Ca chiều</b>
                <Row>
                  <ChooseDoctor dataSelected={props.doctor} data={[]} />
                </Row>
              </Row>
              <Row>
                <Col>
                  <Button onClick={props.onHide}>Xong</Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};
