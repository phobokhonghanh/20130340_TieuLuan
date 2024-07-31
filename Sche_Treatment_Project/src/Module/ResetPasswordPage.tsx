import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Notifi } from "../Component/Notification";
import { forgotPassword, resetPassword } from "../apiConfig";
import Preloader from "../Component/Preloader";
import { Signin } from "../Models/Model";
function ForgotPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [levelMessage, setLevelMessage] = useState<"danger" | "success">(
    "danger"
  );
  const [showMess, setShowMess] = useState(false);
  const [validationPhone, setValidationPhone] = useState("");

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
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    let notifyText = "";
    if (phone.length < 10) {
      notifyText += "Vui lòng nhập đúng số điện thoại";
    }
    if (notifyText !== "") {
      setMessage(notifyText);
      setLevelMessage("danger");
      setShowMess(true);
      return;
    }
    setIsLoading(true);
    forgotPassword(email, phone)
      .then((response: any) => {
        if (response.status === 200) {
          setIsLoading(false);
          navigate(`/otp/${response.data}?reset-password=true`);
        }
      })
      .catch((error: any) => {
        setIsLoading(false);
        if (error.response && error.response.status === 400) {
          setMessage(error.response.data);
          setLevelMessage("danger");
          setShowMess(true);
        } else {
          console.log("error:", error);
          setMessage("Vui lòng thử lại sau");
          setLevelMessage("danger");
          setShowMess(true);
        }
      });
  };
  return (
    <>
      {isLoading && <Preloader />}
      {/* <Header /> */}
      {showMess && (
        <Notifi
          message={message}
          variant={levelMessage}
          onClose={() => setShowMess(false)}
        />
      )}
      <div className="container">
        <img src="/img/bg.png" alt="Background" className="background-image" />
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
            <h1 style={{ paddingLeft: "5px" }}>Quên mật khẩu</h1>
          </div>
          <form className={` form-style row g-3`} onSubmit={handleSubmit}>
            <div className="col-md-4">
              <div className="has-validation">
                <div className="input-group-text">
                  <img src="/svg/vietnam.svg" alt="img" />
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
                  type="email"
                  onChange={handleEmail}
                  className="form-control"
                  id="validationCustomUsername"
                  aria-describedby="inputGroupPrepend"
                  placeholder="Nhập email"
                  required
                />
              </div>
            </div>
            <div className="col-13">
              <button className="btn btn-primary" type="submit">
                Nhận OTP về Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default ForgotPassword;
export function ResetPassword() {
  const navigate = useNavigate();
  const { accountId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [validationPassword, setValidationPassword] = useState("");
  const [validationConfirm, setValidationConfirm] = useState("");
  const [isError, setIsError] = useState(false);

  const [message, setMessage] = useState("");
  const [levelMessage, setLevelMessage] = useState<"danger" | "success">(
    "danger"
  );
  const [showMess, setShowMess] = useState(false);

  const handlePassword = (event: { currentTarget: any }) => {
    const { value } = event.currentTarget;
    setPassword(value);
    if (value.length < 8) {
      setIsError(true);
      setValidationPassword("Mật khẩu quá ngắn, vui lòng nhập hơn 8 kí tự");
    } else {
      setIsError(false);
      setValidationPassword("");
    }
  };
  const handleConfirm = (event: { currentTarget: any }) => {
    const { value } = event.currentTarget;
    setConfirm(value);
    if (value !== password) {
      setValidationConfirm("Mật khẩu không khớp");
      setIsError(true);
    } else {
      setValidationConfirm("");
      setIsError(false);
    }
  };
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    let notifyText = "";
    if (isError) {
      notifyText = "Vui lòng nhập đúng mật khẩu";
      setMessage(notifyText);
      setLevelMessage("danger");
      setShowMess(true);
      return;
    }
    const form: Signin = {
      phone: accountId ? accountId : "",
      password: password,
    };
    setIsLoading(true);
    resetPassword(form)
      .then((response: any) => {
        if (response.status === 200) {
          const timer = setTimeout(() => {
            setIsLoading(false);
            navigate("/login");
          }, 500);
          return () => clearTimeout(timer);
        }
      })
      .catch((error: any) => {
        setIsLoading(false);
        if (error.response && error.response.status === 400) {
          setMessage(error.response.data);
        } else {
          console.log("error:", error);
          setMessage("Vui lòng thử lại sau");
        }
        setLevelMessage("danger");
        setShowMess(true);
      });
  };
  return (
    <>
      {isLoading && <Preloader />}
      {/* <Header /> */}
      {showMess && (
        <Notifi
          message={message}
          variant={levelMessage}
          onClose={() => setShowMess(false)}
        />
      )}
      <div className="container">
        <img src="/img/bg.png" alt="Background" className="background-image" />
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
            <h1 style={{ paddingLeft: "5px" }}>Đổi mật khẩu</h1>
          </div>
          <p style={{ font: "caption", color: "red" }}>
            Lưu ý: Bạn chỉ có 5 phút để thay đổi mật khẩu.
          </p>
          <form className={` form-style row g-3`} onSubmit={handleSubmit}>
            <div className="col-md-4">
              <div className="has-validation">
                <div className="input-group-text">
                  <input
                    style={{ marginLeft: "5px" }}
                    type="password"
                    className="form-control"
                    onChange={handlePassword}
                    value={password}
                    placeholder="Nhập password"
                    required
                  />{" "}
                </div>
                <div className={"has-warning"}>{validationPassword}</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="has-validation">
                <div className="input-group-text">
                  <input
                    style={{ marginLeft: "5px" }}
                    type="password"
                    className="form-control"
                    onChange={handleConfirm}
                    value={confirm}
                    placeholder="Nhập lại password"
                    required
                  />{" "}
                </div>
                <div className={"has-warning"}>{validationConfirm}</div>
              </div>
            </div>
            <div className="col-13">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isError}
              >
                Xong
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
