import { useState } from "react";
import Header from "../Component/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/style.css";
import { Link, useNavigate } from "react-router-dom";
import { Notifi } from "../Component/Notification";
import { login } from "../apiConfig";
import { LoginResponse, Signin } from "../Models/Model";
import Preloader from "../Component/Preloader";
function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [levelMessage, setLevelMessage] = useState<"danger" | "success">(
    "danger"
  );
  const [showMess, setShowMess] = useState(false);
  const [validationPhone, setValidationPhone] = useState("");
  const [validationPassword, setValidationPassword] = useState("");

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
  const handlePassword = (event: { currentTarget: any }) => {
    const { value } = event.currentTarget;
    setPassword(value);
    if (value.length < 8) {
      setValidationPassword("Mật khẩu phải hơn 8 kí tự");
    } else {
      setValidationPassword("");
    }
  };
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    let notifyText = "";
    if (phone.length < 10) {
      notifyText += "Vui lòng nhập đúng số điện thoại\n";
    }
    if (password.length < 8) {
      notifyText += "Mật khẩu phải hơn 8 kí tự";
    }
    if (notifyText !== "") {
      setMessage(notifyText);
      setLevelMessage("danger");
      setShowMess(true);
      return;
    }
    setIsLoading(true);
    const formData: Signin = {
      phone: phone,
      password: password,
    };
    login(formData)
      .then((response: any) => {
        if (response.status === 200) {
          const responseData: LoginResponse = response.data;
          localStorage.setItem("response", JSON.stringify(responseData));
          const timer = setTimeout(() => {
            setIsLoading(false);
            if (responseData.roles && responseData.roles[0] === "ROLE_ADMIN") {
              navigate("/admin/home");
            } else {
              navigate("/");
            }
          }, 1000);
          return () => clearTimeout(timer);
        }
      })
      .catch((error: any) => {
        setIsLoading(false);
        if (error.response && error.response.status === 400) {
          setMessage(error.response.data.message);
          setLevelMessage("danger");
          setShowMess(true);
        } else {
          console.log("error:", error);
          setMessage("Login Failed");
          setLevelMessage("danger");
          setShowMess(true);
        }
      });
  };
  return (
    <>
      {isLoading && <Preloader />}
      <Header />
      {showMess && (
        <Notifi
          message={message}
          variant={levelMessage}
          onClose={() => setShowMess(false)}
        />
      )}
      <div className="container">
        <img
          src="src/assets/img/bg.png"
          alt="Background"
          className="background-image"
        />
        <div className="background-container m-top-5 form-control-lg">
          <form className={` form-style row g-3`} onSubmit={handleSubmit}>
            <div className="icon-link icon-link-hove">
              <h2 style={{ marginTop: "50px" }}>
                Đăng nhập để dễ dàng đăng ký khám bệnh
              </h2>
              <span>
                Bạn đã có tài khoản chưa? <Link to="/register">Đăng ký</Link>
              </span>
            </div>
            <div className="col-md-4">
              <div className="has-validation">
                <div className="input-group-text">
                  <img src="/src/assets/svg/vietnam.svg" alt="img" />
                  <input
                    style={{ marginLeft: "5px" }}
                    type="tel"
                    className="form-control"
                    onChange={handlePhone}
                    pattern="[\d+]*"
                    inputMode="numeric"
                    value={phone}
                    placeholder="+84"
                    required
                  />{" "}
                </div>
                <div className={"has-warning"}>{validationPhone}</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="input-group has-validation">
                <input
                  type="password"
                  onChange={handlePassword}
                  className="form-control"
                  id="validationCustomUsername"
                  aria-describedby="inputGroupPrepend"
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>
              <div className="has-warning">{validationPassword}</div>
            </div>
            <div className="col-13">
              <button className="btn btn-primary" type="submit">
                Đăng nhập
              </button>
              <span style={{ paddingLeft: "15px", cursor: "pointer" }}>
                <Link to="/forgot-password">Quên mật khẩu ?</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
