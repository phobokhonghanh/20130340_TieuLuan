import { useState } from "react";
import Header from "../Component/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/style.css";
function Register() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: {
    currentTarget: any;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  return (
    <>
      <Header />
      <div className="container">
        <img
          src="src/assets/img/bg.png"
          alt="Background"
          className="background-image"
        />
        <div className="background-container m-top-5 form-control-lg">
          <div className="icon-link icon-link-hove">
            <a href="">
              <img className="bi back" src="src/assets/svg/back.svg" alt="img" />
            </a>
            <h1>Register Account</h1>
          </div>
          <form
            className={` form-style row g-3 ${
              validated ? "was-validated" : ""
            }`}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="col-md-4">
              <div className="input-group has-validation">
                <div className="input-group-text">
                  <img src="src/assets/svg/vietnam.svg" alt="img" />
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom01"
                  value="+84"
                  disabled
                  required
                />
              </div>
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                id="validationCustom01"
                placeholder="Nhập họ tên"
                required
              />
              <div className="invalid-feedback">Vui lòng nhập họ tên.</div>
            </div>
            <div className="col-md-4">
              <div className="input-group has-validation">
                <input
                  type="password"
                  className="form-control"
                  id="validationCustomUsername"
                  aria-describedby="inputGroupPrepend"
                  placeholder="Nhập mật khẩu"
                  required
                />
                <div className="invalid-feedback">Vui lòng nhập mật khẩu.</div>
                <div className="valid-feedback">Looks good!</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="input-group has-validation">
                <input
                  type="password"
                  className="form-control"
                  id="validationCustomUsername"
                  aria-describedby="inputGroupPrepend"
                  placeholder="Nhập lại mật khẩu"
                  required
                />
                <div className="invalid-feedback">
                  Vui lòng nhập lại mật khẩu.
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập mã giới thiệu (nếu có)"
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
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
