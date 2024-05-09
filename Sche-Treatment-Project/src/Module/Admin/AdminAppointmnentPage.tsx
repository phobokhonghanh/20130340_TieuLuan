import { AdminSidebar } from "../../Component/AdminSidebar";
import { useEffect, useState } from "react";
import { AppointmentDTO, Area, Clinic } from "../../Models/Model";
import { Col, Form, Row } from "react-bootstrap";
import { API_ENDPOINTS } from "../../apiConfig";
import { Appointment, AppointmentDetail } from "../../Component/Appointment";
import Pagination from "../../Component/Pagination";
import { Notifi } from "../../Component/Notification";

export function AdminAppointmnetPage() {
  const [filterText, setFilterText] = useState(""); // input search

  const [areas, setArea] = useState<Area[]>([]); // get / set areas (fetch data)
  const [areaSelected, setAreaSelected] = useState<Area>(); // get / set areas selected

  const [clinic, setClinic] = useState(""); // get / set clinic

  const [listAppointment, setListAppointment] = useState<AppointmentDTO[]>([]);
  const [selectAppointment, setSelectAppointment] = useState<AppointmentDTO>();

  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(1); // State để lưu trang hiện tại
  const [totalPages, setTotalPages] = useState<number>(1); // State để lưu tổng số trang

  const [refesh, setRefesh] = useState(false);

  const account = "ea29643b-f825-11ee-87e1-847beb19aaf6";
  const role = "ADMIN";

  const fetchArea = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.GET_AREA_ALL);
      const data = (await response.json()) as Area[];
      setArea(data);
      setAreaSelected(data[0]);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArea();
  }, []);

  useEffect(() => {
    if (account) {
      const fetchAppointment = async (page: number) => {
        setLoading(true);
        try {
          let response;
          if (role !== "ADMIN") {
            response = await fetch(
              `${API_ENDPOINTS.GET_APPOINTMENT_DOCTOR(
                account
              )}?page=${page}&keyword=${filterText}`
            );
          } else {
            response = await fetch(
              `${API_ENDPOINTS.GET_APPOINTMENT_ADMIN}?page=${page}&keyword=${filterText}`
            );
          }
          const data = await response.json();
          setListAppointment(data.content);
          if (data.content) {
            setSelectAppointment(data.content[0]);
          }
          setCurrentPage(data.number + 1);
          setTotalPages(data.totalPages);
        } catch (e: any) {
          setError(e);
        } finally {
          setLoading(false);
        }
      };
      if (refesh) {
        setRefesh(false);
      }
      fetchAppointment(currentPage);
    } else {
      // navigator("/404");
    }
  }, [currentPage, filterText, refesh]);
  const handleFilterChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setFilterText(value);
  };
  return (
    <>
      <AdminSidebar />
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
                    <a href="/admin/clinic">Quản lý lịch hẹn</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="panel panel-default">
                <div className="panel-heading d-flex">
                  <div>
                    <i className="fa  fa-user fa-fw"></i>
                    Lịch hẹn
                  </div>
                </div>
                <div className="panel-body">
                  <div className="">
                    <Row style={{ padding: "10px", width: "100%" }}>
                      <Col xs={4}>
                        <input
                          type="text"
                          placeholder="Tìm kiếm số điện thoại..."
                          value={filterText}
                          onChange={handleFilterChange}
                          className="custom-select-input"
                        />
                      </Col>
                      {/* <Col xs={4}>
                        <Form.Group controlId="formClinic">
                          <select
                            className="custom-select-input"
                            value={areaSelected ? areaSelected.id : ""}
                            // onChange={handleAreaChange}
                            required
                          >
                            {isLoading && <option>Loading...</option>}
                            {error && <option>Không có data</option>}
                            <option value="">-- Chọn khu khám --</option>
                            {areas.map((area) => (
                              <option key={area.id} value={area.id}>
                                {area.areaName}
                              </option>
                            ))}
                          </select>
                        </Form.Group>
                      </Col>
                      <Col xs={4}>
                        <Form.Group controlId="formClinic">
                          <ClinicAppoinment
                            dataListClinic={
                              areaSelected ? areaSelected.clinics : []
                            }
                            onClinicSelected={(selectedClinic) =>
                              setClinic(selectedClinic.id)
                            }
                          />
                        </Form.Group>
                      </Col> */}
                    </Row>
                  </div>
                  <div className="row">
                    <div
                      className="col-md-7 w90"
                      style={{ marginLeft: "10px" }}
                    >
                      <div className="card mb-4 w100">
                        {isLoading && <div>Loading...</div>}
                        {error && (
                          <div
                            style={{
                              textAlign: "center",
                              color: "rgb(116, 136, 151)",
                              fontWeight: "bold",
                              fontSize: "larger",
                            }}
                          >
                            <i>&#9888;</i> Đang gặp sự cố kỹ thuật, xin vui lòng
                            đợi trong giây lát !
                          </div>
                        )}

                        {listAppointment &&
                          listAppointment.map((appointment) => (
                            <div
                              key={appointment.id}
                              style={{ cursor: "pointer" }}
                              onClick={() => setSelectAppointment(appointment)}
                            >
                              <Appointment
                                appointmentDTO={appointment}
                                role={role}
                                refeshDetails={(rf) => setRefesh(rf)}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                    {selectAppointment && (
                      <AppointmentDetail
                        appointmentId={selectAppointment}
                        role={role}
                        refesh={refesh}
                        setRefesh={(rf) => setRefesh(rf)}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
