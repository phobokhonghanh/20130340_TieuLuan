import { useEffect, useState } from "react";
import { EvaluateDTO } from "../Models/Model";
import { API_ENDPOINTS, deleteEvaluate } from "../apiConfig";
import { headerAuth } from "../Authentication/Authentication";
import { Col, Table } from "react-bootstrap";
import Pagination from "./Pagination";
import { ErrorNotifi, Notifi } from "./Notification";

export function AdminEvaluate() {
  const [filterText, setFilterText] = useState(""); // input search
  const [totalPages, setTotalPages] = useState<number>(1); // State để lưu tổng số trang
  const [currentPage, setCurrentPage] = useState<number>(1); // State để lưu trang hiện tại
  const [data, setData] = useState<EvaluateDTO[]>([]); // State để lưu data
  const [error, setError] = useState<boolean>(false); // kiểm tra có lỗi
  const [showMess, setShowMess] = useState(false); // show mess
  const [message, setMessage] = useState(""); // content message
  const [levelMessage, setLevelMessage] = useState<"danger" | "success">(
    "danger"
  ); // level message
  // filter
  const [refresh, setRefresh] = useState<boolean>(false); // kiểm tra có lỗi

  const handleFilterChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setFilterText(value);
  };
  // lấy data
  useEffect(() => {
    const fetchDataEvaluate = async () => {
      try {
        const response = await fetch(
          `${API_ENDPOINTS.GET_EVALUATE_ALL}?page=${currentPage}&keyword=${filterText}`,
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
    fetchDataEvaluate();
    setRefresh(false);
  }, [currentPage, filterText, refresh]);
  // xóa
  const handleDelete = (id: string) => {
    deleteEvaluate(id)
      .then((response: any) => {
        if (response.status === 200) {
          setMessage("Thành công");
          setLevelMessage("success");
          setShowMess(true);
        }
      })
      .catch((error: any) => {
        console.error(error);
        setMessage("Xóa không thành công");
        setLevelMessage("danger");
        setShowMess(true);
      })
      .finally(() => {
        setRefresh(true);
      });
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
                    <a href="/admin/evaluate">Quản lý nhận xét</a>
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
                    <i className="fa fa-shopping-cart fa-fw"></i>
                    Nhận xét
                  </div>
                </div>
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
                <div className="panel-body">
                  <div
                    className="table-responsive"
                    style={{ overflowX: "visible" }}
                  >
                    <Table striped bordered hover>
                      <thead>
                        <tr className="text-small">
                          <th># </th>
                          <th>Mã lịch hẹn</th>
                          <th>Nội dung</th>
                          <th>Bác sĩ</th>
                          <th>Chức năng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((row, rowIndex) => (
                          <tr key={row.id}>
                            <td>{++rowIndex}</td>
                            <td>{row.appointmentId}</td>
                            <td>{row.evaluateContent}</td>
                            <td>{row.doctorId}</td>
                            <td>
                              <a
                                className="btn default btn-xs purple btn-edit"
                                style={{ color: "red" }}
                                onClick={() => handleDelete(row.id)}
                              >
                                <i className="fa fa-trash"></i>
                                <label className="hover-label">Xóa</label>
                              </a>
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
}
