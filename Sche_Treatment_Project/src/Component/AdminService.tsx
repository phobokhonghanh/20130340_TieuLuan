import { useEffect, useState } from "react";
import { Col, Table } from "react-bootstrap";

import PaginationCustom from "./Pagination";
import { formatPrice } from "../Utils/Utils";
import { ModalService } from "./Service";
import { ErrorNotifi } from "./Notification";
import { API_ENDPOINTS } from "../apiConfig";
import { ServiceEntity } from "../Models/Model";
import { headerAuth } from "../Authentication/Authentication";
import useDebounce from "../Utils/Debounce";

// quản lý dịch vụ
export const ServiceManager = () => {
  const [filterText, setFilterText] = useState(""); // input search
  const searchDebounce = useDebounce(filterText.trim(), 500);
  const [error, setError] = useState<boolean>(false);
  const [response, setResponse] = useState<number>(0); // get/set value response create
  const [totalPages, setTotalPages] = useState<number>(1); // State để lưu tổng số trang
  const [currentPage, setCurrentPage] = useState<number>(1); // State để lưu trang hiện tại
  const [showModalService, setShowModalService] = useState(false); // get / set show modal (add and update)
  const [dataService, setDataService] = useState<ServiceEntity[]>([]); // list services all

  // get value user input (search name)
  const handleFilterChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setFilterText(value);
  };
  // call api
  useEffect(() => {
    const fetchListPackage = async () => {
      try {
        const response = await fetch(
          `${API_ENDPOINTS.GET_SERVICE_ALL}?page=${currentPage}&keyword=${searchDebounce}`,
          headerAuth()
        );
        const data = await response.json();
        setDataService(data.content);
        setCurrentPage(data.number + 1);
        setTotalPages(data.totalPages);
      } catch (e: any) {
        setError(true);
      }
    };
    setResponse(0);
    fetchListPackage();
  }, [response, currentPage, searchDebounce]);
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
                    <a href="/admin">Home</a>
                    <i className="fa fa-angle-right"></i>
                  </li>
                  <li>
                    <a href="/admin/services">Quản lý dịch vụ khám bệnh</a>
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
                    Dịch vụ khám bệnh
                  </div>
                  <a className="add" onClick={() => setShowModalService(true)}>
                    <div id="add">
                      <i className="fa fa-plus"></i>
                      <span>Thêm mới</span>
                    </div>
                  </a>
                </div>
                <Col xs={3}>
                  <input
                    type="text"
                    placeholder="Tìm kiếm tên dịch vụ..."
                    value={filterText}
                    onChange={handleFilterChange}
                    className="custom-select-input"
                    style={{ margin: "15px" }}
                  />
                </Col>
                <ModalService
                  title="Thêm dịch vụ"
                  add={true}
                  service={undefined}
                  show={showModalService}
                  onHide={() => setShowModalService(false)}
                  responseStatus={(status: number) => setResponse(status)}
                />
                <div className="panel-body">
                  <div className="table-responsive">
                    {" "}
                    <DataTableService
                      responseStatus={(status) => setResponse(status)}
                      data={dataService}
                    />
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
};
interface DataTableServiceProps {
  responseStatus: (status: number) => void;
  data: ServiceEntity[];
}
// danh sách dịch vụ
export const DataTableService: React.FC<DataTableServiceProps> = ({
  responseStatus,
  data,
}) => {
  const [showModalService, setShowModalService] = useState<{
    [key: number]: boolean;
  }>({}); // modal show update clinic

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr className="text-small">
            <th># </th>
            <th>Tên dịch vụ</th>
            <th>Giá tiền</th>
            <th>Trạng thái</th>
            <th>Phòng khám</th>
            <th className="remove" style={{ textAlign: "center" }}>
              Sửa
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row.id}>
              <td>{++rowIndex}</td>
              <td>{row.serviceName}</td>
              <td>{formatPrice(row.servicePrice)}</td>
              <td>{row.supportStatusId.supportValue}</td>
              <td>
                {row.clinic.clinicName}
                <div>({row.clinic.medicalAreaId.areaName})</div>
              </td>
              <td style={{ textAlign: "center" }} key={row.id}>
                <a
                  className="btn default btn-xs purple btn-edit"
                  onClick={() =>
                    setShowModalService({
                      ...showModalService,
                      [rowIndex]: true,
                    })
                  }
                >
                  <i className="fa fa-edit"></i>
                </a>
                {showModalService && (
                  <ModalService
                    title="Sửa dịch vụ"
                    add={false}
                    service={row}
                    show={showModalService[rowIndex] || false}
                    onHide={() =>
                      setShowModalService({
                        ...showModalService,
                        [rowIndex]: false,
                      })
                    }
                    responseStatus={(status) => responseStatus(status)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
