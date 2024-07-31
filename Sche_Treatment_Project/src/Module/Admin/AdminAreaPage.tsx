import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { AreaDTO } from "../../Models/Model";
import { API_ENDPOINTS, createArea } from "../../apiConfig";
import { headerAuth } from "../../Authentication/Authentication";
import { ErrorNotifi, Notifi } from "../../Component/Notification";
import { Link } from "react-router-dom";
import PaginationCustom from "../../Component/Pagination";
import { v4 as uuidv4 } from "uuid";
import useDebounce from "../../Utils/Debounce";

// quản lý khu vực khám bệnh ADMIN
export function AdminAreaPage() {
  const [filterText, setFilterText] = useState(""); // tìm kiếm
  const searchDebounce = useDebounce(filterText.trim(), 500);
  const [error, setError] = useState<boolean>(false); // lỗi gọi api
  const [totalPages, setTotalPages] = useState<number>(1); // Tổng trang
  const [currentPage, setCurrentPage] = useState<number>(1); // trang hiện tại
  const [showModal, setShowModal] = useState(false); // hiển thị modal (Thêm )
  const [showModalEdit, setShowModalEdit] = useState<{
    [key: number]: boolean;
  }>({}); // hiển thị modal ( sửa)
  const [loadDataArea, setLoadDataArea] = useState<AreaDTO[]>([]); // list services all

  // Lấy giá trị tìm kiếm
  const handleFilterChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setFilterText(value);
  };
  // call api
  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch(
          `${API_ENDPOINTS.GET_ADMIN_AREA_ALL}?page=${currentPage}&keyword=${searchDebounce}`,
          headerAuth()
        );
        const data = await response.json();
        setLoadDataArea(data.content);

        setCurrentPage(data.number + 1);
        setTotalPages(data.totalPages);
      } catch (e: any) {
        setError(true);
      }
    };
    fetchList();
  }, [showModalEdit, showModal, currentPage, searchDebounce]);
  return (
    <>
      <ErrorNotifi error={error} />
      <div id="page-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-bar page-header">
                <ul className="page-breadcrumb">
                  <li>
                    <i className="fa fa-home"></i>
                    <Link to="/admin">Home</Link>
                    <i className="fa fa-angle-right"></i>
                  </li>
                  <li>
                    <Link to="/admin/area">Quản lý khu vực khám bệnh</Link>
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
                    <i className="fa fa-calendar fa-fw"></i>
                    Khu vực khám bệnh
                  </div>
                  <a className="add" onClick={() => setShowModal(true)}>
                    <div id="add">
                      <i className="fa fa-plus"></i>
                      <span>Thêm mới</span>
                    </div>
                  </a>
                </div>
                <Col xs={3}>
                  <input
                    type="text"
                    placeholder="Tìm kiếm tên khu vực..."
                    value={filterText}
                    onChange={handleFilterChange}
                    className="custom-select-input"
                    style={{ margin: "15px" }}
                  />
                </Col>
                <ModalArea
                  title="Thêm khu vực"
                  show={showModal}
                  onHide={() => setShowModal(false)}
                />
                <div className="panel-body">
                  <div className="table-responsive">
                    {" "}
                    <div>
                      <Table striped bordered hover>
                        <thead>
                          <tr className="text-small">
                            <th># </th>
                            <th>Tên khu vực</th>
                            <th>Trạng thái</th>
                            <th
                              className="remove"
                              style={{ textAlign: "center" }}
                            >
                              Sửa
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {loadDataArea &&
                            loadDataArea.map((row, rowIndex) => (
                              <tr key={row.id}>
                                <td>{++rowIndex}</td>
                                <td>{row.areaName}</td>
                                <td>{row.supportStatusId.supportValue}</td>
                                <td
                                  style={{ textAlign: "center" }}
                                  key={row.id}
                                >
                                  <a
                                    className="btn default btn-xs purple btn-edit"
                                    onClick={() =>
                                      setShowModalEdit({
                                        ...showModalEdit,
                                        [rowIndex]: true,
                                      })
                                    }
                                  >
                                    <i className="fa fa-edit"></i>
                                  </a>
                                  {showModalEdit && (
                                    <ModalArea
                                      title="Sửa khu vực"
                                      area={row}
                                      show={showModalEdit[rowIndex] || false}
                                      onHide={() =>
                                        setShowModalEdit({
                                          ...showModalEdit,
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
                    </div>
                  </div>
                  <div style={{ marginBottom: "30px" }}>
                    <PaginationCustom
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
interface ModalAreaProps {
  title: string;
  area?: AreaDTO;
  show: boolean;
  onHide: () => void;
}
export const ModalArea: React.FC<ModalAreaProps> = ({
  title,
  area,
  show,
  onHide,
}) => {
  const [error, setError] = useState(false); // thông báo lỗi
  const [message, setMessage] = useState(""); // thông báo
  const [showMess, setShowMess] = useState(false); //  hiển thị thông báo
  const [levelMessage, setLevelMessage] = useState<"danger" | "success">(
    "success"
  ); // mức độ thông báo

  const id = area ? area.id : uuidv4(); // id
  const name = area ? area.areaName : ""; // name
  const [form, setForm] = useState(
    area
      ? {
          id: id,
          areaName: name,
          supportStatusId: area.supportStatusId,
        }
      : {
          id: id,
          areaName: name,
          supportStatusId: { id: "S1" },
        }
  );

  const handChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let message = "Dịch vụ đã được thêm";
    createArea(form)
      .then((response: any) => {
        if (response.status === 201) {
          if (area) {
            message = "Dịch vụ đã được sửa";
          }
          setLevelMessage("success");
        }
      })
      .catch((error: any) => {
        if (error.response.status == 400) {
          message = "Dịch vụ đã tồn tại";
          setLevelMessage("danger");
        } else {
          console.error("Error:", error);
          setError(true);
        }
      })
      .finally(() => {
        if (!error) {
          setMessage(message);
          setShowMess(true);
        }
        onHide();
        window.scrollTo({ top: 30, behavior: "smooth" });
      });
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
      {<ErrorNotifi error={error} />}
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
            <Row style={{ textAlign: "left" }}>
              <Col xs={5}>
                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="name"
                    style={{ display: "block", marginBottom: "5px" }}
                  >
                    Tên<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="areaName"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    value={form.areaName}
                    onChange={handChange}
                    required
                  />
                </div>
              </Col>
              <Col xs={2}>
                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="gender"
                    style={{ display: "block", marginBottom: "5px" }}
                  >
                    Trạng thái
                  </label>
                  <select
                    name="supportStatusId"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    value={form.supportStatusId.id}
                    onChange={handChange}
                  >
                    <option value="S1">Mở</option>
                    <option value="S2">Khóa</option>
                  </select>
                </div>
              </Col>
            </Row>
            <div style={{ textAlign: "center" }}>
              <Button
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
              </Button>
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
