import { useEffect, useState } from "react";
import { AccountResponse } from "../Models/Model";
import { Col, Table } from "react-bootstrap";
import Pagination from "./Pagination";
import { checkLockAccount, checkPatient } from "../Utils/Utils";
import {
  API_ENDPOINTS,
  lockAccount,
  lowRole,
  unlockAccount,
  upRole,
} from "../apiConfig";
import "../assets/css/Account.css";
import { ErrorNotifi, Notifi } from "./Notification";
import { Link } from "react-router-dom";
import Preloader from "./Preloader";
import { headerAuth } from "../Authentication/Authentication";

// Quản lý tài khoản
export const AccountManager = () => {
  const [filterText, setFilterText] = useState(""); // input search
  const [response, setResponse] = useState<number>(0); // get/set value response
  const [totalPages, setTotalPages] = useState<number>(1); // State để lưu tổng số trang
  const [currentPage, setCurrentPage] = useState<number>(1); // State để lưu trang hiện tại
  const [data, setData] = useState<AccountResponse[]>([]); // State để lưu data
  const [error, setError] = useState<boolean>(false); // kiểm tra có lỗi
  const [isLoading, setLoading] = useState(false); // loading
  const [showMess, setShowMess] = useState(false); // show mess
  const [message, setMessage] = useState(""); // content message
  const [levelMessage, setLevelMessage] = useState<"danger" | "success">(
    "danger"
  ); // level message
  // filter
  const handleFilterChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setFilterText(value);
  };
  // lấy data
  useEffect(() => {
    const fetchDataAccount = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_ENDPOINTS.GET_ACCOUNT_ALL}?page=${currentPage}&keyword=${filterText}`,
          headerAuth()
        );
        const data = await response.json();
        setData(data.content);
        setCurrentPage(data.number + 1);
        setTotalPages(data.totalPages);
      } catch (e: any) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    setResponse(0);
    fetchDataAccount();
  }, [response, currentPage, filterText]);
  // nâng role từ bệnh nhân -> bác sĩ
  const handleUpRole = (id: string) => {
    setLoading(true);
    upRole(id)
      .then((response: any) => {
        if (response.status === 200) {
          setResponse(response.status);
          setMessage("Thành công");
          setLevelMessage("success");
          setShowMess(true);
        }
      })
      .catch((error) => {
        setMessage(error.response.data);
        setLevelMessage("danger");
        setShowMess(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // giảm role từ bác sĩ, admin -> bệnh nhân
  const handleLowRole = (id: string) => {
    setLoading(true);
    lowRole(id)
      .then((response: any) => {
        if (response.status === 200) {
          setResponse(response.status);
          setMessage("Thành công");
          setLevelMessage("success");
          setShowMess(true);
        }
      })
      .catch((error) => {
        setMessage(error.response.data);
        setLevelMessage("danger");
        setShowMess(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // khóa tài khoản
  const handleLock = (id: string) => {
    setLoading(true);
    lockAccount(id)
      .then((response: any) => {
        if (response.status === 200) {
          setResponse(response.status);
          setMessage("Thành công");
          setLevelMessage("success");
          setShowMess(true);
        }
      })
      .catch((error) => {
        setMessage(error.response.data);
        setLevelMessage("danger");
        setShowMess(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // mở khóa tài khoản
  const handleUnLock = (id: string) => {
    setLoading(true);
    unlockAccount(id)
      .then((response: any) => {
        if (response.status === 200) {
          setResponse(response.status);
          setMessage("Thành công");
          setLevelMessage("success");
          setShowMess(true);
        }
      })
      .catch((error) => {
        setMessage(error.response.data);
        setLevelMessage("danger");
        setShowMess(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      {isLoading && <Preloader />}
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
                    <a href="/admin/account">Quản lý tài khoản</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ErrorNotifi error={error} />
          {showMess && (
            <Notifi
              message={message}
              variant={levelMessage}
              onClose={() => setShowMess(false)}
            />
          )}
          <div className="row">
            <div className="col-lg-12">
              <div className="panel panel-default">
                <div className="panel-heading d-flex">
                  <div>
                    <i className="fa  fa-user fa-fw"></i>
                    Tài khoản
                  </div>
                  <Link to="/admin/register" className="add">
                    <div id="add">
                      <i className="fa fa-plus"></i>
                      <span>Thêm mới</span>
                    </div>
                  </Link>
                </div>
                <Col xs={3}>
                  <input
                    type="text"
                    placeholder="Tìm kiếm số điện thoại..."
                    value={filterText}
                    onChange={handleFilterChange}
                    className="custom-select-input"
                    style={{ margin: "15px" }}
                  />
                </Col>
                <div className="panel-body">
                  <div
                    className="table-responsive"
                    style={{ overflowX: "visible" }}
                  >
                    <Table striped bordered hover>
                      <thead>
                        <tr className="text-small">
                          <th># </th>
                          <th>Số điện thoại</th>
                          <th>Email</th>
                          <th>Tên</th>
                          <th>Trạng thái</th>
                          <th>Quyền hạn</th>
                          <th style={{ width: "130px", cursor: "pointer" }}>
                            Đã đăng ký
                          </th>
                          <th style={{ textAlign: "center" }}>Đã hủy</th>
                          <th style={{ textAlign: "center" }}>Thanh toán</th>
                          <th
                            className="remove"
                            style={{ textAlign: "center" }}
                          >
                            Chức năng
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((row, rowIndex) => (
                          <tr key={row.accountDTO.id}>
                            <td>{++rowIndex}</td>
                            <td>{row.accountDTO.accountPhone}</td>
                            <td>{row.accountDTO.accountEmail}</td>
                            <td>{row.accountDTO.accountName}</td>
                            <td>{row.accountDTO.supportStatusId}</td>
                            <td>{row.accountDTO.supportRoleId}</td>
                            <td>{row.countSum} lịch hẹn</td>
                            <td style={{ textAlign: "center" }}>
                              <span style={{ color: "red" }}>
                                {row.countCancel}
                              </span>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <span style={{ color: "green" }}>
                                {row.countPay}
                              </span>
                            </td>
                            <td
                              style={{ textAlign: "center" }}
                              key={row.accountDTO.id}
                            >
                              {checkPatient(row.accountDTO.supportRoleId) ? (
                                <>
                                  <a
                                    className="btn btn-edit"
                                    onClick={() =>
                                      handleUpRole(row.accountDTO.id)
                                    }
                                  >
                                    <i className="fa fa-level-up"></i>
                                    <label className="hover-label">
                                      Cấp quyền làm bác sĩ
                                    </label>
                                  </a>
                                </>
                              ) : (
                                <a
                                  className="btn btn-edit"
                                  onClick={() =>
                                    handleLowRole(row.accountDTO.id)
                                  }
                                >
                                  <i className="fa fa-level-down"></i>
                                  <label className="hover-label">
                                    Hạ quyền tài khoản
                                  </label>
                                </a>
                              )}
                              {checkLockAccount(
                                row.accountDTO.supportStatusId
                              ) ? (
                                <a
                                  className="btn btn-edit"
                                  onClick={() =>
                                    handleUnLock(row.accountDTO.id)
                                  }
                                >
                                  <i className="fa fa-unlock"></i>
                                  <label className="hover-label">
                                    Mở tài khoản
                                  </label>
                                </a>
                              ) : (
                                <a
                                  className="btn default btn-xs purple btn-edit"
                                  style={{ color: "red" }}
                                  onClick={() => handleLock(row.accountDTO.id)}
                                >
                                  <i className="fa fa-lock"></i>
                                  <label className="hover-label">
                                    Khóa tài khoản
                                  </label>
                                </a>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
