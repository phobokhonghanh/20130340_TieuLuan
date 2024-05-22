import { Link } from "react-router-dom";
import "../assets/css/Account.css";

import {
  Account,
  AccountDTO,
  DoctorDTO,
  DoctorEntity,
  EvaluateDTO,
  Patient,
} from "../Models/Model";
import React, { useEffect, useState } from "react";
import {
  API_ENDPOINTS,
  updateAccount,
  updateBHYT_Patient,
  updateDoctor,
} from "../apiConfig";
import { ErrorNotifi, Notifi } from "./Notification";
import { convertDate, convertDateTime } from "../Utils";
import Pagination from "./Pagination";
import {
  checkRoleDoctor,
  getIdAccount,
} from "../Authentication/Authentication";
import { Button } from "react-bootstrap";
import Preloader from "./Preloader";

export const Profile = () => {
  const [isLoading, setLoading] = useState(false);
  const [account, setAccount] = useState<Account>();
  const [patient, setPatient] = useState<Patient>();

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [levelMessage, setLevelMessage] = useState<"danger" | "success">(
    "danger"
  );
  const [showMess, setShowMess] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [bhyt, setBHYT] = useState("");
  const [isChangeBHYT, setIsChangeBHYT] = useState(false);
  const [checkChange, setCheckChange] = useState(false);

  let idAccount = getIdAccount();

  useEffect(() => {
    if (account) {
      setName(account.accountName || "");
      setPhone(account.accountPhone || "");
      setEmail(account.accountEmail || "");
      setGender(account.accountGender + "" || "");
    }
    if (patient) {
      setBHYT(patient.patientBhyt || "");
    }
  }, [account, patient]);
  const fetchAccount = async () => {
    setLoading(true);
    try {
      if (idAccount !== "") {
        const response = await fetch(API_ENDPOINTS.GET_ACCOUNT(idAccount));
        const data = (await response.json()) as Account;
        if (!checkRoleDoctor()) {
          const response2 = await fetch(API_ENDPOINTS.GET_PATIENT(idAccount));
          const data2 = (await response2.json()) as Patient;
          console.log(data2);
          setPatient(data2);
        }
        setAccount(data);
      }
    } catch (e: any) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAccount();
  }, [idAccount]);
  const handleNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(event.target.value);
    setCheckChange(true);
  };
  const handlePhoneChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPhone(event.target.value);
    setCheckChange(true);
  };
  const handleEmailChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
    setCheckChange(true);
  };
  const handleBHYTChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setBHYT(event.target.value);
    setCheckChange(true);
    setIsChangeBHYT(true);
  };
  const handleGenderChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setGender(event.target.value);
    setCheckChange(true);
  };
  const handSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    const form: AccountDTO = {
      id: getIdAccount(),
      accountName: name,
      accountPhone: phone,
      accountEmail: email,
      accountGender: gender === "0" ? 0 : 1,
    };
    setCheckChange(false);
    setIsChangeBHYT(false);
    updateAccount(form)
      .then((response: any) => {
        if (response.status === 200) {
          setMessage("Cập nhật tài khoản thành công\n");
          setLevelMessage("success");
          if (!checkRoleDoctor() && isChangeBHYT) {
            updateBHYT_Patient(idAccount, bhyt)
              .then((response: any) => {
                if (response.status === 200) {
                  const timer = setTimeout(() => {
                    setMessage("Cập nhật tài khoản thành công\n");
                    setLevelMessage("success");
                    setLoading(false);
                  }, 1000);
                  return () => clearTimeout(timer);
                }
              })
              .catch((error: any) => {
                if (error.response && error.response.status === 400) {
                  setMessage(error.response.data);
                } else {
                  console.log("error:", error);
                  setMessage("Update BHYT Failed");
                }
                setLevelMessage("danger");
              });
          }
        }
      })
      .catch((error: any) => {
        if (error.response && error.response.status === 400) {
          setMessage(error.response.data);
        } else {
          console.log("error:", error);
          setMessage("Update Account Failed");
        }
        setLevelMessage("danger");
      })
      .finally(() => {
        setShowMess(true);
        setLoading(false);
      });
  };

  return (
    <>
      {isLoading && <Preloader />}
      {showMess && (
        <Notifi
          message={message}
          variant={levelMessage}
          onClose={() => setShowMess(false)}
        />
      )}
      {error && <ErrorNotifi error={false} />}
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">Cài đặt tài khoản/</span> Tài
            khoản
          </h4>
          <div className="row">
            <div className="col-md-12">
              <ul className="nav nav-pills flex-column flex-md-row mb-3">
                <li className="nav-item">
                  <a className="nav-link active">
                    <i className="bx bx-user me-1"></i> Tài khoản
                  </a>
                </li>
                {checkRoleDoctor() && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/account-doctor">
                      <i className="bx bx-bell me-1"></i> Thông tin bác sĩ
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/history">
                    <i className="bx bx-bell me-1"></i> Lịch sử cuộc hẹn
                  </Link>
                </li>
              </ul>
              <div className="card mb-4">
                <h5 className="card-header">Thông tin tài khoản</h5>
                <div className="card-body">
                  <form id="form" onSubmit={handSubmit}>
                    <div className="row">
                      <div className="mb-3 col-md-6">
                        <label htmlFor="firstName" className="form-label">
                          Họ tên
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="firstName"
                          name="firstName"
                          onChange={handleNameChange}
                          value={name}
                        />
                      </div>
                      <div className="mb-3 col-md-6">
                        <label className="form-label" htmlFor="phoneNumber">
                          Điện thoại
                        </label>
                        <div className="input-group input-group-merge">
                          <span className="input-group-text">VN (+84)</span>
                          <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            className="form-control"
                            onChange={handlePhoneChange}
                            value={phone}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="mb-3 col-md-6">
                        <label className="form-label" htmlFor="email">
                          Email
                        </label>
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="email"
                            name="email"
                            onChange={handleEmailChange}
                            className="form-control"
                            value={email}
                          />
                        </div>
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="organization" className="form-label">
                          BHYT
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="organization"
                          onChange={handleBHYTChange}
                          name="organization"
                          value={bhyt}
                          disabled={checkRoleDoctor()}
                        />
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="language" className="form-label">
                          Giới tính
                        </label>
                        <select
                          id="gender"
                          className="select2 form-select"
                          value={gender}
                          onChange={handleGenderChange}
                        >
                          <option value="0">Nam</option>
                          <option value="1">Nữ</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Button
                        type="submit"
                        className="btn btn-primary me-2"
                        disabled={!checkChange}
                      >
                        Save changes
                      </Button>
                      <button
                        type="reset"
                        className="btn btn-outline-secondary"
                        onClick={() => window.location.reload()}
                        disabled={!checkChange}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-backdrop fade"></div>
      </div>
    </>
  );
};
export const ProfileDoctorDetails = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showMess, setShowMess] = useState(false);
  const [message, setMessage] = useState("");
  const [levelMessage, setLevelMessage] = useState<"danger" | "success">(
    "danger"
  );
  const [doctorDegree, setDoctorDegree] = useState("");
  const [doctorRank, setDoctorRank] = useState("");
  const [doctorSpecialty, setDoctorSpecialty] = useState("");
  const [doctorIntroduce, setDoctorIntroduce] = useState("");
  const [doctorExp, setDoctorExp] = useState("");
  const [doctorImage, setDoctorImage] = useState("");

  const [isChange, setIsChange] = useState(false);
  const [prevImage, setPrevImage] = useState(null);

  let idAccount = getIdAccount();

  const [doctor, setDoctor] = useState<DoctorDTO>();
  useEffect(() => {
    if (doctor) {
      setDoctorDegree(doctor.doctorDegree || "");
      setDoctorRank(doctor.doctorRank || "");
      setDoctorSpecialty(doctor.doctorSpecialty || "");
      setDoctorIntroduce(doctor.doctorIntroduce + "" || "");
      setDoctorExp(doctor.doctorExp + "" || "");
      setDoctorImage(doctor.doctorImage + "" || "");
    }
  }, [doctor]);

  const handleDegree = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDoctorDegree(event.target.value);
    setIsChange(true);
  };
  const handleSpecialty = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDoctorSpecialty(event.target.value);
    setIsChange(true);
  };
  const handleRank = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDoctorRank(event.target.value);
    setIsChange(true);
  };
  const handleIntroduce = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDoctorIntroduce(event.target.value);
    setIsChange(true);
  };
  const handleExp = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDoctorExp(event.target.value);
    setIsChange(true);
  };
  const handleImage = (event: {
    target: {
      [x: string]: any;
      value: React.SetStateAction<string>;
    };
  }) => {
    setDoctorImage(event.target.files[0]);
    setIsChange(true);
  };
  const fetchAccount = async () => {
    setLoading(true);
    try {
      if (checkRoleDoctor()) {
        const response = await fetch(API_ENDPOINTS.GET_DOCTOR(idAccount));
        const data = (await response.json()) as DoctorDTO;
        setDoctor(data);
      }
    } catch (e: any) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAccount();
  }, [idAccount]);
  const handSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    const form: DoctorDTO = {
      id: getIdAccount(),
      doctorDegree: doctorDegree,
      doctorRank: doctorRank,
      doctorSpecialty: doctorSpecialty,
      doctorIntroduce: doctorIntroduce,
      doctorExp: doctorExp,
      doctorImage: doctorImage,
    };
    updateDoctor(form)
      .then((response: any) => {
        if (response.status === 200) {
          const timer = setTimeout(() => {
            setMessage("Cập nhật tài khoản thành công");
            setLevelMessage("success");
            setLoading(false);
          }, 1000);
          return () => clearTimeout(timer);
        }
      })
      .catch((error: any) => {
        if (error.response && error.response.status === 400) {
          setMessage(error.response.data);
        } else {
          console.log("error:", error);
          setMessage("Update Failed");
        }
        setLevelMessage("danger");
      })
      .finally(() => {
        setShowMess(true);
        setLoading(false);
      });
    setIsChange(false);
  };
  return (
    <>
      {isLoading && <Preloader />}
      {showMess && (
        <Notifi
          message={message}
          variant={levelMessage}
          onClose={() => setShowMess(false)}
        />
      )}
      {error && <ErrorNotifi error={false} />}
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">Cài đặt tài khoản/</span>{" "}
            Thông tin bác sĩ
          </h4>
          <div className="row">
            <div className="col-md-12">
              <ul className="nav nav-pills flex-column flex-md-row mb-3">
                <li className="nav-item">
                  <Link className="nav-link" to="/account">
                    <i className="bx bx-user me-1"></i> Tài khoản
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link active">
                    <i className="bx bx-bell me-1"></i> Thông tin bác sĩ
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/history">
                    <i className="bx bx-bell me-1"></i> Lịch sử cuộc hẹn
                  </Link>
                </li>
              </ul>
              <div className="card mb-4">
                <h5 className="card-header">Thông tin bác sĩ</h5>
                <div className="card-body">
                  <div
                    className="d-flex align-items-start align-items-sm-center gap-4"
                    style={{ justifyContent: "none" }}
                  >
                    <img
                      src={
                        doctorImage ? doctorImage : "/src/assets/img/doctor.jpg"
                      }
                      alt="user-avatar"
                      className="d-block rounded"
                      height="100"
                      width="100"
                      id="uploadedAvatar"
                    />
                    <div className="button-wrapper">
                      <label
                        htmlFor="upload"
                        className="btn btn-primary me-2 mb-4"
                        tabIndex={Number("0")}
                      >
                        <span className="d-none d-sm-block">Tải ảnh</span>
                        <i className="bx bx-upload d-block d-sm-none"></i>
                        <input
                          type="file"
                          id="upload"
                          className="account-file-input"
                          hidden
                          accept="image/png, image/jpeg"
                          onChange={handleImage}
                        />
                      </label>
                      <p className="text-muted mb-0">Chọn JPG hoặc PNG</p>
                    </div>
                  </div>
                </div>
                <hr className="my-0" />
                <div className="card-body">
                  <form
                    id="formAccountSettings"
                    method="POST"
                    onSubmit={handSubmit}
                  >
                    <div className="row">
                      <div className="mb-3 col-md-2">
                        <label htmlFor="language" className="form-label">
                          {" "}
                          Học vị
                        </label>
                        <select
                          id="language"
                          className="select2 form-select"
                          value={doctorDegree}
                          onChange={handleDegree}
                        >
                          <option value="">Vui lòng chọn</option>
                          <option value="PGS">PGS</option>
                          <option value="GS">GS</option>
                        </select>
                      </div>
                      <div className="mb-3 col-md-1">
                        <label htmlFor="language" className="form-label">
                          Học hàm
                        </label>
                        <select
                          id="language"
                          className="select2 form-select"
                          value={doctorRank}
                          onChange={handleRank}
                        >
                          <option value="TS">BS</option>
                          <option value="ThS">ThS</option>
                          <option value="TS">TS</option>
                          <option value="TS">BSCK I</option>
                          <option value="TS">BSCK II</option>
                        </select>
                      </div>
                      <div className="mb-3 col-md-4">
                        <label htmlFor="organization" className="form-label">
                          Chuyên khoa
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="organization"
                          name="organization"
                          placeholder="Khoa nội"
                          value={doctorSpecialty}
                          onChange={handleSpecialty}
                        />
                      </div>
                      <div className="mb-3 col-md-4">
                        <label htmlFor="organization" className="form-label">
                          Kinh nghiệm
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="organization"
                          name="organization"
                          placeholder="4 năm"
                          value={doctorExp}
                          onChange={handleExp}
                        />
                      </div>
                      <div className="mb-3 col-md-11">
                        <label className="form-label" htmlFor="phoneNumber">
                          Giới thiệu
                        </label>
                        <textarea
                          className="form-control"
                          rows={6}
                          placeholder="Thông tin giới thiệu"
                          value={doctorIntroduce}
                          onChange={handleIntroduce}
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <button
                        type="submit"
                        disabled={!isChange}
                        className="btn btn-primary me-2"
                      >
                        Save changes
                      </button>
                      <button
                        type="reset"
                        className="btn btn-outline-secondary"
                        onClick={() => window.location.reload()}
                        disabled={!isChange}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-backdrop fade"></div>
      </div>
    </>
  );
};
interface DoctorInfProps {
  doctor: DoctorEntity;
}
export const DoctorDetails: React.FC<DoctorInfProps> = ({ doctor }) => {
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [evaluates, setEvaluate] = useState<EvaluateDTO[]>([]);
  const [totalElement, setTotalElement] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1); // State để lưu trang hiện tại
  const [totalPages, setTotalPages] = useState<number>(1); // State để lưu tổng số trang

  const fetchEvaluate = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_ENDPOINTS.GET_EVALUATE_DOCTOR(doctor.id)}`
      );
      if (response.status === 204) {
        return;
      }
      const data = await response.json();
      setEvaluate(data.content);
      setTotalElement(data.totalElements);
      setCurrentPage(data.number + 1);
      setTotalPages(data.totalPages);
    } catch (e: any) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvaluate();
  }, []);
  return (
    <>
      {isLoading && <div> Loading...</div>}
      <section className="">
        <ErrorNotifi error={error} />
        <div className="container">
          <div className="col-lg-12">
            <div className="single-main">
              <div
                style={{
                  marginBottom: "10px",
                  padding: "20px",
                  border: "1px solid #c9c7c775",
                  fontSize: "21px",
                }}
              >
                <div className="row">
                  <div className="col-2">
                    <img
                      style={{
                        borderRadius: "50%",
                        height: "150px",
                        width: "150px",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                      src={`${
                        doctor.doctorImage
                          ? doctor.doctorImage
                          : "/src/assets/img/doctor.jpg"
                      }`}
                      alt="#"
                    />
                  </div>
                  <div className="col-9">
                    <h3 className="news-title">
                      {doctor.doctorDegree}
                      {". "}
                      {doctor.doctorRank} {doctor.accountName}
                    </h3>
                    <span>
                      Giới tính: {doctor.accountGender ? "Nam" : "Nữ"}
                    </span>
                    <div>
                      <span>Chuyên khoa: {doctor.doctorSpecialty}</span>
                    </div>
                    <div>
                      <span>Kinh nghiệm: {doctor.doctorExp}</span>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <label htmlFor="">Giới thiệu:</label>
                  <p>{doctor.doctorIntroduce}</p>
                </div>
              </div>
              <div className="col-12">
                <div
                  style={{
                    marginBottom: "20px",
                    padding: "20px",
                    border: "1px solid #c9c7c775",
                  }}
                >
                  <h2>Nhận xét</h2>
                  <div className="meta">
                    <div className="meta-right">
                      <h5 className="comments">
                        <Link to="#">
                          <i className="fa fa-comments"></i>
                          {totalElement
                            ? totalElement < 10
                              ? " 0" + totalElement
                              : totalElement
                            : " 0"}{" "}
                          Nhận xét
                        </Link>
                      </h5>
                    </div>
                  </div>
                  <div className="comments-body">
                    {evaluates &&
                      evaluates.map((evaluate) => (
                        <div style={{ padding: "20px" }}>
                          <div className="row">
                            <div className="col-1">
                              <img
                                style={{
                                  borderRadius: "50%",
                                  height: "50px",
                                  width: "50px",
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  backgroundRepeat: "no-repeat",
                                }}
                                src="/src/assets/img/user.png"
                                alt="#"
                              />
                            </div>
                            <div className="col-9" style={{ fontSize: "21px" }}>
                              <span style={{ fontSize: "21px" }}>
                                Người khám bệnh
                              </span>
                              <div
                                className="comment-meta"
                                style={{ fontSize: "15px" }}
                              >
                                <span className="meta">
                                  <i className="fa fa-calendar"></i>{" "}
                                  {convertDate(evaluate.createAt)}
                                </span>
                                <span className="meta">
                                  {" "}
                                  <i className="fa fa-clock-o"></i>{" "}
                                  {convertDateTime(evaluate.createAt)}
                                </span>
                              </div>
                              <p style={{ marginTop: "15px" }}>
                                {evaluate.evaluateContent}
                              </p>
                            </div>
                          </div>
                          <hr />
                        </div>
                      ))}
                    <div className="row-bottom">
                      <Pagination
                        totalPage={totalPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
