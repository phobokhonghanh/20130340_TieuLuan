import { useEffect, useState } from "react";
import { LogResponse } from "../Models/Model";
import { API_ENDPOINTS } from "../apiConfig";
import { headerAuth } from "../Authentication/Authentication";
import { Col, Row, Table } from "react-bootstrap";
import Pagination from "./Pagination";
import { ErrorNotifi } from "./Notification";
import { formatDate, formatDateTime, styleLevel } from "../Utils/Utils";
export function AdminLog() {
  const [filterText, setFilterText] = useState(""); // input search
  const [date, setDateInput] = useState(""); // input search
  const [totalPages, setTotalPages] = useState<number>(1); // State để lưu tổng số trang
  const [currentPage, setCurrentPage] = useState<number>(1); // State để lưu trang hiện tại
  const [data, setData] = useState<LogResponse[]>([]); // State để lưu data
  const [error, setError] = useState<boolean>(false); // kiểm tra có lỗi
  // filter
  const [refresh, setRefresh] = useState<boolean>(false); // kiểm tra có lỗi

  const handleFilterChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setFilterText(value);
  };
  const handleDate = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setDateInput(value ? formatDate(value) : "");
  };
  const handleResetDate = () => {
    setDateInput("");
    setFilterText("");
  };
  // lấy data
  useEffect(() => {
    const fetchDataLog = async () => {
      try {
        const response = await fetch(
          `${API_ENDPOINTS.GET_LOG_ALL}?page=${currentPage}&keyword=${filterText}&date=${date}`,
          headerAuth()
        );
        const data = await response.json();
        setData(data.content);
        setCurrentPage(data.number + 1);
        setTotalPages(data.totalPages);
      } catch (e: any) {
        setError(true);
      }
    };
    fetchDataLog();
    setRefresh(false);
  }, [currentPage, filterText, date, refresh]);
  return (
    <>
      <ErrorNotifi error={error} />
      <div id="page-wrapper" style={{ overflow: "hidden" }}>
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
                    <a href="/admin/log">Nhật ký hoạt động</a>
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
                    <i className="fa fa-bell fa-fw"></i>
                    Nhật ký hoạt động
                  </div>
                </div>
                <Row>
                  <Col xs={3}>
                    <input
                      type="text"
                      placeholder="Tìm kiếm nội dung..."
                      value={filterText}
                      onChange={handleFilterChange}
                      className="custom-select-input"
                      style={{ margin: "15px" }}
                    />
                  </Col>
                  <Col xs={3}>
                    <input
                      type="date"
                      onChange={handleDate}
                      max={new Date().toISOString().split("T")[0]}
                      className="custom-select-input"
                      style={{ margin: "15px" }}
                    />
                  </Col>
                  <Col xs={1}>
                    <div>
                      <i
                        className="fa fa-refresh fa-fw"
                        style={{ cursor: "pointer", margin: "15px" }}
                        onClick={() => handleResetDate()}
                      ></i>
                    </div>
                  </Col>
                </Row>
                <div className="panel-body">
                  <div
                    className="table-responsive"
                    style={{ overflowX: "visible" }}
                  >
                    <Table striped bordered hover>
                      <thead>
                        <tr className="text-small">
                          <th># </th>
                          <th>Thời gian</th>
                          <th>Nội dung</th>
                          <th>Cấp độ</th>
                          <th>Người thực hiện</th>
                          <th>Quyền hạn</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            <td>{++rowIndex}</td>
                            <td>
                              {formatDateTime(row.createdAt.toLocaleString())}
                            </td>
                            <td>{row.logContent}</td>
                            <td>
                              {" "}
                              <span
                                style={{
                                  fontWeight: 600,
                                  color: `${styleLevel(row.level)}`,
                                }}
                              >
                                {row.level}
                              </span>
                            </td>
                            <td>{row.accountName}</td>
                            <td>{row.role}</td>
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
}
