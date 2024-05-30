import { useEffect, useState } from "react";
import { BillDTO } from "../Models/Model";
import { API_ENDPOINTS } from "../apiConfig";
import { ErrorNotifi } from "./Notification";
import { Col, Table } from "react-bootstrap";
import Pagination from "./Pagination";

export const BillManager = () => {
  const [filterText, setFilterText] = useState(""); // input search
  const [totalPages, setTotalPages] = useState<number>(1); // State để lưu tổng số trang
  const [currentPage, setCurrentPage] = useState<number>(1); // State để lưu trang hiện tại
  const [data, setData] = useState<BillDTO[]>([]); // State để lưu data
  const [error, setError] = useState<boolean>(false); // kiểm tra có lỗi
  // filter
  const handleFilterChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setFilterText(value);
  };
  console.log(data);
  // lấy data
  useEffect(() => {
    const fetchDataBill = async () => {
      try {
        const response = await fetch(
          `${API_ENDPOINTS.GET_BILL_ALL}?page=${currentPage}&keyword=${filterText}`
        );
        const data = await response.json();
        setData(data.content);
        console.log(data.content);
        setCurrentPage(data.number + 1);
        setTotalPages(data.totalPages);
      } catch (e: any) {
        setError(true);
      }
    };
    fetchDataBill();
  }, [currentPage, filterText]);
  return (
    <>
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
                    <a href="/admin/bill">Quản lý hóa đơn</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ErrorNotifi error={error} />
          <div className="row">
            <div className="col-lg-12">
              <div className="panel panel-default">
                <div className="panel-heading d-flex">
                  <div style={{padding:"10px"}}>
                    <i className="fa fa-shopping-cart fa-fw"></i>
                    Hóa đơn
                  </div>
                </div>
                <Col xs={3}>
                  <input
                    type="text"
                    placeholder="Tìm kiếm mã lịch hẹn..."
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
                          <th>ID</th>
                          <th>ID lịch hẹn</th>
                          <th>Giá gói khám</th>
                          <th>Tổng tiền</th>
                          <th>Trạng thái</th>
                          <th>Phương thức</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((row, rowIndex) => (
                          <tr key={row.id}>
                            <td>{++rowIndex}</td>
                            <td>{row.id}</td>
                            <td>{row.appointmentId}</td>
                            <td>{row.packagePrice}</td>
                            <td>{row.billSum}</td>
                            <td>
                              {row.paid ? (
                                <span style={{ color: "green" }}>
                                  Đã thanh toán
                                </span>
                              ) : (
                                <span style={{ color: "red" }}>
                                  Chưa thanh toán
                                </span>
                              )}
                            </td>
                            <td>
                              {row.paymentId == null ? "Tiền mặt" : "Paypal"}
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
