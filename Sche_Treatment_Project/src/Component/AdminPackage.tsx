import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { Col, Form, Modal, Row, Table } from "react-bootstrap";
import PaginationCustom from "./Pagination";
import { ClinicChoose, ClinicSelected } from "./Department";
import { ChooseServices } from "./SelectWithSearch";
import { ErrorNotifi, Notifi } from "./Notification";
import {
  Clinic,
  ClinicDTO,
  PackageDTO,
  PackageEntity,
  PackageService,
  PackageServiceDTO,
  ServiceDTO,
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
} from "../Utils/Utils";
import { headerAuth } from "../Authentication/Authentication";
import { useLocation } from "react-router-dom";
import useDebounce from "../Utils/Debounce";

//Quản lý gói khám
export const PackageManager = () => {
  const query = new URLSearchParams(useLocation().search);
  const [filterText, setFilterText] = useState(""); // input search
  const searchDebounce = useDebounce(filterText.trim(), 500);
  const [clinicId, setClinicId] = useState(
    query.size > 0 ? query.get("clinicId") : ""
  ); // input search
  const [error, setError] = useState<boolean>(false);
  const [response, setResponse] = useState<number>(0); // get/set value response
  const [totalPages, setTotalPages] = useState<number>(1); // State để lưu tổng số trang
  const [currentPage, setCurrentPage] = useState<number>(1); // State để lưu trang hiện tại
  const [packages, setPackages] = useState<PackageEntity[]>([]);
  const [clinics, setClinics] = useState<ClinicDTO[]>([]);
  const [showModalAddPackage, setShowModalAddPackage] = useState(false); // get / set show modal package (add and update)

  const handleFilterChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setFilterText(value);
  };
  useEffect(() => {
    const fetchListPackage = async () => {
      try {
        const response = await fetch(
          `${API_ENDPOINTS.GET_PACKAGE_ALL}?page=${currentPage}&keyword=${searchDebounce}&clinicId=${clinicId}`,
          headerAuth()
        );
        const data = await response.json();
        setPackages(data.content);
        setCurrentPage(data.number + 1);
        setTotalPages(data.totalPages);
      } catch (e: any) {
        setError(true);
      } finally {
      }
    };
    const fetchListClinic = async () => {
      try {
        const response = await fetch(
          `${API_ENDPOINTS.GET_CLINIC_ALL}`,
          headerAuth()
        );
        const data = await response.json();
        setClinics(data);
      } catch (e: any) {
        setError(true);
      }
    };
    setResponse(0);
    fetchListClinic();
    fetchListPackage();
  }, [clinicId, response, currentPage, searchDebounce]);
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
                    <a href="/admin/packages">Quản lý gói khám bệnh</a>
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
                    <i className="fa fa-pencil-square-o fa-fw"></i>
                    Gói khám bệnh
                  </div>
                  <a
                    className="add"
                    onClick={() => setShowModalAddPackage(true)}
                  >
                    <div id="add">
                      <i className="fa fa-plus"></i>
                      <span>Thêm mới</span>
                    </div>
                  </a>
                </div>
                <Row>
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
                  <Col xs={3} style={{ marginTop: "15px" }}>
                    <ClinicChoose
                      data={clinics}
                      onClinicSelected={(selectedClinic) =>
                        setClinicId(
                          selectedClinic != null ? selectedClinic.id : ""
                        )
                      }
                    />
                  </Col>
                </Row>
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
interface ModalPackageProps {
  title: string;
  add: boolean;
  packageEntity: PackageEntity | undefined;
  show: boolean;
  onHide: () => void;
  responseStatus: (status: number) => void;
}
// Create-Update gói khám
export const ModalPackage: React.FC<ModalPackageProps> = ({
  title,
  add,
  packageEntity,
  show,
  onHide,
  responseStatus,
}) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [showMess, setShowMess] = useState(false);
  const [levelMessage, setLevelMessage] = useState<"danger" | "success">(
    "danger"
  );
  const packageId = packageEntity ? packageEntity.id : uuidv4();
  const [packageDefault, setPackageDefault] = useState<boolean>(false);
  const [packageName, setPackageName] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [clinic, setClinic] = useState<Clinic | undefined>(
    packageEntity?.clinicId
  );
  const [supportStatus, setSupportStatus] = useState("S1");
  const [listPackageService, setListPackageService] = useState<
    PackageService[]
  >([]);

  const [servicesSelected, setServicesSelected] = useState<ServiceDTO[]>([]); // list services selected callback
  const [dataServices, setDataServices] = useState<ServiceDTO[]>([]); // list services all
  const [dataClinic, setDataClinic] = useState<Clinic[]>([]);

  useEffect(() => {
    if (packageEntity) {
      setPackageName(packageEntity.packageName);
      setPackagePrice(packageEntity.packagePrice);
      setClinic(packageEntity.clinicId);
      setSupportStatus(packageEntity.supportStatusId.id);
      setListPackageService(packageEntity.packageServices);
      setPackageDefault(packageEntity.def);
    }
  }, [packageEntity]);

  const fetchClinic = async () => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.GET_CLINIC_ALL}`,
        headerAuth()
      );
      const data = (await response.json()) as Clinic[];
      setDataClinic(data);
    } catch (e: any) {
      setError(e);
    }
  };
  useEffect(() => {
    fetchClinic();
  }, []);
  useEffect(() => {
    setServicesSelected(getListServices(listPackageService));
  }, [listPackageService]);
  const fetchServices = async () => {
    try {
      const response = await getServicesNotSelected(servicesSelected);
      setDataServices(response);
    } catch (error: any) {
      setError(error);
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
  const handleCheckboxChange = () => {
    setPackageDefault(!packageDefault); // Đổi trạng thái của packageDefault
  };
  const handleServicesSelected = (list: ServiceDTO[]) => {
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
      def: packageDefault,
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
          }
        })
        .catch((error: any) => {
          const status = error.response.status;
          if (status == 400) {
            const message = error.response.data;
            if (message) {
              setMessage(message);
            } else {
              setMessage("Gói khám đã tồn tại");
            }
            setLevelMessage("danger");
            setShowMess(true);
          } else {
            console.error("Error:", error);
            setError(true);
          }

          responseStatus(status);
        })
        .finally(() => {
          window.scrollTo({ top: 30, behavior: "smooth" });
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
      <ErrorNotifi error={error} />
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
              <Col xs={3}>
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
              <Col xs={2}>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={packageDefault} // Sử dụng state để kiểm tra trạng thái
                      onChange={handleCheckboxChange} // Gọi hàm xử lý khi có sự thay đổi
                    />
                    Gói mặc định
                  </label>
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
// danh sách gói khám
export const DataTablePackage: React.FC<DataTablePackageProps> = ({
  responseStatus,
  data,
}) => {
  const [showModalAddPackage, setShowModalAddPackage] = useState<{
    [key: number]: boolean;
  }>({}); // modal show update clinic

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr className="text-small">
            <th># </th>
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
    </>
  );
};
