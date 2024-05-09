import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { Col, Form, Modal, Row, Table } from "react-bootstrap";
import Pagination from "./Pagination";
import { ClinicSelected } from "./Department";
import { ChooseServices } from "./SelectWithSearch";
import { ErrorNotifi, Notifi } from "./Notification";
import {
  Clinic,
  PackageDTO,
  PackageEntity,
  PackageService,
  PackageServiceDTO,
  ServiceEntity,
} from "../Models/Model";
import {
  API_ENDPOINTS,
  createPackage,
  deletePackageService,
  getServicesNotSelected,
} from "../apiConfig";
import {
  formatPrice,
  getListServices,
  getServicesRemoved,
  getServicesSelected,
} from "../Utils";

export const PackageManager = () => {
  const [isLoading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState(""); // input search
  const [error, setError] = useState<boolean>(false);
  const [response, setResponse] = useState<number>(0); // get/set value response create Clinic
  const [totalPages, setTotalPages] = useState<number>(1); // State để lưu tổng số trang
  const [currentPage, setCurrentPage] = useState<number>(1); // State để lưu trang hiện tại
  const [packages, setPackages] = useState<PackageEntity[]>([]);
  const [showModalAddPackage, setShowModalAddPackage] = useState(false); // get / set show modal package (add and update)

  const handleFilterChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setFilterText(value);
  };

  useEffect(() => {
    const fetchListPackage = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_ENDPOINTS.GET_PACKAGE_ALL}?page=${currentPage}&keyword=${filterText}`
        );
        const data = await response.json();
        setPackages(data.content);
        setCurrentPage(data.number + 1);
        setTotalPages(data.totalPages);
      } catch (e: any) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    setResponse(0);
    fetchListPackage();
  }, [response, currentPage, filterText]);
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
                  <a href="/admin/packages">Quản lý gói khám bệnh</a>
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
                <div>
                  <i className="fa  fa-user fa-fw"></i>
                  Gói khám bệnh
                </div>
                <a className="add" onClick={() => setShowModalAddPackage(true)}>
                  <div id="add">
                    <i className="fa fa-plus"></i>
                    <span>Thêm mới</span>
                  </div>
                </a>
              </div>
              <Col xs={3}>
                <input
                  type="text"
                  placeholder="Tìm kiếm tên gói khám..."
                  value={filterText}
                  onChange={handleFilterChange}
                  className="custom-select-input"
                  style={{ margin: "15px" }}
                />
              </Col>
              <ModalPackage
                title="Thêm gói dịch vụ"
                add={true}
                packageEntity={undefined}
                show={showModalAddPackage}
                onHide={() => setShowModalAddPackage(false)}
                responseStatus={(status) => setResponse(status)}
              />
              <div className="panel-body">
                <div className="table-responsive">
                  <DataTablePackage
                    responseStatus={(status) => setResponse(status)}
                    data={packages}
                  />
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
  );
};
interface ModalPackageProps {
  title: string;
  add: boolean;
  packageEntity: PackageEntity | undefined;
  show: boolean;
  onHide: () => void;
  responseStatus: (status: number) => void;
}
export const ModalPackage: React.FC<ModalPackageProps> = ({
  title,
  add,
  packageEntity,
  show,
  onHide,
  responseStatus,
}) => {
  const [error, setError] = useState();
  const [message, setMessage] = useState("");
  const [showMess, setShowMess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [levelMessage, setLevelMessage] = useState<"danger" | "success">(
    "danger"
  );
  const packageId = packageEntity ? packageEntity.id : uuidv4();
  const [packageName, setPackageName] = useState(
    packageEntity ? packageEntity.packageName : ""
  );
  const [packagePrice, setPackagePrice] = useState(
    packageEntity ? packageEntity.packagePrice : ""
  );
  const [clinic, setClinic] = useState<Clinic | undefined>(
    packageEntity?.clinicId
  );
  const [supportStatus, setSupportStatus] = useState(
    packageEntity ? packageEntity.supportStatusId.id : "S1"
  );
  const [listPackageService, setListPackageService] = useState<
    PackageService[]
  >(packageEntity ? packageEntity.packageServices : []);

  const [servicesSelected, setServicesSelected] = useState<ServiceEntity[]>([]); // list services selected callback
  const [dataServices, setDataServices] = useState<ServiceEntity[]>([]); // list services all
  const [dataClinic, setDataClinic] = useState<Clinic[]>([]);

  const fetchClinic = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_ENDPOINTS.GET_CLINIC_ALL}`);
      const data = (await response.json()) as Clinic[];
      setDataClinic(data);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchClinic();
  }, []);

  useEffect(() => {
    setServicesSelected(getListServices(listPackageService));
  }, [listPackageService]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await getServicesNotSelected(servicesSelected);
      setDataServices(response);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [servicesSelected]);

  const handlePackageNameChange = (e: {
    target: { name: any; value: any };
  }) => {
    const selected = e.target.value;
    setPackageName(selected);
  };
  const handlePackagePriceChange = (e: {
    target: { name: any; value: any };
  }) => {
    let selected = e.target.value;
    selected = selected.replace(/[^0-9]/g, "");
    setPackagePrice(selected);
  };
  const handleClinicSelected = (selectedClinic: Clinic) => {
    setClinic(selectedClinic);
  };
  const handleServicesSelected = (list: ServiceEntity[]) => {
    setServicesSelected(list);
  };
  const handleSupportChange = (e: { target: { name: any; value: any } }) => {
    const selected = e.target.value;
    setSupportStatus(selected);
  };
  const deletePackageServices = async (list: PackageService[]) => {
    try {
      // Duyệt qua từng mục trong danh sách để gọi API delete
      list.forEach(async (item) => {
        deletePackageService(item.id);
      });
    } catch (error) {
      console.error("Error deleting items:", error);
    }
  };
  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const listPackageServices = packageEntity
      ? packageEntity.packageServices
      : []; // ds dich vu da chon (api)
    const listRemove = getServicesRemoved(
      listPackageServices,
      servicesSelected
    );
    const listSelected = getListServices(listPackageServices);
    const listSelectedNew = getServicesSelected(listSelected, servicesSelected);

    let listPackageServiceCreate: PackageServiceDTO[] = [];
    let packageServiceCreate: PackageServiceDTO | null = null;

    listSelectedNew.map((item) => {
      packageServiceCreate = {
        id: uuidv4(),
        medicalService: item.id,
        packageId: packageId,
      };
      listPackageServiceCreate.push(packageServiceCreate);
    });
    const formData: PackageDTO = {
      id: packageId,
      packageName: packageName,
      packagePrice: packagePrice,
      clinicId: clinic,
      supportStatusId: supportStatus,
      packageServices: listPackageServiceCreate,
    };
    deletePackageServices(listRemove);
    if (formData) {
      createPackage(formData)
        .then((response: any) => {
          if (response.status === 201) {
            setMessage("Gói khám đã được sửa");
            if (add) {
              setMessage("Gói khám đã được thêm");
            }
            setLevelMessage("success");
            setShowMess(true);
            onHide();
            responseStatus(response.status);
          } else {
            setMessage("Gói khám đã tồn tại");
            setLevelMessage("danger");
            setShowMess(true);
          }
        })
        .catch((error: any) => {
          console.error("Error:", error);
          setMessage("Không thành công");
          setLevelMessage("danger");
          setShowMess(true);
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
                    Tên gói khám <span style={{ color: "red" }}>*</span>
                  </label>

                  <input
                    type="text"
                    name="packageName"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    value={packageName}
                    onChange={handlePackageNameChange}
                    required
                  />
                </div>
              </Col>
              <Col xs={5}>
                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="name"
                    style={{ display: "block", marginBottom: "5px" }}
                  >
                    Giá tiền <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="packagePrice"
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    value={packagePrice}
                    onChange={handlePackagePriceChange}
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
              </Col>
            </Row>
            <Row style={{ textAlign: "left" }}>
              <Col xs={5}>
                <div style={{ marginBottom: "20px" }}>
                  <label
                    htmlFor="name"
                    style={{ display: "block", marginBottom: "5px" }}
                  >
                    Khoa khám <span style={{ color: "red" }}>*</span>
                  </label>
                  <ClinicSelected
                    data={dataClinic}
                    onClinicSelected={handleClinicSelected}
                    clinicSelect={clinic}
                  />
                </div>
              </Col>
              <Col xs={7}>
                <div>
                  <label
                    htmlFor="name"
                    style={{ display: "block", marginBottom: "5px" }}
                  >
                    Dịch vụ <span style={{ color: "red" }}>*</span>
                  </label>
                  <ChooseServices
                    callbackDataSelected={(list) =>
                      handleServicesSelected(list)
                    }
                    dataSelected={servicesSelected}
                    data={dataServices}
                  />
                </div>
              </Col>
            </Row>
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
interface DataTablePackageProps {
  responseStatus: (status: number) => void;
  data: PackageEntity[];
}

export const DataTablePackage: React.FC<DataTablePackageProps> = ({
  responseStatus,
  data,
}) => {
  const [showModalAddPackage, setShowModalAddPackage] = useState<{
    [key: number]: boolean;
  }>({}); // modal show update clinic

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr className="text-small">
            <th># </th>
            <th>ID</th>
            <th>Tên gói</th>
            <th>Giá tiền</th>
            <th>Trạng thái</th>
            <th>Phòng khám</th>
            <th>Danh sách dịch vụ</th>
            <th className="remove" style={{ textAlign: "center" }}>
              Sửa
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row.id}>
              <td>{++rowIndex}</td>
              <td style={{ width: "200px" }}>{row.id}</td>
              <td>{row.packageName}</td>
              <td>{formatPrice(row.packagePrice)}</td>
              <td>{row.supportStatusId.supportValue}</td>
              <td>
                {row.clinicId.clinicName}
                <div>({row.clinicId.medicalAreaId.areaName})</div>
              </td>
              <td>
                {row.packageServices
                  ? row.packageServices.map((service) => (
                      <li>{service.medicalService.serviceName}</li>
                    ))
                  : "không có dịch vụ"}
              </td>
              <td style={{ textAlign: "center" }} key={row.id}>
                <a
                  className="btn default btn-xs purple btn-edit"
                  onClick={() =>
                    setShowModalAddPackage({
                      ...showModalAddPackage,
                      [rowIndex]: true,
                    })
                  }
                >
                  <i className="fa fa-edit"></i>
                </a>
                {showModalAddPackage && (
                  <ModalPackage
                    title="Sửa gói dịch vụ"
                    add={false}
                    packageEntity={row}
                    show={showModalAddPackage[rowIndex] || false}
                    onHide={() =>
                      setShowModalAddPackage({
                        ...showModalAddPackage,
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
