import { useEffect, useState } from "react";
import "../assets/style.css";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import { Signup } from "../Models/Model";
import { register, registerAdmin } from "../apiConfig";
import { Notifi } from "../Component/Notification";
import { Form } from "react-bootstrap";
import Preloader from "../Component/Preloader";
import { checkRoleAdmin } from "../Authentication/Authentication";
function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [validationPassword, setValidationPassword] = useState("");
  const [validationPhone, setValidationPhone] = useState("");
  const [message, setMessage] = useState("");
  const [levelMessage, setLevelMessage] = useState<"danger" | "success">(
    "danger"
  );
  const [showMess, setShowMess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMess(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [showMess]);

  const handlePhone = (event: { currentTarget: any }) => {
    const { value } = event.currentTarget;
    // Chỉ cho phép các ký tự số và dấu cộng
    if (/^[\d+]*$/.test(value)) {
      setPhone(value);
    }
    if (value.length < 10) {
      setValidationPhone("Vui lòng nhập đúng số điện thoại");
    } else {
      setValidationPhone("");
    }
  };
  const handleEmail = (event: { currentTarget: any }) => {
    const { value } = event.currentTarget;
    setEmail(value);
  };
  const handleName = (event: { currentTarget: any }) => {
    const { value } = event.currentTarget;
    setName(value);
  };
  const handlePassword = (event: { currentTarget: any }) => {
    const { value } = event.currentTarget;
    setPassword(value);
    if (value.length < 8) {
      setValidationPassword("Mật khẩu quá ngắn, vui lòng nhập hơn 8 kí tự");
    } else {
      setValidationPassword("OK");
    }
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    let notifyText = "";
    if (phone.length < 10) {
      notifyText += "Vui lòng nhập đúng số điện thoại\n";
    }
    if (email.length < 10) {
      notifyText += "Vui lòng nhập đúng email\n";
    }
    if (password.length < 8) {
      notifyText += "Password quá ngắn";
    }
    if (notifyText !== "") {
      setMessage(notifyText);
      setLevelMessage("danger");
      setShowMess(true);
      return;
    }
    const formData: Signup = {
      id: uuidv4(),
      accountPhone: phone,
      accountEmail: email,
      accountName: name,
      accountPassword: password,
      accountGender: 0,
      supportRoleId: checkRoleAdmin() ? "R1" : "R4",
      supportStatusId: "S5",
    };
    setIsLoading(true);
    if (!checkRoleAdmin()) {
      register(formData)
        .then((response: any) => {
          if (response.status === 200) {
            setIsLoading(false);
            navigate(`/otp/${response.data}`);
          }
        })
        .catch((error: any) => {
          setIsLoading(false);
          if (error.response.status === 400) {
            setMessage(error.response.data);
            setLevelMessage("danger");
            setShowMess(true);
          } else {
            console.error("Error:", error);
            setMessage("Tạo tài khoản không thành công");
            setLevelMessage("danger");
            setShowMess(true);
          }
        });
    } else {
      registerAdmin(formData)
        .then((response: any) => {
          if (response.status === 200) {
            setIsLoading(false);
            navigate("/admin/account");
          }
        })
        .catch((error: any) => {
          setIsLoading(false);
          if (error.response.status === 400) {
            setMessage(error.response.data);
            setLevelMessage("danger");
            setShowMess(true);
          } else {
            console.error("Error:", error);
            setMessage("Tạo tài khoản không thành công");
            setLevelMessage("danger");
            setShowMess(true);
          }
        });
    }
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
      <div className="container">
        <img src="/img/bg.png" alt="background" className="background-image" />
        <div className="background-container m-top-5 form-control-lg">
          <div style={{ display: "flex" }}>
            <Link to="/login" className="biback">
              <img
                className="back"
                src="/svg/back.svg"
                alt="img"
                aria-label="Đăng nhập"
              />
            </Link>
            <h1 style={{ paddingLeft: "5px" }}>Đăng ký tài khoản</h1>
          </div>
          <Form className={`form-style row g-3`} onSubmit={handleSubmit}>
            <div className="col-md-4">
              <div className="input-group has-validation">
                <div className="input-group-text">
                  <img src="/svg/vietnam.svg" alt="img" />
                </div>
                <input
                  style={{ marginLeft: "5px" }}
                  type="tel"
                  className="form-control"
                  onChange={handlePhone}
                  pattern="[\d+]*"
                  inputMode="numeric"
                  value={phone}
                  placeholder="+84"
                  autoFocus
                  required
                />
              </div>
              <div
                className={
                  validationPhone === "OK" ? "has-success" : "has-warning"
                }
              >
                {validationPhone}
              </div>
            </div>
            <div className="col-md-4">
              <input
                type="password"
                className="form-control"
                id="validationCustomUsername"
                onChange={handlePassword}
                aria-describedby="inputGroupPrepend"
                placeholder="Nhập mật khẩu"
                required
              />
              <div
                className={
                  validationPassword === "OK" ? "has-success" : "has-warning"
                }
              >
                {validationPassword}
              </div>
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                id="validationCustom01"
                onChange={handleName}
                placeholder="Nhập họ tên"
                required
              />
            </div>
            <div className="col-md-4">
              <input
                type="email"
                className="form-control"
                onChange={handleEmail}
                placeholder="Nhập email: example@example.com"
                required
              />
            </div>
            <div className="col-12">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="invalidCheck"
                  required
                />
                <label
                  className="form-check-label font-style"
                  htmlFor="invalidCheck"
                >
                  Đồng ý với <a href="#">Quy định sử dụng</a> và{" "}
                  <a href="#"> Chính sách bảo mật</a>
                </label>
              </div>
            </div>
            <div className="col-13">
              <button className="btn btn-primary" type="submit">
                Hoàn tất đăng ký
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Register;
