import "../assets/css/Account.css";
import { useState } from "react";
import { ModalResult } from "./Modal";
import Pagination from "./Pagination";

export const AppointmentDetail = () => {
  return (
    <>
      <div className="card col-md-4" style={{ height: "max-content" }}>
        <h5 className="card-header fw-bold">Chi tiết cuộc hẹn</h5>
        <div className="card-body">
          <div className="align-items-start align-items-sm-center gap-4">
            <div className="button-wrapper w90">
              {/* <!-- Table Head --> */}
              <div className="table-head">
                <h4 className="title-package fw-bold">Khu khám dịch vụ</h4>
                <h4 className="title-package fw-bold">Khoa khám: Khoa Nội</h4>
                <h4 className="title-package fw-bold">Bác sĩ: Nguyễn Văn A</h4>
                <ul>
                  <li>Dịch vụ A: 500.000 vnd</li>
                  <li>Dịch vụ B: 500.000 vnd</li>
                </ul>
                <div className="table-center">
                  <p className="">Tên bệnh nhân: Nguyễn Văn B</p>
                  <p className="">Giới tính: Nam</p>
                  <p className="">Triệu chứng: Đau đầu, mệt người</p>
                  <p className="">Thời gian: 7:00 ngày 20-03-2024</p>
                  <p className="">
                    Trạng thái: <span className="fw-bold">Đợi xử lý</span>
                    <span className="fw-bold" style={{ color: "red" }}>
                      Đã hủy
                    </span>
                    <span className="fw-bold" style={{ color: "green" }}>
                      Đã duyệt
                    </span>
                  </p>
                  <p className="">
                    Tổng tiền: 1.000.000
                    <span> vnđ</span>
                  </p>
                  <p
                    className="fw-bold"
                    style={{ float: "right", color: "green" }}
                  >
                    Đã thanh toán
                  </p>
                  <p
                    className="fw-bold"
                    style={{ float: "right", color: "red" }}
                  >
                    Chưa thanh toán
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export const Appointment = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
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
              <h4 className="title-package">Tên gói khám</h4>
              <div className="table-center">
                <p>
                  Bác sĩ: <span> Nguyễn Văn A</span>
                </p>
                <p className="">Thời gian: 7:00 ngày 20-03-2024</p>
              </div>
            </div>
            <div className="btn-detail">
              <ModalResult
                title=""
                show={modalShow}
                onHide={() => setModalShow(false)}
                obj={undefined}
              />
            </div>

            {/* <!-- Table Bottom --> */}
          </div>
          <div className="mt-2">
            <button
              type="button"
              className="btn btn-primary me-2"
              onClick={() => setModalShow(true)}
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
export const HistoryAppointment = () => {
  return (
    <>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">Cài đặt tài khoản/</span> Lịch
            sử cuộc hẹn
          </h4>
          <div className="row">
            <ul className="nav nav-pills flex-column flex-md-row mb-3">
              <li className="nav-item">
                <a className="nav-link" href="">
                  <i className="bx bx-user me-1"></i> Tài khoản
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="javascript:void(0);">
                  <i className="bx bx-bell me-1"></i> Thông tin bác sĩ
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  href="pages-account-settings-notifications.html"
                >
                  <i className="bx bx-bell me-1"></i> Lịch sử cuộc hẹn
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="pages-account-settings-connections.html"
                >
                  <i className="bx bx-link-alt me-1"></i> Thông báo
                </a>
              </li>
            </ul>
            <div className="col-md-8 w90">
              <div className="card mb-4 col-md-8 w100">
                <h5 className="card-header">Lịch sử cuộc hẹn</h5>
                <Appointment />
                <Appointment />
                <Appointment />
                <Appointment />
                <Appointment />
              </div>
            </div>
            <AppointmentDetail />
          </div>
          <div style={{ marginBottom: "30px" }}>
            <Pagination totalItems={120} itemsPerPage={10} />
          </div>
        </div>
      </div>
    </>
  );
};
