import "../assets/css/Account.css";
import { useEffect, useState } from "react";
import { ModalResult, ModalThankYou } from "./Modal";
import Pagination from "./Pagination";
import { Link, useNavigate } from "react-router-dom";
import {
  AppointmentDTO,
  Area,
  Bill,
  CalendarDTO,
  ClinicDTO,
  DoctorEntity,
  PackageEntity,
  Support,
} from "../Models/Model";
import {
  API_ENDPOINTS,
  payment_paycash,
  payment_paypal,
  updateStatus,
} from "../apiConfig";
import { formatDate } from "../Module/AppointmentPage";
import { Button } from "react-bootstrap";
import { ErrorNotifi, Notifi } from "./Notification";
import {
  checkRoleDoctor,
  getIdAccount,
  headerAuth,
} from "../Authentication/Authentication";
import Preloader from "./Preloader";
interface appointmentDetailsProps {
  refesh: boolean;
  appointmentId: AppointmentDTO;
  setRefesh: (rf: boolean) => void;
}
// chi tiết lịch hẹn
export const AppointmentDetail: React.FC<appointmentDetailsProps> = ({
  refesh,
  appointmentId,
  setRefesh,
}) => {
  const [error, setError] = useState<boolean>(false);
  const [showMess, setShowMess] = useState(false);
  const [message, setMessage] = useState("");
  const [levelMessage, setLevelMessage] = useState<"danger" | "success">(
    "danger"
  );
  const [bill, setBill] = useState<Bill>();
  const [clinic, setClinic] = useState<ClinicDTO>();
  const [area, setArea] = useState<Area>();
  const [modalThankYou, showModalThankYou] = useState<boolean>(false);

  // gọi api - lấy danh sách khu vực khám
  // gán mặc định cho area đầu tiên
  // gán danh sách phòng khám
  const fetchBill = async () => {
    try {
      const response = await fetch(
        API_ENDPOINTS.GET_BILL_APPOINTMENT(appointmentId.id),
        headerAuth()
      );
      const data = (await response.json()) as Bill;
      setBill(data);
    } catch (e: any) {
      setError(true);
    }
  };
  const fetchClinic = async () => {
    try {
      const response = await fetch(
        API_ENDPOINTS.GET_CLINIC_CALENDAR(appointmentId.calendarId),
        headerAuth()
      );
      const data = (await response.json()) as ClinicDTO;
      setClinic(data);
    } catch (e: any) {
      setError(true);
    }
  };
  const fetchArea = async () => {
    try {
      if (clinic && clinic.medicalAreaId !== null) {
        const response = await fetch(
          API_ENDPOINTS.GET_AREA(clinic.medicalAreaId.id),
          headerAuth()
        );
        const data = (await response.json()) as Area;
        setArea(data);
      }
    } catch (e: any) {
      setError(true);
    }
  };
  // fetch data khi appointmentId thay đổi
  useEffect(() => {
    fetchBill();
    fetchClinic();
    fetchArea();
    setRefesh(false);
  }, [appointmentId, refesh]);
  const handleCancel = (appointmentid: string) => {
    if (appointmentid) {
      updateStatus(appointmentid)
        .then((response: any) => {
          if (response.status === 200) {
            setRefesh(true);
          }
        })
        .catch((error: any) => {
          if (error.code === 400) {
            setMessage("Cập nhật trạng thái không thành công!");
            setLevelMessage("danger");
            setShowMess(true);
          } else {
            console.error("checkError", error);
            setError(true);
          }
        });
    }
  };
  const width = 800;
  const height = 800;
  const left = window.innerWidth / 2 - width / 2;
  const top = window.innerHeight / 2 - height / 2;
  const handPayment = (id: string) => {
    if (id !== "") {
      payment_paypal(id)
        .then((response: any) => {
          if (response.status === 200) {
            showModalThankYou(true);
            window.open(
              response.data,
              "mywin",
              `width=${width},height=${height},left=${left},top=${top}`
            );
          }
        })
        .catch((error: any) => {
          if (error.code === 400) {
            setMessage(error.response.data);
            setLevelMessage("danger");
            setShowMess(true);
          } else {
            setError(true);
          }
        });
    }
  };
  const handlePay = (id: string) => {
    if (id !== "") {
      payment_paycash(id)
        .then((response: any) => {
          if (response.status === 200) {
            setRefesh(true);
            setMessage("Thành công");
            setLevelMessage("success");
            setShowMess(true);
          }
        })
        .catch((error: any) => {
          if (error.code === 400) {
            setMessage("Không thành công");
            setLevelMessage("danger");
            setShowMess(true);
          } else {
            setError(true);
          }
        });
    }
  };
  const handleCloseModal = () => {
    showModalThankYou(false);
    setRefesh(true);
  };
  return (
    <>
      <ErrorNotifi error={error} />
      {showMess && (
        <Notifi
          message={message}
          variant={levelMessage}
          onClose={() => setShowMess(false)}
        />
      )}
      <ModalThankYou show={modalThankYou} onHide={handleCloseModal} />
      <div className="card col-md-4" style={{ height: "max-content" }}>
        <h5 className="card-header fw-bold">Chi tiết cuộc hẹn</h5>
        <div className="card-body">
          <div className="align-items-start align-items-sm-center gap-4">
            <div className="button-wrapper w90">
              {/* <!-- Table Head --> */}
              <div className="table-head">
                <p className="title-package fw-bold">{area?.areaName}</p>
                <p className="title-package fw-bold">
                  Khoa khám: {clinic?.clinicName}
                </p>
                <p className="title-package fw-bold">
                  Bác sĩ:{" "}
                  {bill?.appointment.calendar
                    ? bill?.appointment.calendar.doctor.accountName
                    : ""}
                </p>
                <p>
                  Gói khám:{" "}
                  {bill?.appointment.medicalPackage
                    ? bill?.appointment.medicalPackage.packageName
                    : ""}{" "}
                  (
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    parseFloat(
                      bill?.appointment.medicalPackage
                        ? bill?.appointment.medicalPackage.packagePrice
                        : "0"
                    )
                  )}
                  )
                </p>
                <ul>
                  {bill?.appointment.medicalPackage &&
                    bill?.appointment.medicalPackage.packageServices.map(
                      (service) => <li>{service.medicalService.serviceName}</li>
                    )}
                </ul>
                <div className="table-center">
                  <p className="">
                    Tên bệnh nhân: {bill?.appointment.appointmentFullname}
                  </p>
                  <p className="">
                    Số điện thoại: {bill?.appointment.appointmentPhone}
                  </p>
                  <p className="">
                    Giới tính:{" "}
                    {bill?.appointment.appointmentGender ? "Nam" : "Nữ"}
                  </p>
                  <p className="">
                    BHYT:{" "}
                    {bill?.appointment.appointmentBhyt
                      ? bill?.appointment.appointmentBhyt
                      : "Không có"}
                  </p>
                  <p className="">
                    Triệu chứng: {bill?.appointment.appointmentSymptom}
                  </p>
                  <p className="">
                    Thời gian: {bill?.appointment.supportTime.supportValue} ngày{" "}
                    {formatDate(
                      bill?.appointment.calendar
                        ? bill?.appointment.calendar.calendarDate
                        : "1/1/1900"
                    )}
                  </p>
                  <p className="">
                    Trạng thái lịch hẹn:{" "}
                    <span className="fw-bold">
                      <span style={{ color: "green" }}>
                        {bill?.appointment.supportStatus.id === "S1" ? (
                          <Button
                            onClick={() => handleCancel(appointmentId?.id)}
                          >
                            Hủy lịch hẹn
                          </Button>
                        ) : bill?.appointment.supportStatus ? (
                          bill?.appointment.supportStatus.supportValue
                        ) : (
                          ""
                        )}
                      </span>
                    </span>
                  </p>
                  <p className="">
                    Trạng thái hóa đơn:{" "}
                    <span className="fw-bold">
                      {bill?.paid ? (
                        <span style={{ color: "green" }}>Đã thanh toán</span>
                      ) : checkRoleDoctor() ? (
                        <Button
                          style={{ background: "#e53c33" }}
                          onClick={() => handlePay(bill ? bill.id : "")}
                        >
                          Chưa thanh toán
                        </Button>
                      ) : (
                        <span style={{ color: "red" }}> Chưa thanh toán</span>
                      )}
                    </span>
                  </p>
                  <p className="">
                    {" "}
                    Tổng tiền:{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(parseFloat(bill?.billSum ? bill?.billSum : "0"))}
                  </p>
                  {!bill?.paid && !checkRoleDoctor() && (
                    <div style={{ float: "right" }}>
                      <button
                        className="payment-btn paypal-btn"
                        onClick={() => handPayment(bill ? bill.id : "")}
                      >
                        Vui lòng thanh toán qua PayPal
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
interface AppointmentProps {
  refeshDetails: (modalRefreshDetails: boolean) => void;
  appointmentDTO: AppointmentDTO;
}
// lịch hẹn
export const Appointment: React.FC<AppointmentProps> = ({
  refeshDetails,
  appointmentDTO,
}) => {
  const navigator = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [packageFetch, setPackage] = useState<PackageEntity>();
  const [supportFetch, setSupport] = useState<Support>();
  const [calendarFetch, setCalendar] = useState<CalendarDTO>();
  const [accountFetch, setAccount] = useState<DoctorEntity>();
  const [error, setError] = useState(false);

  const fetchSupport = async () => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.GET_SUPPORT(appointmentDTO.supportTimeId)}`,
        headerAuth()
      );
      const data = await response.json();
      setSupport(data);
    } catch (e: any) {
      console.error(e.message);
      setError(true);
    }
  };
  const fetchGetCalendar = async () => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.GET_CALENDAR(appointmentDTO.calendarId)}`,
        headerAuth()
      );
      const data = await response.json();
      setCalendar(data);
    } catch (e: any) {
      console.error(e.message);
      setError(true);
    }
  };
  const fetchGetPackage = async () => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.GET_PACKAGE(appointmentDTO.packageId)}`,
        headerAuth()
      );
      const data = await response.json();
      setPackage(data);
    } catch (e: any) {
      console.error(e.message);
      setError(true);
    }
  };
  const fetchGetDoctor = async () => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.GET_DOCTOR_CALENDAR_ID(appointmentDTO.calendarId)}`,
        headerAuth()
      );
      const data = await response.json();
      setAccount(data);
    } catch (e: any) {
      console.error(e.message);
      setError(true);
    }
  };
  useEffect(() => {
    if (appointmentDTO) {
      fetchGetDoctor();
      fetchGetPackage();
      fetchGetCalendar();
      fetchSupport();
    } else {
      navigator("/error");
    }
  }, [appointmentDTO]);
  return (
    <>
      <ErrorNotifi error={error} />
      <div className="card-body">
        <div className="d-flex align-items-start align-items-sm-center gap-4">
          <img
            src="/src/assets/img/schedule.png"
            alt="user-avatar"
            className="d-block rounded"
            height="100"
            width="100"
            id="uploadedAvatar"
          />
          <div className="button-wrapper col-md-7">
            {/* <!-- Table Head --> */}
            <div className="table-head">
              <h4 className="title-package">
                {packageFetch ? packageFetch.packageName : "Tên gói khám"}
              </h4>
              <div className="table-center">
                <p>
                  Bác sĩ:{" "}
                  <span>
                    {accountFetch ? accountFetch.accountName : "Nguyễn Văn A"}
                  </span>
                </p>
                <p className="">
                  Thời gian: {supportFetch?.supportValue} ngày{" "}
                  {formatDate(
                    calendarFetch ? calendarFetch?.calendarDate : "1/1/1900"
                  )}
                </p>
              </div>
            </div>
            <div className="btn-detail">
              {modalShow && (
                <ModalResult
                  show={modalShow}
                  refeshDetails={() => refeshDetails(true)}
                  onHide={() => setModalShow(false)}
                  appointmentId={appointmentDTO.id}
                  doctorId={accountFetch ? accountFetch.id : ""}
                />
              )}
            </div>
            {/* <!-- Table Bottom --> */}
          </div>
          <div className="mt-2">
            <button
              type="button"
              className="btn btn-primary me-2"
              onClick={() => setModalShow(true)}
              disabled={appointmentDTO.supportStatusId === "S4"}
            >
              Kết quả
            </button>
            <button type="button" className="btn btn-outline-secondary">
              Chi tiết
            </button>
          </div>
        </div>
      </div>
      <hr className="my-0" />
    </>
  );
};
// lịch sử lịch hẹn
export const HistoryAppointment = () => {
  const navigator = useNavigate();
  const [listAppointment, setListAppointment] = useState<AppointmentDTO[]>([]);
  const [selectAppointment, setSelectAppointment] = useState<AppointmentDTO>();
  const account = getIdAccount();

  const [currentPage, setCurrentPage] = useState<number>(1); // State để lưu trang hiện tại
  const [totalPages, setTotalPages] = useState<number>(1); // State để lưu tổng số trang

  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [refeshDetails, setRefeshDetails] = useState(false);

  useEffect(() => {
    if (account) {
      const fetchAppointment = async (page: number) => {
        setLoading(true);
        try {
          const response = await fetch(
            `${API_ENDPOINTS.GET_APPOINTMENT_USER(account)}?page=${page}`,
            headerAuth()
          );
          const data = await response.json();
          setListAppointment(data.content);
          if (data.content) {
            setSelectAppointment(data.content[0]);
          }
          setCurrentPage(data.number + 1);
          setTotalPages(data.totalPages);
        } catch (e: any) {
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      fetchAppointment(currentPage);
      if (refeshDetails) {
        setRefeshDetails(false);
      }
    } else {
      navigator("/login");
    }
  }, [currentPage, refeshDetails]);
  return (
    <>
      <ErrorNotifi error={error} />
      {isLoading && <Preloader />}
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">Cài đặt tài khoản/</span> Lịch
            sử cuộc hẹn
          </h4>
          <div className="row">
            <ul className="nav nav-pills flex-column flex-md-row mb-3">
              <li className="nav-item">
                <Link className="nav-link" to="/account">
                  <i className="bx bx-user me-1"></i> Tài khoản
                </Link>
              </li>
              {checkRoleDoctor() && (
                <li className="nav-item">
                  <Link className="nav-link" to="/account-doctor">
                    <i className="bx bx-bell me-1"></i> Thông tin bác sĩ
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <a className="nav-link active">
                  <i className="bx bx-bell me-1"></i> Lịch sử cuộc hẹn
                </a>
              </li>
            </ul>
            <div className="col-md-8 w90">
              <div className="card mb-4 col-md-8 w100">
                <h5 className="card-header">Lịch sử cuộc hẹn</h5>
                {listAppointment &&
                  listAppointment.map((appointment) => (
                    <div
                      key={appointment.id}
                      style={
                        appointment.id === selectAppointment?.id
                          ? {
                              cursor: "pointer",
                              backgroundColor: "#d5d5d5",
                            }
                          : { cursor: "pointer" }
                      }
                      onClick={() => setSelectAppointment(appointment)}
                    >
                      <Appointment
                        refeshDetails={(rf) => setRefeshDetails(rf)}
                        appointmentDTO={appointment}
                      />
                    </div>
                  ))}
              </div>
            </div>
            {selectAppointment && (
              <AppointmentDetail
                refesh={refeshDetails}
                setRefesh={(rf) => setRefeshDetails(rf)}
                appointmentId={selectAppointment}
              />
            )}
          </div>
          <div style={{ marginBottom: "30px" }}>
            <Pagination
              totalPage={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />{" "}
          </div>
        </div>
      </div>
    </>
  );
};
